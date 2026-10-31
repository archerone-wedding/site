import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, F as addAttribute, M as renderTemplate, N as maybeRenderHead } from "./sequence_DKkBVb9G.mjs";
import { n as createComponent } from "./compiler_B21378Bx.mjs";
import { n as $$Layout, r as renderScript, t as $$SiteNav } from "./SiteNav_CDfxEMrF.mjs";
import { n as site } from "./site_hYnZ1M7a.mjs";
// src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"hideFooter": true,
		"data-astro-cid-lcdefpme": true
	}, {
		"default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="hero" data-astro-cid-lcdefpme><div class="hero-bg" role="img"${addAttribute(site.name, "aria-label")} data-astro-cid-lcdefpme></div><div class="hero-overlay" data-astro-cid-lcdefpme></div><div class="hero-panel" data-astro-cid-lcdefpme><h1 class="reveal" data-delay="0" data-astro-cid-lcdefpme>${site.nameLines[0]} <span class="amp" data-astro-cid-lcdefpme>&amp;</span> ${site.nameLines[1]}</h1><div class="hero-separator reveal" data-delay="1" data-astro-cid-lcdefpme></div><p class="date reveal" data-delay="2" data-astro-cid-lcdefpme>29 mai 2027</p></div></section>`,
		"header": ($$result) => renderTemplate`<div class="landing-nav" data-astro-cid-lcdefpme>${renderComponent($$result, "SiteNav", $$SiteNav, {
			"variant": "inline",
			"brandImage": "/img/Monogramme-white.png",
			"noBrandLink": true,
			"data-astro-cid-lcdefpme": true
		})}</div>`
	})}${renderScript($$result, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/index.astro", void 0);
var $$file = "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/index.astro";
// \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
export { page };
