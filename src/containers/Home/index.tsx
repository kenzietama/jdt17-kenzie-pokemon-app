import { usePokemonStore } from "@/store/usePokemonStore";
import { usePokemon } from "@/hooks/pokemon/usePokemon";
import { PokemonCard } from "@/components/pokemon";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

const Home = () => {
	const { currentUrl, setCurrentUrl } = usePokemonStore();
	const { pokemon, loading, nextUrl, previousUrl } = usePokemon(currentUrl);

	if (loading) {
		return (
			<div className="flex-1 flex flex-col items-center justify-center p-8 bg-background dark:bg-cyan-800">
				<div className="font-arcade text-xs animate-pulse text-zinc-600 dark:text-zinc-400">
					Loading Pokemon...
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 flex flex-col overflow-hidden p-4 gap-4 bg-background dark:bg-cyan-800">
			<div className="flex-1 overflow-y-auto pr-1">
				<div className="grid grid-cols-2 gap-4">
					{pokemon.map((item) => (
						<PokemonCard
							key={item.id}
							name={item.name}
							url={item.url}
							id={item.id}
						/>
					))}
				</div>
			</div>
			<Pagination className="mt-auto py-2">
				<PaginationContent>
					{previousUrl && (
						<PaginationItem>
							<PaginationPrevious
								onClick={(e) => {
									e.preventDefault();
									setCurrentUrl(previousUrl);
								}}
								className="cursor-pointer font-arcade text-[10px] uppercase border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-white dark:bg-zinc-800 text-black dark:text-white"
							/>
						</PaginationItem>
					)}
					{nextUrl && (
						<PaginationItem>
							<PaginationNext
								onClick={(e) => {
									e.preventDefault();
									setCurrentUrl(nextUrl);
								}}
								className="cursor-pointer font-arcade text-[10px] uppercase border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-white dark:bg-zinc-800 text-black dark:text-white"
							/>
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		</div>
	);
};

export default Home;
