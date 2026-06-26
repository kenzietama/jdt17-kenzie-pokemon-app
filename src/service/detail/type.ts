export interface ResponseData {
	abilities: PokemonAbility[];
	base_experience: number;
	height: number;
	name: string;
	stats: PokemonStats[];
	types: PokemonTypes[];
	weight: number;
}

export interface PokemonAbility {
	ability: {
		name: string;
		url: string;
	};
}

export interface PokemonStats {
	base_stat: number;
	effort: 0;
	stat: {
		name: string;
		url: string;
	};
}

export interface PokemonTypes {
	slot: number;
	type: {
		name: string;
		url: string;
	};
}
