import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useDetail } from "@/hooks/detail/useDetail";
import {
	Sparkles,
	Scale,
	RulerDimensionLine,
	Cross,
	Sword,
	Shield,
	Zap,
	ShieldPlus,
	SportShoe,
} from "lucide-react";

interface DetailProps {
	id: number;
}

const statIcons: Record<string, any> = {
	hp: Cross,
	attack: Sword,
	defense: Shield,
	"special-attack": Zap,
	"special-defense": ShieldPlus,
	speed: SportShoe,
};

const Detail = ({ id }: DetailProps) => {
	const { detail, loading } = useDetail(id);

	if (loading) {
		return (
			<div className="flex-1 flex flex-col items-center justify-center p-8 bg-background dark:bg-cyan-800">
				<div className="font-arcade text-xs animate-pulse text-zinc-600 dark:text-zinc-400">
					Loading Pokemon Details...
				</div>
			</div>
		);
	}

	if (!detail) {
		return (
			<div className="flex-1 flex flex-col items-center justify-center p-8 bg-background dark:bg-cyan-800">
				<div className="font-arcade text-xs text-red-500">
					Detail not found.
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 flex flex-col overflow-hidden p-4 bg-background h-full dark:bg-cyan-800 text-black dark:text-white gap-2 w-full">
			<div className="flex-1 overflow-y-auto w-full pr-1">
				<div className="flex flex-col items-center gap-2">
					<div className="w-50 h-50 flex items-center justify-center bg-white dark:bg-zinc-900 border-4 border-black rounded-xl p-4">
						<img
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`}
							alt={detail.name}
							className="object-contain h-32 w-32"
							onError={(e) => {
								// Fallback if animated gif doesn't exist
								(e.target as HTMLImageElement).src =
									`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
							}}
						/>
					</div>
					<div className="font-arcade text-xl uppercase tracking-wider font-bold capitalize">
						{detail.name}
					</div>
					<div className="flex flex-row gap-4 mb-2">
						{detail.types.map((item) => (
							<Badge
								className="text-lg"
								type={item.type.name}
								key={item.type.name}
							>
								{item.type.name}
							</Badge>
						))}
					</div>
					<Separator />
					<div className="font-arcade text-sm uppercase tracking-wider font-bold capitalize w-full">
						<div className="flex flex-row justify-around gap-8">
							<div className="flex flex-row gap-2">
								<Sparkles />
								<div>{detail.base_experience}xp</div>
							</div>
							<div className="flex flex-row gap-2">
								<RulerDimensionLine className="rotate-90" />
								<div>{(detail.height * 10) / 100}m</div>
							</div>
							<div className="flex flex-row gap-2">
								<Scale />
								<div>{detail.weight * 0.1}kg</div>
							</div>
						</div>
					</div>
					<Separator />
					<div className="flex flex-col gap-2 mb-2 w-full">
						{detail.stats.map((item) => {
							const StatIcon = statIcons[item.stat.name] || Cross;
							return (
								<div
									key={item.stat.name}
									className="flex flex-row gap-4 items-center"
								>
									<StatIcon />
									<div className="flex flex-col flex-1">
										<div className="text-xl capitalize">
											{item.stat.name == "hp"
												? item.stat.name.toUpperCase()
												: item.stat.name.includes("-")
													? item.stat.name.replaceAll(
															"-",
															" ",
														)
													: item.stat.name}
										</div>
										<Progress
											value={item.base_stat}
											className="w-full h-2"
										/>
									</div>
								</div>
							);
						})}
					</div>
					<Separator />
					<div className="flex flex-row gap-2 font-arcade text-xs capitalize mt-2">
						{detail.abilities.map((item) => (
							<Badge key={item.ability.name} className="border-2 border-black bg-white dark:bg-zinc-800 text-black dark:text-white px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] text-xs">
								{item.ability.name}
							</Badge>
						))}
					</div>
				</div>
			</div>
			<button
				onClick={() => {
					window.location.hash = `#catch/${id}`;
				}}
				className="font-arcade text-lg uppercase px-6 py-3 mt-2 border-4 border-black bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[0px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer w-full"
			>
				Catch
			</button>
		</div>
	);
};

export default Detail;
