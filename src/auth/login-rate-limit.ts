import { isIP } from 'node:net';
import { Redis } from '@upstash/redis';

export type LoginType = 'guest' | 'admin';
export type IncrementWithExpiry = (key: string, windowSeconds: number) => Promise<number>;

function isDevelopment(): boolean {
	return import.meta.env?.DEV ?? process.env.NODE_ENV === 'development';
}

const INCREMENT_WITH_EXPIRY = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then
  redis.call('EXPIRE', KEYS[1], ARGV[1])
end
return count
`;

export function trustedClientAddress(value: unknown): string {
	if (typeof value !== 'string') throw new Error('Trusted client address unavailable');
	const address = value.trim();
	if (!address || isIP(address) === 0) throw new Error('Trusted client address unavailable');
	return address;
}

export function createLoginRateLimiter(increment: IncrementWithExpiry) {
	return async (
		clientAddress: unknown,
		loginType: LoginType,
		limit: number,
		windowSeconds: number,
	): Promise<boolean> => {
		if (!Number.isSafeInteger(limit) || limit < 1 || !Number.isSafeInteger(windowSeconds) || windowSeconds < 1) {
			throw new Error('Invalid login rate limit configuration');
		}
		const address = trustedClientAddress(clientAddress);
		const count = await increment(`login:${loginType}:${address}`, windowSeconds);
		if (!Number.isSafeInteger(count) || count < 1) throw new Error('Login rate limiter returned invalid count');
		if (count > limit && isDevelopment()) {
			console.info(`[auth] ${loginType} login rate limit reached`);
		}
		return count <= limit;
	};
}

export function createInMemoryIncrementer(now: () => number = Date.now): IncrementWithExpiry {
	const counters = new Map<string, { count: number; expiresAt: number }>();
	return async (key, windowSeconds) => {
		const currentTime = now();
		let counter = counters.get(key);
		if (!counter || counter.expiresAt <= currentTime) {
			counter = { count: 0, expiresAt: currentTime + windowSeconds * 1000 };
			counters.set(key, counter);
		}
		return ++counter.count;
	};
}

let redis: Redis | undefined;
const incrementLocally = createInMemoryIncrementer();

async function incrementWithExpiry(key: string, windowSeconds: number): Promise<number> {
	if (import.meta.env?.DEV ?? process.env.NODE_ENV === 'development') {
		return incrementLocally(key, windowSeconds);
	}

	const url = process.env.KV_REST_API_URL;
	const token = process.env.KV_REST_API_TOKEN;
	if (!url || !token) throw new Error('Login rate limiter is not configured');

	redis ??= new Redis({ url, token });
	return redis.eval<number>(INCREMENT_WITH_EXPIRY, [key], [String(windowSeconds)]);
}

export const checkLoginRateLimit = createLoginRateLimiter(incrementWithExpiry);
