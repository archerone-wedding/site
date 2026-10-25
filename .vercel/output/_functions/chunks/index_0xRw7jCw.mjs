import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, F as addAttribute, M as renderTemplate, N as maybeRenderHead } from "./sequence_DKkBVb9G.mjs";
import { t as createComponent } from "./compiler_Dw1JVzKQ.mjs";
import { t as createAstro } from "./astro-global_CbcmTR0i.mjs";
import { n as site } from "./site_KPf2B4Rz.mjs";
import { n as $$Layout, t as $$SiteNav } from "./SiteNav_DKhr69oD.mjs";
// src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
createAstro("https://astro.build");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const group = Astro.locals.group;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-lcdefpme": true }, {
		"default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="hero" data-astro-cid-lcdefpme><div class="hero-panel" data-astro-cid-lcdefpme><h1 data-astro-cid-lcdefpme>${site.nameLines[0]}<br data-astro-cid-lcdefpme>${site.nameLines[1]}</h1><p class="date" data-astro-cid-lcdefpme>${site.date}</p>${group && renderTemplate`<p class="greeting" data-astro-cid-lcdefpme>Bienvenue sur notre site de mariage !</p>`}<p class="subtitle" data-astro-cid-lcdefpme>${site.subtitle}</p></div><div class="hero-media" role="img"${addAttribute(site.name, "aria-label")} data-astro-cid-lcdefpme><span data-astro-cid-lcdefpme>Photo à venir</span></div><div class="hero-photo" role="img" aria-label="Photo des mariés" data-astro-cid-lcdefpme><span data-astro-cid-lcdefpme>Photo des mariés à venir</span></div></section>`,
		"header": ($$result) => renderTemplate`<div class="landing-nav" data-astro-cid-lcdefpme>${renderComponent($$result, "SiteNav", $$SiteNav, {
			"variant": "inline",
			"data-astro-cid-lcdefpme": true
		})}</div>`
	})}`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/index.astro", void 0);
var $$file = "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/index.astro";
// \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
export { page };
