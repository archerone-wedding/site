import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { n as createComponent, t as createAstro } from "./compiler_B21378Bx.mjs";
// src/pages/logout.astro
var logout_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Logout,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Logout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Logout;
	Astro.cookies.delete("wedding_group", { path: "/" });
	return Astro.redirect("/gate");
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/logout.astro", void 0);
var $$file = "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/logout.astro";
var $$url = "/logout";
// \0virtual:astro:page:src/pages/logout@_@astro
var page = () => logout_exports;
export { page };
