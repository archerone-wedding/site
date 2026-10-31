import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, M as renderTemplate, N as maybeRenderHead } from "./sequence_DKkBVb9G.mjs";
import { n as createComponent } from "./compiler_B21378Bx.mjs";
import { r as renderScript } from "./SiteNav_CyLVJxml.mjs";
import { n as site } from "./site_hYnZ1M7a.mjs";
import { t as $$PageLayout } from "./PageLayout_r_iybixN.mjs";
import { a as contact } from "./wedding_C-Ux7YO-.mjs";
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="page" data-astro-cid-6bfsojfh><div class="page-header" data-astro-cid-6bfsojfh><h1 class="reveal" data-astro-cid-6bfsojfh>Contact</h1><div class="section-separator reveal-line" data-astro-cid-6bfsojfh></div></div><p class="contact-name reveal" data-astro-cid-6bfsojfh>${contact.name}</p><address class="contact-address reveal" data-astro-cid-6bfsojfh>${contact.street}<br data-astro-cid-6bfsojfh>${contact.postalCode} ${contact.city}<br data-astro-cid-6bfsojfh>${contact.country}</address></section>` })}${renderScript($$result, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/contact.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/contact.astro", void 0);
var $$file = "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/contact.astro";
var $$url = "/contact";
// \0virtual:astro:page:src/pages/contact@_@astro
var page = () => contact_exports;
export { page };
