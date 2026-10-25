import { F as addAttribute, M as renderTemplate, N as maybeRenderHead, P as renderHead, k as renderSlot } from "./sequence_DKkBVb9G.mjs";
import { t as createComponent } from "./compiler_Dw1JVzKQ.mjs";
import { t as createAstro } from "./astro-global_CbcmTR0i.mjs";
import { t as actions } from "./_astro_actions_DTsf1g_2.mjs";
import { n as site, t as navItems } from "./site_KPf2B4Rz.mjs";
// src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title = site.name, description = `${site.name} — ${site.subtitle}` } = Astro.props;
	return renderTemplate`<html lang="fr" data-astro-cid-ju4pidww><head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="viewport" content="width=device-width"><meta name="theme-color" content="#faf8f5"><meta name="generator"${addAttribute(Astro.generator, "content")}><meta name="description"${addAttribute(description, "content")}><title>${title}</title>${renderHead($$result)}</head><body data-astro-cid-ju4pidww>${renderSlot($$result, $$slots["header"])}<main data-astro-cid-ju4pidww>${renderSlot($$result, $$slots["default"])}</main><footer class="site-footer" data-astro-cid-ju4pidww><p data-astro-cid-ju4pidww>${site.name}</p></footer></body></html>`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/layouts/Layout.astro", void 0);
// src/components/SiteNav.astro
createAstro("https://astro.build");
var $$SiteNav = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SiteNav;
	const { variant = "bar" } = Astro.props;
	const group = Astro.locals.group;
	return renderTemplate`${maybeRenderHead($$result)}<nav${addAttribute(["site-nav", `site-nav--${variant}`], "class:list")} aria-label="Navigation principale" data-astro-cid-rutobish><a class="site-nav__brand" href="/" data-astro-cid-rutobish>${site.name}</a><ul class="site-nav__links" data-astro-cid-rutobish>${navItems.map((item) => renderTemplate`<li${addAttribute([{ "has-children": item.children }], "class:list")} data-astro-cid-rutobish>${item.href ? renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute({ active: Astro.url.pathname.startsWith(item.href) }, "class:list")} data-astro-cid-rutobish>${item.label}${item.children && renderTemplate`<span class="caret" aria-hidden="true" data-astro-cid-rutobish>▾</span>`}</a>` : renderTemplate`<button type="button" class="nav-trigger" data-astro-cid-rutobish>${item.label}${item.children && renderTemplate`<span class="caret" aria-hidden="true" data-astro-cid-rutobish>▾</span>`}</button>`}${item.children && renderTemplate`<ul class="submenu" data-astro-cid-rutobish>${item.children.map((child) => renderTemplate`<li data-astro-cid-rutobish><a${addAttribute(child.href, "href")}${addAttribute({ active: Astro.url.pathname === child.href || Astro.url.pathname.startsWith(child.href + "/") }, "class:list")} data-astro-cid-rutobish>${child.label}</a></li>`)}</ul>`}</li>`)}</ul>${group && renderTemplate`<div class="site-nav__user" data-astro-cid-rutobish><span class="user-name" data-astro-cid-rutobish>${group.name}</span><form method="post"${addAttribute(actions.logout, "action")} class="logout-form" data-astro-cid-rutobish><button type="submit" class="user-logout" title="Changer d'utilisateur" data-astro-cid-rutobish>×</button></form></div>`}</nav>`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/SiteNav.astro", void 0);
export { $$Layout as n, $$SiteNav as t };
