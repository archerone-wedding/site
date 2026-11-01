// Stateless, server-only, HMAC-signed session tokens.
//
// A session token has the shape `<base64url(payload-json)>.<base64url(hmac-sha256-signature)>`.
// The payload always carries a `purpose` claim (`admin` | `guest`) and an `exp` (unix seconds)
// claim. Verification is strict: malformed tokens, tampered signatures, expired tokens, and
// tokens with the wrong purpose are all rejected.
//
// This module must work both:
//  - inside Astro/Vite, where `import.meta.env` exposes environment variables, and
//  - under plain Node (e.g. `node:test` run via `tsx`), where `import.meta.env` does not exist
//    and we fall back to `process.env`.
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export type SessionPurpose = 'admin' | 'guest';

export interface SessionPayload {
	purpose: SessionPurpose;
	exp: number; // unix seconds
	[key: string]: unknown;
}

function readEnv(key: string): string | undefined {
	const metaEnv = (import.meta as unknown as { env?: Record<string, unknown> })?.env;
	const metaValue = metaEnv?.[key];
	if (typeof metaValue === 'string' && metaValue.length > 0) return metaValue;
	if (typeof process !== 'undefined' && process.env && typeof process.env[key] === 'string') {
		const value = process.env[key];
		return value && value.length > 0 ? value : undefined;
	}
	return undefined;
}

function isDevEnvironment(): boolean {
	const metaEnv = (import.meta as unknown as { env?: Record<string, unknown> })?.env;
	if (metaEnv && typeof metaEnv.DEV === 'boolean') return metaEnv.DEV;
	if (metaEnv && typeof metaEnv.PROD === 'boolean') return !metaEnv.PROD;
	return process.env?.NODE_ENV !== 'production';
}

// Ephemeral, process-local, cryptographically random key used ONLY when running in a dev
// environment and no SESSION_SECRET has been configured. This is intentionally never used in
// production: it is regenerated (and therefore invalidates all existing sessions) every time the
// process restarts, which is an acceptable trade-off for local development but not for prod.
let ephemeralDevSecret: string | null = null;
let warnedAboutEphemeralSecret = false;

function getSecret(): string {
	const configured = readEnv('SESSION_SECRET');
	if (configured) {
		if (Buffer.byteLength(configured, 'utf8') < 32) {
			throw new Error('SESSION_SECRET must contain at least 32 bytes.');
		}
		return configured;
	}

	if (isDevEnvironment()) {
		if (!ephemeralDevSecret) {
			ephemeralDevSecret = randomBytes(32).toString('hex');
		}
		if (!warnedAboutEphemeralSecret) {
			warnedAboutEphemeralSecret = true;
			// eslint-disable-next-line no-console
			console.warn(
				'[auth] SESSION_SECRET is not set. Using an ephemeral, random, dev-only signing key. ' +
					'All existing sessions will be invalidated whenever the dev server restarts. ' +
					'Set SESSION_SECRET in .env for persistent local sessions.',
			);
		}
		return ephemeralDevSecret;
	}

	// Fail closed: never run with a predictable or missing secret in production.
	throw new Error(
		'SESSION_SECRET is not set. Refusing to create or verify sessions outside of a dev environment without it.',
	);
}

function toBase64Url(input: Buffer | string): string {
	const buf = typeof input === 'string' ? Buffer.from(input, 'utf8') : input;
	return buf.toString('base64url');
}

function fromBase64Url(input: string): Buffer | null {
	try {
		return Buffer.from(input, 'base64url');
	} catch {
		return null;
	}
}

function sign(payloadEncoded: string): string {
	const secret = getSecret();
	return toBase64Url(createHmac('sha256', secret).update(payloadEncoded).digest());
}

/**
 * Creates a signed, stateless session token carrying `purpose`, the provided claims, and an
 * expiry computed from `ttlSeconds` from now.
 */
export function createSession(
	purpose: SessionPurpose,
	claims: Record<string, unknown>,
	ttlSeconds: number,
): string {
	const payload: SessionPayload = {
		...claims,
		purpose,
		exp: Math.floor(Date.now() / 1000) + ttlSeconds,
	};
	const payloadEncoded = toBase64Url(JSON.stringify(payload));
	const signature = sign(payloadEncoded);
	return `${payloadEncoded}.${signature}`;
}

/**
 * Verifies a session token. Returns the decoded payload only if the token is well-formed, the
 * signature matches (compared in constant time), the token has not expired, and its `purpose`
 * claim matches `expectedPurpose`. Returns `null` for any other case, including legacy/plain
 * cookie values that are not valid signed tokens at all.
 */
export function verifySession<T extends Record<string, unknown> = Record<string, unknown>>(
	token: string | undefined | null,
	expectedPurpose: SessionPurpose,
): (T & SessionPayload) | null {
	if (!token || typeof token !== 'string') return null;

	const parts = token.split('.');
	if (parts.length !== 2) return null;
	const [payloadEncoded, signature] = parts;
	if (!payloadEncoded || !signature) return null;

	let expectedSignature: string;
	try {
		expectedSignature = sign(payloadEncoded);
	} catch {
		// No usable secret (e.g. misconfigured production environment): fail closed.
		return null;
	}

	const providedSigBuf = fromBase64Url(signature);
	const expectedSigBuf = fromBase64Url(expectedSignature);
	if (!providedSigBuf || !expectedSigBuf) return null;
	if (providedSigBuf.length !== expectedSigBuf.length) return null;
	if (!timingSafeEqual(providedSigBuf, expectedSigBuf)) return null;

	const payloadBuf = fromBase64Url(payloadEncoded);
	if (!payloadBuf) return null;

	let payload: SessionPayload;
	try {
		payload = JSON.parse(payloadBuf.toString('utf8'));
	} catch {
		return null;
	}

	if (!payload || typeof payload !== 'object') return null;
	if (payload.purpose !== expectedPurpose) return null;
	if (typeof payload.exp !== 'number' || !Number.isFinite(payload.exp)) return null;
	if (payload.exp < Math.floor(Date.now() / 1000)) return null;

	return payload as T & SessionPayload;
}
