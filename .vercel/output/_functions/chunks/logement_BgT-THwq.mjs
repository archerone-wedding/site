import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, M as renderTemplate, N as maybeRenderHead } from "./sequence_DKkBVb9G.mjs";
import { n as createComponent } from "./compiler_B21378Bx.mjs";
import { n as site } from "./site_KPf2B4Rz.mjs";
import { t as $$PageLayout } from "./PageLayout_CTg47sDt.mjs";
// src/pages/logement.astro
var logement_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Logement,
	file: () => $$file,
	url: () => $$url
});
var $$Logement = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, {
		"title": `Logements — ${site.name}`,
		"data-astro-cid-h6h77ywd": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="page" data-astro-cid-h6h77ywd><h1 data-astro-cid-h6h77ywd>Logements</h1><div class="section-separator" data-astro-cid-h6h77ywd></div><p data-astro-cid-h6h77ywd>Vous trouverez ci-dessous une liste de logements situés à proximité du lieu de réception.</p><p class="placeholder" data-astro-cid-h6h77ywd>Xxx</p></section>` })}`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/logement.astro", void 0);
var $$file = "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/logement.astro";
var $$url = "/logement";
// \0virtual:astro:page:src/pages/logement@_@astro
var page = () => logement_exports;
export { page };
