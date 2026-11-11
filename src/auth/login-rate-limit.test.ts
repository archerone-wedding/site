import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createInMemoryIncrementer, createLoginRateLimiter, trustedClientAddress } from './login-rate-limit';

function createMemoryStore(now: () => number) {
	const values = new Map<string, { count: number; expiresAt: number }>();
	return async (key: string, windowSeconds: number): Promise<number> => {
		let entry = values.get(key);
		if (!entry || entry.expiresAt <= now()) {
			entry = { count: 0, expiresAt: now() + windowSeconds * 1000 };
			values.set(key, entry);
		}
		entry.count++;
		return entry.count;
	};
}

describe('login rate limiter', () => {
	test('shares counts by address and login type, with independent limits', async () => {
		const increment = createMemoryStore(() => 0);
		const instanceA = createLoginRateLimiter(increment);
		const instanceB = createLoginRateLimiter(increment);

		for (let attempt = 0; attempt < 10; attempt++) {
			assert.equal(await instanceA('203.0.113.5', 'guest', 10, 600), true);
		}
		assert.equal(await instanceB('203.0.113.5', 'guest', 10, 600), false);
		assert.equal(await instanceB('203.0.113.5', 'admin', 5, 900), true);
		assert.equal(await instanceB('203.0.113.6', 'guest', 10, 600), true);
	});

	test('expires counter after configured window', async () => {
		let now = 0;
		const limiter = createLoginRateLimiter(createMemoryStore(() => now));
		assert.equal(await limiter('203.0.113.5', 'admin', 1, 900), true);
		assert.equal(await limiter('203.0.113.5', 'admin', 1, 900), false);
		now = 900_000;
		assert.equal(await limiter('203.0.113.5', 'admin', 1, 900), true);
	});

	test('only accepts trusted IP address value, not missing or forwarded chains', () => {
		assert.equal(trustedClientAddress(' 203.0.113.5 '), '203.0.113.5');
		assert.equal(trustedClientAddress('2001:db8::1'), '2001:db8::1');
		assert.throws(() => trustedClientAddress(undefined));
		assert.throws(() => trustedClientAddress('203.0.113.5, 198.51.100.2'));
		assert.throws(() => trustedClientAddress('not-an-ip'));
	});

	test('local in-memory counter expires without needing Redis', async () => {
		let now = 0;
		const increment = createInMemoryIncrementer(() => now);
		assert.equal(await increment('login:guest:203.0.113.5', 600), 1);
		assert.equal(await increment('login:guest:203.0.113.5', 600), 2);
		now = 600_000;
		assert.equal(await increment('login:guest:203.0.113.5', 600), 1);
	});

	test('propagates store failure so callers can fail closed', async () => {
		const limiter = createLoginRateLimiter(async () => { throw new Error('store unavailable'); });
		await assert.rejects(limiter('203.0.113.5', 'guest', 10, 600), /store unavailable/);
	});
});
