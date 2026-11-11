import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { SECURITY_HEADERS, withSecurityHeaders } from './headers';

test('CSP blocks inline scripts and allows only required third-party origins', () => {
	const csp = SECURITY_HEADERS['Content-Security-Policy'];
	assert.match(csp, /script-src 'self'(?:;|$)/);
	assert.doesNotMatch(csp, /script-src[^;]*unsafe-inline/);
	assert.match(csp, /frame-ancestors 'none'/);
	assert.match(csp, /https:\/\/fonts\.googleapis\.com/);
	assert.match(csp, /https:\/\/fonts\.gstatic\.com/);
	assert.match(csp, /https:\/\/tile\.openstreetmap\.org/);
	assert.equal(SECURITY_HEADERS['Strict-Transport-Security'], 'max-age=31536000');
});

test('Vercel static-response headers match middleware security headers', async () => {
	const config = JSON.parse(await readFile(new URL('../../vercel.json', import.meta.url), 'utf8'));
	const configured = new Map(config.headers[0].headers.map(({ key, value }: { key: string; value: string }) => [key.toLowerCase(), value]));

	for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
		assert.equal(configured.get(name.toLowerCase()), value, `${name} differs in vercel.json`);
	}
});

test('security headers are applied without losing response status, body, or existing headers', async () => {
	const response = withSecurityHeaders(
		new Response('ok', { status: 201, headers: { 'x-existing': 'kept' } }),
	);

	assert.equal(response.status, 201);
	assert.equal(response.headers.get('x-existing'), 'kept');
	assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
	assert.equal(response.headers.get('X-Frame-Options'), 'DENY');
	assert.equal(response.headers.get('Referrer-Policy'), 'strict-origin-when-cross-origin');
	assert.equal(response.headers.get('Permissions-Policy'), SECURITY_HEADERS['Permissions-Policy']);
	assert.equal(await response.text(), 'ok');
});
