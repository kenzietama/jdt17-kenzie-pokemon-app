import axios from "axios";

const API = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL || "https://pokeapi.co/api/v2",
});

export default API;
