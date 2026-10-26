import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, M as renderTemplate, N as maybeRenderHead } from "./sequence_DKkBVb9G.mjs";
import { n as createComponent } from "./compiler_B21378Bx.mjs";
import { n as site } from "./site_KPf2B4Rz.mjs";
import { t as $$PageLayout } from "./PageLayout_CTg47sDt.mjs";
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="page" data-astro-cid-n57aacfu><h1 data-astro-cid-n57aacfu>Informations légales</h1><div class="section-separator" data-astro-cid-n57aacfu></div><p data-astro-cid-n57aacfu>Ce site est hébergé par Vercel Inc.<br data-astro-cid-n57aacfu>Les données collectées sont uniquement destinées à l'organisation du mariage et ne sont pas transmises à des tiers.</p></section>` })}`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/legad.astro", void 0);
var $$file = "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/legad.astro";
var $$url = "/legad";
// \0virtual:astro:page:src/pages/legad@_@astro
var page = () => legad_exports;
export { page };
