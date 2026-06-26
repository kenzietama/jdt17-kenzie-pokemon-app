import { useEffect, useState } from "react";
import background from "@/assets/background.webp";
import pokeball from "@/assets/250px-Poké_Ball_icon.svg";
import { useDetail } from "@/hooks/detail/useDetail";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";

interface CatchProps {
	id: number;
}

const Catch = ({ id }: CatchProps) => {
	const { detail, loading } = useDetail(id);
	const [status, setStatus] = useState<
		"loading" | "attempting" | "caught" | "fled"
	>("loading");
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [nickname, setNickname] = useState<string>("");
	const [showPuff, setShowPuff] = useState<boolean>(false);

	useEffect(() => {
		if (!loading && detail) {
			setStatus("attempting");

			const timer = setTimeout(() => {
				const success = Math.random() < 0.6;
				if (success) {
					setStatus("caught");
					setNickname(detail.name);
					setDialogOpen(true);
				} else {
					setStatus("fled");
					setShowPuff(true);
				}
			}, 2500);

			return () => clearTimeout(timer);
		}
	}, [loading, detail]);

	const handleSave = () => {
		if (!detail) return;

		const stored = localStorage.getItem("my-pokemon");
		let currentList = [];
		if (stored) {
			try {
				currentList = JSON.parse(stored);
			} catch (e) {
				console.error(e);
			}
		}

		const newPokemon = {
			id,
			name: detail.name,
			nickname: nickname.trim() || detail.name,
			url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
		};

		localStorage.setItem(
			"my-pokemon",
			JSON.stringify([...currentList, newPokemon]),
		);
		setDialogOpen(false);
		window.location.hash = "#mypokemon";
	};

	if (loading || status === "loading") {
		return (
			<div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
				<img
					src={background}
					alt="Catch Background"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="relative z-10 font-arcade text-xs text-white animate-pulse">
					Finding wild Pokemon...
				</div>
			</div>
		);
	}

	return (
		<div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
			<img
				src={background}
				alt="Catch Background"
				className="absolute inset-0 w-full h-full object-cover"
			/>

			{status !== "fled" && status !== "caught" && (
				<div className="absolute bottom-[22.5%] z-10 w-36 h-36 flex items-center justify-center animate-bounce">
					<img
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`}
						alt={detail?.name}
						className="object-contain w-32 h-32"
						onError={(e) => {
							// Fallback if animated gif doesn't exist
							(e.target as HTMLImageElement).src =
								`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
						}}
					/>
				</div>
			)}

			{showPuff && (
				<div className="absolute bottom-[30%] z-20 w-32 h-32 flex items-center justify-center animate-puff pointer-events-none">
					<svg
						viewBox="0 0 100 100"
						className="w-full h-full fill-zinc-200/80 dark:fill-zinc-400/80 stroke-zinc-400 dark:stroke-zinc-600 stroke-[3px]"
					>
						<circle cx="50" cy="50" r="20" />
						<circle cx="35" cy="45" r="15" />
						<circle cx="65" cy="45" r="15" />
						<circle cx="42" cy="60" r="14" />
						<circle cx="58" cy="60" r="14" />
					</svg>
				</div>
			)}

			{/* LOADING */}
			{status === "attempting" && (
				<div className="absolute bottom-[10%] z-20 flex flex-col items-center gap-2">
					<img
						src={pokeball}
						className="w-14 h-14 animate-spin"
						alt="catching"
					/>
					<div className="font-arcade text-[10px] text-white uppercase tracking-wider bg-black/60 px-3 py-1 rounded border border-white">
						Throwing ball...
					</div>
				</div>
			)}

			{/* KABUR */}
			{status === "fled" && (
				<div className="absolute z-10 flex flex-col items-center gap-4 bg-black/75 p-6 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-[85%] max-w-[320px]">
					<div className="font-arcade text-xl text-red-500 uppercase tracking-wider text-center">
						Oh no! Wild {detail?.name} fled!
					</div>
					<button
						onClick={() => {
							window.location.hash = "#home";
						}}
						className="font-arcade text-lg uppercase px-4 py-2 border-2 border-black bg-yellow-400 hover:bg-yellow-500 text-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
					>
						Back to Hunt
					</button>
				</div>
			)}

			{/* TANGKAP */}
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent
					className="border-4 border-black bg-yellow-50 dark:bg-zinc-800 p-6 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-[90%] max-w-[340px] font-arcade text-black dark:text-white animate-in zoom-in-95 duration-200"
					showCloseButton={false}
				>
					<DialogHeader>
						<DialogTitle className="text-center text-xl font-arcade uppercase font-bold tracking-wider text-green-600">
							THERE YOU ARE
						</DialogTitle>
						<DialogDescription className="text-center font-arcade text-sm text-zinc-500 dark:text-zinc-400 mt-1 uppercase">
							{detail?.name} was caught!
						</DialogDescription>
					</DialogHeader>

					<div className="flex flex-col gap-2 my-2">
						<label className="text-sm uppercase font-bold tracking-wider text-zinc-600 dark:text-zinc-300">
							Give a nickname:
						</label>
						<input
							type="text"
							value={nickname}
							onChange={(e) => setNickname(e.target.value)}
							placeholder={detail?.name}
							className="w-full border-4 border-black bg-white dark:bg-zinc-900 text-black dark:text-white px-3 py-2 rounded font-arcade text-sm outline-none focus:border-yellow-400"
							maxLength={15}
						/>
					</div>

					<DialogFooter className="mt-4 flex flex-row gap-2 justify-center">
						<button
							onClick={handleSave}
							className="flex-1 font-arcade text-sm uppercase px-4 py-2 border-4 border-black bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
						>
							Save
						</button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Catch;
