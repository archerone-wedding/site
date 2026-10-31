import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, M as renderTemplate, N as maybeRenderHead } from "./sequence_DKkBVb9G.mjs";
import { n as createComponent } from "./compiler_B21378Bx.mjs";
import { r as renderScript } from "./SiteNav_CyLVJxml.mjs";
import { n as site } from "./site_hYnZ1M7a.mjs";
import { t as $$PageLayout } from "./PageLayout_r_iybixN.mjs";
// src/pages/legad.astro
var legad_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Legad,
	file: () => $$file,
	url: () => $$url
});
var $$Legad = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, {
		"title": `Informations légales — ${site.name}`,
		"data-astro-cid-n57aacfu": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="page" data-astro-cid-n57aacfu><div class="page-header" data-astro-cid-n57aacfu><h1 class="reveal" data-astro-cid-n57aacfu>Informations légales</h1><div class="section-separator reveal-line" data-astro-cid-n57aacfu></div></div><p class="reveal" data-astro-cid-n57aacfu>Ce site est hébergé par Vercel Inc.<br data-astro-cid-n57aacfu>Les données collectées sont uniquement destinées à l'organisation du mariage et ne sont pas transmises à des tiers.</p></section>` })}${renderScript($$result, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/legad.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/legad.astro", void 0);
var $$file = "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/legad.astro";
var $$url = "/legad";
// \0virtual:astro:page:src/pages/legad@_@astro
var page = () => legad_exports;
export { page };
