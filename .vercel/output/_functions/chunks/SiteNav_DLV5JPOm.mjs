import { F as addAttribute, I as createRenderInstruction, M as renderTemplate, N as maybeRenderHead, P as renderHead, k as renderSlot } from "./sequence_DKkBVb9G.mjs";
import { n as createComponent, t as createAstro } from "./compiler_B21378Bx.mjs";
import { t as actions } from "./_astro_actions_BRoQ1mWB.mjs";
import { n as site, t as navItems } from "./site_KPf2B4Rz.mjs";
// node_modules/astro/dist/runtime/server/render/script.js
/**
* Relies on the `renderScript: true` compiler option
* @experimental
*/
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
// src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title = site.name, description = `${site.name} — ${site.subtitle}` } = Astro.props;
	return renderTemplate`<html lang="fr" data-astro-cid-ju4pidww><head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="viewport" content="width=device-width"><meta name="theme-color" content="#2D4A6F"><meta name="generator"${addAttribute(Astro.generator, "content")}><meta name="description"${addAttribute(description, "content")}><title>${title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;1,6..96,400;1,6..96,500&family=Great+Vibes&display=swap" rel="stylesheet">${renderHead($$result)}</head><body data-astro-cid-ju4pidww>${renderSlot($$result, $$slots["header"])}<main data-astro-cid-ju4pidww>${renderSlot($$result, $$slots["default"])}</main><footer class="site-footer" data-astro-cid-ju4pidww><p data-astro-cid-ju4pidww>${site.name}</p></footer></body></html>`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/layouts/Layout.astro", void 0);
// src/components/SiteNav.astro
createAstro("https://astro.build");
var $$SiteNav = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SiteNav;
	const { variant = "bar" } = Astro.props;
	const group = Astro.locals.group;
	return renderTemplate`${maybeRenderHead($$result)}<nav${addAttribute(["site-nav", `site-nav--${variant}`], "class:list")} aria-label="Navigation principale" data-astro-cid-rutobish><a class="site-nav__brand" href="/" data-astro-cid-rutobish>${site.name}</a><button class="nav-toggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="site-nav-menu" data-nav-toggle data-astro-cid-rutobish><span class="nav-toggle__bar" aria-hidden="true" data-astro-cid-rutobish></span><span class="nav-toggle__bar" aria-hidden="true" data-astro-cid-rutobish></span><span class="nav-toggle__bar" aria-hidden="true" data-astro-cid-rutobish></span></button><div class="site-nav__menu" id="site-nav-menu" data-astro-cid-rutobish><ul class="site-nav__links" data-astro-cid-rutobish>${navItems.map((item) => renderTemplate`<li${addAttribute([{ "has-children": item.children }], "class:list")} data-astro-cid-rutobish>${item.href ? renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute({ active: Astro.url.pathname.startsWith(item.href) }, "class:list")} data-astro-cid-rutobish>${item.label}${item.children && renderTemplate`<span class="caret" aria-hidden="true" data-astro-cid-rutobish>▾</span>`}</a>` : renderTemplate`<button type="button" class="nav-trigger" data-astro-cid-rutobish>${item.label}${item.children && renderTemplate`<span class="caret" aria-hidden="true" data-astro-cid-rutobish>▾</span>`}</button>`}${item.children && renderTemplate`<ul class="submenu" data-astro-cid-rutobish>${item.children.map((child) => renderTemplate`<li data-astro-cid-rutobish><a${addAttribute(child.href, "href")}${addAttribute({ active: Astro.url.pathname === child.href || Astro.url.pathname.startsWith(child.href + "/") }, "class:list")} data-astro-cid-rutobish>${child.label}</a></li>`)}</ul>`}</li>`)}</ul>${group && renderTemplate`<div class="site-nav__user" data-astro-cid-rutobish><span class="user-name" data-astro-cid-rutobish>${group.name}</span><form method="post"${addAttribute(actions.logout, "action")} class="logout-form" data-astro-cid-rutobish><button type="submit" class="user-logout" title="Changer d'utilisateur" data-astro-cid-rutobish>×</button></form></div>`}</div></nav>${renderScript($$result, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/SiteNav.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/SiteNav.astro", void 0);
export { $$Layout as n, renderScript as r, $$SiteNav as t };
