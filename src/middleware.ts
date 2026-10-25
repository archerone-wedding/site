import { defineMiddleware } from 'astro:middleware';
import { eq } from 'drizzle-orm';
import { db } from './db/client';
import { guestGroup } from './db/schema';

const PUBLIC_PATHS = ['/gate', '/favicon.svg', '/favicon.ico', '/admin'];

export const onRequest = defineMiddleware(async (context, next) => {
	const pathname = context.url.pathname;

	// Laisser passer les assets publics
	if (PUBLIC_PATHS.includes(pathname) || pathname.startsWith('/_')) {
		return next();
	}

	const groupId = context.cookies.get('wedding_group')?.value;
	if (groupId) {
		const group = await db
			.select()
			.from(guestGroup)
			.where(eq(guestGroup.id, Number(groupId)))
			.get();
		if (group && group.isActive) {
			context.locals.group = group;
		} else {
			context.cookies.delete('wedding_group', { path: '/' });
		}
	}

	if (!context.locals.group && pathname !== '/gate') {
		return context.redirect('/gate');
	}

	return next();
});
