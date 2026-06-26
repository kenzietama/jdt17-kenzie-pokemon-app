import type { ResponseData } from "./type";
import API from "../api";

export const getDetail = async (id: number) => {
	try {
		const response = await API.get(`/pokemon/${id}`);
		return response.data as ResponseData;
	} catch (error) {
		console.error(error);
	}
};
