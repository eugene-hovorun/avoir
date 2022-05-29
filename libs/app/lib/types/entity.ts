export interface Category {
	id: number;
	name: string;
	slug: string;
	image: string;
}

export interface Product {
	id: number;
	name: string;
	slug: string;
	image: string;
	categorySlug?: string;
}
