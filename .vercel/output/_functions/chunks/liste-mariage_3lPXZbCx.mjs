import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, M as renderTemplate, N as maybeRenderHead } from "./sequence_DKkBVb9G.mjs";
import { n as createComponent } from "./compiler_B21378Bx.mjs";
import { r as renderScript } from "./SiteNav_CDfxEMrF.mjs";
import { n as site } from "./site_hYnZ1M7a.mjs";
import { t as $$PageLayout } from "./PageLayout_Bw0I5DRm.mjs";
// src/pages/liste-mariage.astro
var liste_mariage_exports = /* @__PURE__ */ __exportAll({
	default: () => $$ListeMariage,
	file: () => $$file,
	url: () => $$url
});
var $$ListeMariage = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, {
		"title": `Liste de mariage — ${site.name}`,
		"data-astro-cid-alrczozz": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="page" data-astro-cid-alrczozz><div class="page-header" data-astro-cid-alrczozz><h1 class="reveal" data-astro-cid-alrczozz>Liste de mariage</h1><div class="section-separator reveal-line" data-astro-cid-alrczozz></div></div><p class="intro reveal" data-astro-cid-alrczozz>Nous avons choisi de ne pas créer de liste de mariage.</p><p class="intro reveal" data-astro-cid-alrczozz>En revanche, si vous souhaitez nous faire un cadeau, nous serions très touchés que vous participiez à notre voyage de noces.</p><p class="intro reveal" data-astro-cid-alrczozz>Vos gestes, quels qu'ils soient, comptent énormément pour nous. Merci du fond du cœur.</p></section>` })}${renderScript($$result, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/liste-mariage.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/liste-mariage.astro", void 0);
var $$file = "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/liste-mariage.astro";
var $$url = "/liste-mariage";
// \0virtual:astro:page:src/pages/liste-mariage@_@astro
var page = () => liste_mariage_exports;
export { page };
