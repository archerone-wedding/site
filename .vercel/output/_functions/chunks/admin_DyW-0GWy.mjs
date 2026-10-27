import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { D as Fragment, E as renderComponent, F as addAttribute, M as renderTemplate, P as renderHead } from "./sequence_DKkBVb9G.mjs";
import { T as isActionError } from "./server_DLJeJieU.mjs";
import { n as createComponent, t as createAstro } from "./compiler_B21378Bx.mjs";
import { n as guestGroup, r as db } from "./schema_CSUjTRWR.mjs";
import { t as actions } from "./_astro_actions_BOisA_Zk.mjs";
// src/pages/admin.astro
var admin_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Admin,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Admin = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Admin;
	const isAdmin = Astro.url.searchParams.get("secret") === "admin-mariage-2027";
	let groups = [];
	if (isAdmin) groups = await db.select().from(guestGroup).orderBy(guestGroup.id);
	const createResult = Astro.getActionResult(actions.createGroup);
	const createError = createResult?.error && isActionError(createResult.error) ? createResult.error.message : null;
	return renderTemplate`<html lang="fr" data-astro-cid-hfbr3nnz><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Admin — Mariage</title>${renderHead($$result)}</head><body data-astro-cid-hfbr3nnz>${!isAdmin ? renderTemplate`<div class="gate" data-astro-cid-hfbr3nnz><h1 data-astro-cid-hfbr3nnz>Admin</h1><p style="color:var(--color-muted); margin:0 0 1.25rem;" data-astro-cid-hfbr3nnz>Entrez le mot de passe pour accéder à l'administration.</p><form method="get" data-astro-cid-hfbr3nnz><input type="password" name="secret" placeholder="Mot de passe" required autofocus data-astro-cid-hfbr3nnz><button type="submit" data-astro-cid-hfbr3nnz>Entrer</button></form></div>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<h1 data-astro-cid-hfbr3nnz>Invités</h1><form method="post"${addAttribute(actions.createGroup, "action")} data-astro-cid-hfbr3nnz><label for="name" data-astro-cid-hfbr3nnz>Nom du groupe</label><input type="text" id="name" name="name" required data-astro-cid-hfbr3nnz><label for="email" data-astro-cid-hfbr3nnz>E-mail</label><input type="email" id="email" name="email" required data-astro-cid-hfbr3nnz><label for="program" data-astro-cid-hfbr3nnz>Programme personnalisé</label><textarea id="program" name="program" rows="3" data-astro-cid-hfbr3nnz></textarea><label style="display:flex;align-items:center;gap:0.4rem;margin-bottom:1rem;" data-astro-cid-hfbr3nnz><input type="checkbox" name="plusOneAllowed" value="true" data-astro-cid-hfbr3nnz>Peut amener un +1</label><label for="category" data-astro-cid-hfbr3nnz>Catégorie d'invitation</label><select id="category" name="category" data-astro-cid-hfbr3nnz><option value="A" selected data-astro-cid-hfbr3nnz>A — Vin d'honneur, dîner et brunch</option><option value="B" data-astro-cid-hfbr3nnz>B — Vin d'honneur, dîner et brunch</option><option value="C" data-astro-cid-hfbr3nnz>C — Vin d'honneur et dîner</option><option value="D" data-astro-cid-hfbr3nnz>D — Vin d'honneur uniquement</option></select>${createError && renderTemplate`<p class="error" data-astro-cid-hfbr3nnz>${createError}</p>`}${createResult?.data && renderTemplate`<p style="color:var(--color-teal);margin:0 0 1rem;" data-astro-cid-hfbr3nnz>Groupe créé — code : <code data-astro-cid-hfbr3nnz>${createResult.data.code}</code></p>`}<button type="submit" data-astro-cid-hfbr3nnz>Ajouter le groupe</button></form><table data-astro-cid-hfbr3nnz><thead data-astro-cid-hfbr3nnz><tr data-astro-cid-hfbr3nnz><th data-astro-cid-hfbr3nnz>Nom</th><th data-astro-cid-hfbr3nnz>Code</th><th data-astro-cid-hfbr3nnz>Email</th><th data-astro-cid-hfbr3nnz>Actif</th><th data-astro-cid-hfbr3nnz>Catégorie</th><th data-astro-cid-hfbr3nnz></th></tr></thead><tbody data-astro-cid-hfbr3nnz>${groups.map((g) => renderTemplate`<tr data-astro-cid-hfbr3nnz><td data-astro-cid-hfbr3nnz>${g.name}</td><td data-astro-cid-hfbr3nnz><code data-astro-cid-hfbr3nnz>${g.accessCode}</code></td><td data-astro-cid-hfbr3nnz>${g.email}</td><td data-astro-cid-hfbr3nnz>${g.isActive ? "Oui" : "Non"}</td><td data-astro-cid-hfbr3nnz>${g.category}</td><td data-astro-cid-hfbr3nnz><form method="post"${addAttribute(actions.deleteGroup, "action")} style="display:inline" data-astro-cid-hfbr3nnz><input type="hidden" name="id"${addAttribute(g.id, "value")} data-astro-cid-hfbr3nnz><button type="submit" class="logout" onclick="return confirm('Supprimer ?')" data-astro-cid-hfbr3nnz>Supprimer</button></form></td></tr>`)}</tbody></table>` })}`}</body></html>`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/admin.astro", void 0);
var $$file = "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/admin.astro";
var $$url = "/admin";
// \0virtual:astro:page:src/pages/admin@_@astro
var page = () => admin_exports;
export { page };
