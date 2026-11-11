import { defineMiddleware } from 'astro:middleware';
import { eq } from 'drizzle-orm';
import { db } from './db/client';
import { guestGroup } from './db/schema';
import { verifySession } from './auth/session';
import { withSecurityHeaders } from './security/headers';

const PUBLIC_PATHS = ['/gate', '/favicon.svg', '/favicon.ico', '/admin'];

export const onRequest = defineMiddleware(async (context, next) => {
	const pathname = context.url.pathname;

	// Laisser passer les assets publics
	if (PUBLIC_PATHS.includes(pathname) || pathname.startsWith('/_')) {
		return withSecurityHeaders(await next());
	}

	const rawGroupCookie = context.cookies.get('wedding_group')?.value;
	if (rawGroupCookie) {
		const session = verifySession<{ groupId: number }>(rawGroupCookie, 'guest');
		if (session && Number.isSafeInteger(session.groupId) && session.groupId > 0) {
			const group = await db
				.select()
				.from(guestGroup)
				.where(eq(guestGroup.id, session.groupId))
				.get();
			if (group && group.isActive) {
				context.locals.group = group;
			} else {
				context.cookies.delete('wedding_group', { path: '/' });
			}
		} else {
			// Malformed, tampered, expired, wrong-purpose, or legacy (plain numeric) cookie.
			context.cookies.delete('wedding_group', { path: '/' });
		}
	}

	if (!context.locals.group && pathname !== '/gate') {
		return withSecurityHeaders(context.redirect('/gate'));
	}

	return withSecurityHeaders(await next());
});
