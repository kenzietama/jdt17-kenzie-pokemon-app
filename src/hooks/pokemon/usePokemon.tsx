import { useEffect, useState } from "react";
import { getPokemon, type Pokemon } from "@/service/pokemon";

export const usePokemon = (url: string = "") => {
	const [pokemon, setPokemon] = useState<Pokemon[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [nextUrl, setNextUrl] = useState<string | null>(null);
	const [previousUrl, setPreviousUrl] = useState<string | null>(null);

	const fetchPokemon = async () => {
		setLoading(true);
		try {
			const response = await (url === "" ? getPokemon() : getPokemon(url));
			if (response) {
				setPokemon(response.results);
				setNextUrl(response.next);
				setPreviousUrl(response.previous);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPokemon();
	}, [url]);

	return { pokemon, loading, nextUrl, previousUrl };
};
