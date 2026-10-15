export const site = {
	name: "Tiffany et Charles",
	/** Name split per line for the landing hero heading. */
	nameLines: ["Tiffany", "Charles"],
	date: "Samedi 22 avril 2023",
	subtitle: "Nous allons nous marier !",
} as const;

export interface NavItem {
	label: string;
	href: string;
}

/**
 * Central navigation source. Every page renders its links from this list so
 * adding/renaming a route happens in exactly one place.
 */
export const navItems: readonly NavItem[] = [
	{ label: "Le mariage", href: "/le-mariage" },
	{ label: "Itinéraire", href: "/itineraire" },
];
