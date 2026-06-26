import type { ResponseData } from "./type";
import axios from "axios";

export const getPokemon = async (
	url: string = "https://pokeapi.co/api/v2/pokemon",
) => {
	try {
		const response = await axios.get(url);
		const results = response.data.results.map((item: any) => {
			const id = item.url.split("/").filter(Boolean).pop();
			return {
				...item,
				id: Number(id),
			};
		});
		return {
			...response.data,
			results,
		} as ResponseData;
	} catch (error) {
		console.error(error);
	}
};
