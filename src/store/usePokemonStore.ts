import { create } from "zustand";

interface PokemonStore {
	currentUrl: string;
	setCurrentUrl: (url: string) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
	currentUrl: "https://pokeapi.co/api/v2/pokemon",
	setCurrentUrl: (url) => set({ currentUrl: url }),
}));
