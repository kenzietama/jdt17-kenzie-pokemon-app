import { Toggle } from "@/components/ui/toggle";
import { Sun, Moon } from "lucide-react";
import logo from "@/assets/pokemon-23.svg";

const Header = () => {
	const isInitialDark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");

	return (
		<header className="sticky top-0 z-50 w-full bg-amber-300 dark:bg-teal-950 shadow-md flex items-center justify-between px-6 py-2">
			<img src={logo} alt="Pokemon Logo" width={200} height="full" />
			<Toggle
				aria-label="Toggle theme"
				size="sm"
				variant="outline"
				className="border-transparent hover:bg-transparent hover:text-current aria-pressed:bg-transparent aria-pressed:text-current shadow-none"
				defaultPressed={isInitialDark}
				onPressedChange={(pressed) => {
					document.documentElement.classList.toggle("dark", pressed);
					localStorage.setItem("theme", pressed ? "dark" : "light");
				}}
			>
				<Sun className="group-data-[state=on]/toggle:hidden size-12 group-hover/toggle:fill-black group-hover/toggle:rotate-90 transition-all" />
				<Moon className="group-data-[state=off]/toggle:hidden size-12 group-hover/toggle:fill-white group-hover/toggle:rotate-90 transition-all" />
			</Toggle>
		</header>
	);
};

export default Header;
