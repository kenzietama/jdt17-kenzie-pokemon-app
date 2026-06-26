import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Home from "@/containers/Home";
import Detail from "@/containers/Detail";
import MyPokemon from "@/containers/MyPokemon";
import Catch from "@/containers/Catch";
import Layout from "@/components/layout";
import "./App.css";

const App = () => {
	const [hash, setHash] = useState(window.location.hash || "#home");

	useEffect(() => {
		const handleHash = () => setHash(window.location.hash || "#home");
		window.addEventListener("hashchange", handleHash);
		return () => window.removeEventListener("hashchange", handleHash);
	}, []);

	const renderContent = () => {
		if (hash.startsWith("#detail/")) {
			const id = Number(hash.split("/")[1]);
			return <Detail id={id} />;
		}
		if (hash.startsWith("#catch/")) {
			const id = Number(hash.split("/")[1]);
			return <Catch id={id} />;
		}
		if (hash === "#mypokemon") {
			return <MyPokemon />;
		}
		return <Home />;
	};

	return <Layout>{renderContent()}</Layout>;
};

if (localStorage.getItem("theme") === "dark") {
	document.documentElement.classList.add("dark");
} else {
	document.documentElement.classList.remove("dark");
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
