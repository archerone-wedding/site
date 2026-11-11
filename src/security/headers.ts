// HSTS stays off until the canonical HTTPS domain is confirmed.
export const SECURITY_HEADERS = {
	'Content-Security-Policy': [
		"default-src 'self'",
		"base-uri 'self'",
		"object-src 'none'",
		"frame-ancestors 'none'",
		"form-action 'self'",
		"script-src 'self'",
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
		"font-src 'self' data: https://fonts.gstatic.com",
		"img-src 'self' data: blob: https://tile.openstreetmap.org",
		"connect-src 'self'",
	].join('; '),
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'DENY',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'Strict-Transport-Security': 'max-age=31536000',
	'Permissions-Policy': 'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
} as const;

export function withSecurityHeaders(response: Response, isDevelopment = false): Response {
	const headers = new Headers(response.headers);
	for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
		headers.set(name, value);
	}

	if (isDevelopment) {
		headers.set(
			'Content-Security-Policy',
			SECURITY_HEADERS['Content-Security-Policy']
				.replace("script-src 'self'", "script-src 'self' 'unsafe-inline'")
				.replace("connect-src 'self'", "connect-src 'self' ws: wss:")
				.replace("img-src 'self'", "worker-src 'self' blob:; img-src 'self'"),
		);
	}

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}
