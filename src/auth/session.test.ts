// Unit tests for the stateless HMAC-signed session helper. Run with:
//   npm test
// (tsx --test). These tests only exercise src/auth/session.ts — they never import the Astro
// app, the DB client, or anything that could touch the live Turso database.
import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';

// session.ts resolves its secret from `import.meta.env.SESSION_SECRET` when available, and
// falls back to `process.env.SESSION_SECRET` under plain Node (which is how tsx runs this
// file). We drive all scenarios through process.env.
const ENV_KEYS = ['SESSION_SECRET', 'NODE_ENV'] as const;
type SavedEnv = Partial<Record<(typeof ENV_KEYS)[number], string | undefined>>;

function saveEnv(): SavedEnv {
	const saved: SavedEnv = {};
	for (const key of ENV_KEYS) saved[key] = process.env[key];
	return saved;
}

function restoreEnv(saved: SavedEnv) {
	for (const key of ENV_KEYS) {
		if (saved[key] === undefined) delete process.env[key];
		else process.env[key] = saved[key];
	}
}

describe('session (dev mode, explicit SESSION_SECRET)', () => {
	let saved: SavedEnv;

	beforeEach(async () => {
		saved = saveEnv();
		process.env.SESSION_SECRET = 'test-session-secret-for-unit-tests-only-32bytes';
		delete process.env.NODE_ENV; // not 'production' => treated as dev-ish, but secret is set anyway
	});

	afterEach(() => {
		restoreEnv(saved);
	});

	test('round-trips a valid admin session', async () => {
		const { createSession, verifySession } = await import('./session.js?t=' + Math.random());
		const token = createSession('admin', {}, 60);
		const session = verifySession(token, 'admin');
		assert.ok(session);
		assert.equal(session.purpose, 'admin');
	});

	test('round-trips a valid guest session with claims', async () => {
		const { createSession, verifySession } = await import('./session.js?t=' + Math.random());
		const token = createSession('guest', { groupId: 42 }, 60);
		const session = verifySession<{ groupId: number }>(token, 'guest');
		assert.ok(session);
		assert.equal(session.groupId, 42);
	});

	test('rejects a tampered signature', async () => {
		const { createSession, verifySession } = await import('./session.js?t=' + Math.random());
		const token = createSession('admin', {}, 60);
		const [payload, signature] = token.split('.');
		const tamperedSig = signature.slice(0, -1) + (signature.at(-1) === 'A' ? 'B' : 'A');
		const tampered = `${payload}.${tamperedSig}`;
		assert.equal(verifySession(tampered, 'admin'), null);
	});

	test('rejects a tampered payload', async () => {
		const { createSession, verifySession } = await import('./session.js?t=' + Math.random());
		const token = createSession('guest', { groupId: 1 }, 60);
		const [, signature] = token.split('.');
		const forgedPayload = Buffer.from(JSON.stringify({ purpose: 'guest', groupId: 999, exp: Math.floor(Date.now() / 1000) + 60 })).toString('base64url');
		assert.equal(verifySession(`${forgedPayload}.${signature}`, 'guest'), null);
	});

	test('rejects an expired session', async () => {
		const { createSession, verifySession } = await import('./session.js?t=' + Math.random());
		const token = createSession('admin', {}, -10); // already expired
		assert.equal(verifySession(token, 'admin'), null);
	});

	test('rejects a session with the wrong purpose', async () => {
		const { createSession, verifySession } = await import('./session.js?t=' + Math.random());
		const token = createSession('guest', { groupId: 1 }, 60);
		assert.equal(verifySession(token, 'admin'), null);
	});

	test('rejects legacy / malformed cookie values', async () => {
		const { verifySession } = await import('./session.js?t=' + Math.random());
		assert.equal(verifySession('authenticated', 'admin'), null);
		assert.equal(verifySession('42', 'guest'), null);
		assert.equal(verifySession('', 'admin'), null);
		assert.equal(verifySession(undefined, 'admin'), null);
		assert.equal(verifySession('not-base64url!!.not-base64url!!', 'admin'), null);
		assert.equal(verifySession('onlyonepart', 'admin'), null);
	});

	test('rejects a signature produced under a different secret', async () => {
		const mod = await import('./session.js?t=' + Math.random());
		const token = mod.createSession('admin', {}, 60);

		process.env.SESSION_SECRET = 'a-completely-different-session-secret-32bytes';
		const mod2 = await import('./session.js?t=' + Math.random());
		assert.equal(mod2.verifySession(token, 'admin'), null);
	});
});

describe('session (production mode, no SESSION_SECRET)', () => {
	let saved: SavedEnv;

	beforeEach(() => {
		saved = saveEnv();
		delete process.env.SESSION_SECRET;
		process.env.NODE_ENV = 'production';
	});

	afterEach(() => {
		restoreEnv(saved);
	});

	test('fails closed: createSession throws when no secret is configured', async () => {
		const { createSession } = await import('./session.js?t=' + Math.random());
		assert.throws(() => createSession('admin', {}, 60));
	});

	test('fails closed: verifySession rejects (rather than throws) when no secret is configured', async () => {
		const { verifySession } = await import('./session.js?t=' + Math.random());
		assert.equal(verifySession('anything.anything', 'admin'), null);
	});

	test('rejects a configured production secret shorter than 32 bytes', async () => {
		process.env.SESSION_SECRET = 'short-secret';
		const { createSession } = await import('./session.js?t=' + Math.random());
		assert.throws(() => createSession('admin', {}, 60), /at least 32 bytes/);
	});
});

describe('session (dev mode, no SESSION_SECRET => ephemeral key)', () => {
	let saved: SavedEnv;

	beforeEach(() => {
		saved = saveEnv();
		delete process.env.SESSION_SECRET;
		delete process.env.NODE_ENV; // not production => dev-ish fallback applies
	});

	afterEach(() => {
		restoreEnv(saved);
	});

	test('creates and verifies sessions using an ephemeral per-process key', async () => {
		const mod = await import('./session.js?t=' + Math.random());
		const token = mod.createSession('admin', {}, 60);
		const session = mod.verifySession(token, 'admin');
		assert.ok(session);
	});
});
