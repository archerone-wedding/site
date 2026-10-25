import { Dt as defineMiddleware, t as sequence } from "./chunks/sequence_DKkBVb9G.mjs";
import { n as guestGroup, r as db } from "./chunks/schema_CSUjTRWR.mjs";
import { eq } from "drizzle-orm";
// src/middleware.ts
var PUBLIC_PATHS = [
	"/gate",
	"/favicon.svg",
	"/favicon.ico",
	"/admin"
];
var onRequest$1 = defineMiddleware(async (context, next) => {
	const pathname = context.url.pathname;
	if (PUBLIC_PATHS.includes(pathname) || pathname.startsWith("/_")) return next();
	const groupId = context.cookies.get("wedding_group")?.value;
	if (groupId) {
		const group = await db.select().from(guestGroup).where(eq(guestGroup.id, Number(groupId))).get();
		if (group && group.isActive) context.locals.group = group;
		else context.cookies.delete("wedding_group", { path: "/" });
	}
	if (!context.locals.group && pathname !== "/gate") return context.redirect("/gate");
	return next();
});
// \0virtual:astro:middleware
var onRequest = sequence(onRequest$1);
export { onRequest };
