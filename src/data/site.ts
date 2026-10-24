export const site = {
	name: "Tiffany et Charles",
	/** Name split per line for the landing hero heading. */
	nameLines: ["Tiffany", "Charles"],
	date: "Samedi 29 mai 2027",
	subtitle: "Bienvenue sur notre site de mariage ! Vous trouverez ici toutes les informations pour préparer cette journée. Nous vous remercions de bien vouloir confirmer votre présence via ce formulaire avant le 29 janvier 2027.",
} as const;

export interface NavItem {
	label: string;
	href?: string;
	children?: readonly NavItem[];
}

/**
 * Central navigation source. Every page renders its links from this list so
 * adding/renaming a route happens in exactly one place.
 */
export const navItems: readonly NavItem[] = [
	{ label: "Programme", href: "/le-mariage" },
	{
		label: "Préparatifs",
		children: [
			{ label: "Accès", href: "/itineraire" },
			{ label: "Logements", href: "/logement" },
			{ label: "Informations légales", href: "/legad" },
			{ label: "Nous contacter", href: "/contact" },
		],
	},
	
];
