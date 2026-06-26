import pokeball from "@/assets/250px-Poké_Ball_icon.svg";
import { Swords } from "lucide-react";

const Footer = () => {
	return (
		<footer className="sticky bottom-0 z-40 w-full bg-amber-300 dark:bg-teal-950 shadow-xl px-4 py-3">
			<div className="grid grid-cols-2 gap-2">
				<a
					className="group flex flex-col items-center font-arcade text-l hover:text-gray-200 transition select-none"
					href="#home"
				>
					<div className="w-12 h-12 flex items-center justify-center">
						<Swords className="w-full h-full transition-transform duration-300 group-hover:scale-110" />
					</div>
					Hunt
				</a>
				<a
					className="group flex flex-col items-center font-arcade text-l hover:text-gray-200 transition select-none"
					href="#mypokemon"
				>
					<div className="w-12 h-12 flex items-center justify-center">
						<img
							src={pokeball}
							alt="Home"
							className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45"
						/>
					</div>
					Pokedex
				</a>
			</div>
		</footer>
	);
};

export default Footer;
