export interface ResponseData {
	count: number;
	next: string;
	previous: string | null;
	results: Pokemon[];
}

export interface Pokemon {
	name: string;
	url: string;
	id: number;
}
