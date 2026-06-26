import { useEffect, useState } from "react";
import { getDetail, type ResponseData } from "@/service/detail";

export const useDetail = (id: number) => {
	const [detail, setDetail] = useState<ResponseData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchDetail = async () => {
			setLoading(true);
			try {
				const response = await getDetail(id);
				if (response) {
					setDetail(response);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchDetail();
		}
	}, [id]);

	return { detail, loading };
};
