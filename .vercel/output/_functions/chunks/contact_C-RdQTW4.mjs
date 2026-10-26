import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, M as renderTemplate, N as maybeRenderHead } from "./sequence_DKkBVb9G.mjs";
import { n as createComponent } from "./compiler_B21378Bx.mjs";
import { n as site } from "./site_KPf2B4Rz.mjs";
import { t as $$PageLayout } from "./PageLayout_B8R2Jq7U.mjs";
import { a as contact } from "./wedding_Bn4MUFfi.mjs";
// src/pages/contact.astro
var contact_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Contact,
	file: () => $$file,
	url: () => $$url
});
var $$Contact = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, {
		"title": `Contact — ${site.name}`,
		"data-astro-cid-6bfsojfh": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="page" data-astro-cid-6bfsojfh><h1 data-astro-cid-6bfsojfh>Contact</h1><div class="section-separator" data-astro-cid-6bfsojfh></div><p class="contact-name" data-astro-cid-6bfsojfh>${contact.name}</p><address class="contact-address" data-astro-cid-6bfsojfh>${contact.street}<br data-astro-cid-6bfsojfh>${contact.postalcode} ${contact.city}<br data-astro-cid-6bfsojfh>${contact.country}</address></section>` })}`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/contact.astro", void 0);
var $$file = "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/contact.astro";
var $$url = "/contact";
// \0virtual:astro:page:src/pages/contact@_@astro
var page = () => contact_exports;
export { page };
