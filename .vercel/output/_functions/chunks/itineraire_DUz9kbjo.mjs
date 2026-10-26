import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, F as addAttribute, M as renderTemplate, N as maybeRenderHead } from "./sequence_DKkBVb9G.mjs";
import { n as createComponent, t as createAstro } from "./compiler_B21378Bx.mjs";
import { r as renderScript } from "./SiteNav_YArQPi5X.mjs";
import { n as site } from "./site_KPf2B4Rz.mjs";
import { t as $$PageLayout } from "./PageLayout_B8R2Jq7U.mjs";
import { c as venueDirectionsUrl, i as churchOsmUrl, l as venueOsmUrl, n as churchAddress, o as venue, r as churchDirectionsUrl, s as venueAddress, t as church } from "./wedding_Bn4MUFfi.mjs";
// src/components/VenueMap.astro
createAstro("https://astro.build");
var $$VenueMap = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$VenueMap;
	const { lat, lon, zoom = 16, label, height = "clamp(260px, 45vw, 400px)" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="venue-map"${addAttribute(lat, "data-lat")}${addAttribute(lon, "data-lon")}${addAttribute(zoom, "data-zoom")}${addAttribute(label, "data-label")} role="region"${addAttribute(`Carte : ${label}`, "aria-label")}${addAttribute(`--venue-map-height: ${height}`, "style")} data-astro-cid-dz6y6yqs><noscript><p class="venue-map__fallback" data-astro-cid-dz6y6yqs>${label}</p></noscript></div>${renderScript($$result, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/VenueMap.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/VenueMap.astro", void 0);
// src/pages/itineraire.astro
var itineraire_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Itineraire,
	file: () => $$file,
	url: () => $$url
});
var $$Itineraire = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, {
		"title": `Accès — ${site.name}`,
		"description": `Se rendre à ${churchAddress}`,
		"data-astro-cid-syswux6h": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="page" data-astro-cid-syswux6h><h1 data-astro-cid-syswux6h>Cérémonie</h1><div class="section-separator" data-astro-cid-syswux6h></div><div class="church" data-astro-cid-syswux6h><p class="church__name" data-astro-cid-syswux6h>${church.name}</p><address class="church__address" data-astro-cid-syswux6h>${churchAddress}</address><ul class="church__links" data-astro-cid-syswux6h><li data-astro-cid-syswux6h><a${addAttribute(churchDirectionsUrl, "href")} rel="noopener noreferrer" target="_blank" data-astro-cid-syswux6h>Ouvrir l'itinéraire</a></li><li data-astro-cid-syswux6h><a${addAttribute(churchOsmUrl, "href")} rel="noopener noreferrer" target="_blank" data-astro-cid-syswux6h>Voir sur OpenStreetMap</a></li></ul></div>${renderComponent($$result, "VenueMap", $$VenueMap, {
		"lat": church.lat,
		"lon": church.lon,
		"zoom": church.zoom,
		"label": churchAddress,
		"data-astro-cid-syswux6h": true
	})}</section><section class="page" data-astro-cid-syswux6h><h1 data-astro-cid-syswux6h>Réception</h1><div class="section-separator" data-astro-cid-syswux6h></div><div class="venue" data-astro-cid-syswux6h><p class="venue__name" data-astro-cid-syswux6h>${venue.name}</p><address class="venue__address" data-astro-cid-syswux6h>${venueAddress}</address><ul class="venue__links" data-astro-cid-syswux6h><li data-astro-cid-syswux6h><a${addAttribute(venueDirectionsUrl, "href")} rel="noopener noreferrer" target="_blank" data-astro-cid-syswux6h>Ouvrir l'itinéraire</a></li><li data-astro-cid-syswux6h><a${addAttribute(venueOsmUrl, "href")} rel="noopener noreferrer" target="_blank" data-astro-cid-syswux6h>Voir sur OpenStreetMap</a></li></ul></div>${renderComponent($$result, "VenueMap", $$VenueMap, {
		"lat": venue.lat,
		"lon": venue.lon,
		"zoom": venue.zoom,
		"label": venueAddress,
		"data-astro-cid-syswux6h": true
	})}</section>` })}`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/itineraire.astro", void 0);
var $$file = "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/itineraire.astro";
var $$url = "/itineraire";
// \0virtual:astro:page:src/pages/itineraire@_@astro
var page = () => itineraire_exports;
export { page };
