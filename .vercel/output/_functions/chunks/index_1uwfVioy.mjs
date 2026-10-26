import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, F as addAttribute, M as renderTemplate, N as maybeRenderHead } from "./sequence_DKkBVb9G.mjs";
import { n as createComponent, t as createAstro } from "./compiler_B21378Bx.mjs";
import { n as $$Layout, t as $$SiteNav } from "./SiteNav_DLV5JPOm.mjs";
import { n as site } from "./site_KPf2B4Rz.mjs";
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
		"default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="hero" data-astro-cid-lcdefpme><div class="hero-panel" data-astro-cid-lcdefpme><h1 data-astro-cid-lcdefpme>${site.nameLines[0]} <span class="amp" data-astro-cid-lcdefpme>&amp;</span> ${site.nameLines[1]}</h1><div class="hero-separator" data-astro-cid-lcdefpme></div>${group && renderTemplate`<p class="greeting" data-astro-cid-lcdefpme>Bienvenue sur notre site de mariage !</p>`}<p class="subtitle" data-astro-cid-lcdefpme>Vous trouverez ici toutes les informations pour préparer cette journée.</p><p class="subtitle" data-astro-cid-lcdefpme>Nous vous remercions de bien vouloir confirmer votre présence via <a href="/rsvp" class="rsvp-link" data-astro-cid-lcdefpme>ce formulaire</a> avant le 28 février 2027.</p></div><div class="hero-media" role="img"${addAttribute(site.name, "aria-label")} data-astro-cid-lcdefpme><span data-astro-cid-lcdefpme>Photo à venir</span></div></section><footer class="contact-footer" data-astro-cid-lcdefpme><p class="contact-title" data-astro-cid-lcdefpme>Contact</p><p class="contact-info" data-astro-cid-lcdefpme>xx xx xx xx xx (Tiffany) / xx xx xx xx xx (Charles)</p><p class="contact-info" data-astro-cid-lcdefpme>xxx</p></footer>`,
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
