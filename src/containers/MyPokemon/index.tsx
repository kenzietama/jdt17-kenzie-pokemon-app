import { useEffect, useState } from "react";
import { PokemonCard } from "@/components/pokemon";
import type { Pokemon } from "@/service/pokemon";

interface CaughtPokemon extends Pokemon {
	nickname: string;
}

const MyPokemon = () => {
	const [list, setList] = useState<CaughtPokemon[]>([]);

	useEffect(() => {
		const stored = localStorage.getItem("my-pokemon");
		if (stored) {
			try {
				setList(JSON.parse(stored));
			} catch (e) {
				console.error(e);
			}
		}
	}, []);

	if (list.length === 0) {
		return (
			<div className="flex-1 flex flex-col items-center justify-center p-8 bg-background dark:bg-cyan-800 text-black dark:text-white gap-4">
				<div className="font-arcade text-2xl text-zinc-500">
					No Pokemon caught yet!
				</div>
				<button
					onClick={() => {
						window.location.hash = "#home";
					}}
					className="font-arcade text-lg uppercase px-4 py-2 border-2 border-black bg-yellow-400 hover:bg-yellow-500 text-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
				>
					Go Hunt
				</button>
			</div>
		);
	}

	return (
		<div className="flex-1 flex flex-col overflow-hidden p-4 gap-4 bg-background dark:bg-cyan-800">
			<div className="font-arcade text-sm uppercase font-bold text-center text-black dark:text-white mb-2">
				My Pokemon ({list.length})
			</div>
			<div className="flex-1 overflow-y-auto pr-1">
				<div className="grid grid-cols-2 gap-4">
					{list.map((item, index) => (
						<PokemonCard
							key={`${item.id}-${index}`}
							name={item.nickname}
							id={item.id}
							url={item.url}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default MyPokemon;

