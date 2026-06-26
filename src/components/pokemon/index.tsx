interface Props {
	name: string;
	url: string;
	id: number;
}

export const PokemonCard = ({ name, id }: Props) => {
	const handleClick = () => {
		window.location.hash = `#detail/${id}`;
	};

	return (
		<div
			className="cursor-pointer border-4 border-black bg-yellow-50 dark:bg-zinc-800 p-3 flex flex-col items-center justify-center gap-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[0px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl"
			onClick={handleClick}
		>
			<div className="w-full aspect-square flex items-center justify-center bg-white dark:bg-zinc-900 border-2 border-black rounded-lg p-2">
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`}
					alt={name}
					className="object-contain h-14 w-14"
					onError={(e) => {
						// Fallback if animated gif doesn't exist
						(e.target as HTMLImageElement).src =
							`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
					}}
				/>
			</div>
			{/* <div className="font-arcade text-[10px] text-gray-500 dark:text-gray-400 font-mono mt-1">
				#{String(id).padStart(3, "0")}
			</div> */}
			<div className="font-arcade text-xs uppercase tracking-wider text-black dark:text-white font-bold text-center capitalize">
				{name}
			</div>
		</div>
	);
};

export default PokemonCard;
