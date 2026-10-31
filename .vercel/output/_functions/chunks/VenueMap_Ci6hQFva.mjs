import { F as addAttribute, M as renderTemplate, N as maybeRenderHead } from "./sequence_DKkBVb9G.mjs";
import { n as createComponent, t as createAstro } from "./compiler_B21378Bx.mjs";
import { r as renderScript } from "./SiteNav_BQCbjjdY.mjs";
// src/components/VenueMap.astro
createAstro("https://astro.build");
var $$VenueMap = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$VenueMap;
	const { lat, lon, zoom = 16, label, height = "clamp(260px, 45vw, 400px)" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="venue-map"${addAttribute(lat, "data-lat")}${addAttribute(lon, "data-lon")}${addAttribute(zoom, "data-zoom")}${addAttribute(label, "data-label")} role="region"${addAttribute(`Carte : ${label}`, "aria-label")}${addAttribute(`--venue-map-height: ${height}`, "style")} data-astro-cid-dz6y6yqs><noscript><p class="venue-map__fallback" data-astro-cid-dz6y6yqs>${label}</p></noscript></div>${renderScript($$result, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/VenueMap.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/VenueMap.astro", void 0);
export { $$VenueMap as t };
