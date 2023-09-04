import { BaseListResponse } from "@/interfaces/base-response";

export function generateMetaData<T extends unknown>(
	response: BaseListResponse<T>,
	currentPage = 1,
	limit = 10
) {
	function determineNextPage(currentPage: number, maxPage: number) {
		if (currentPage >= maxPage) return null;
		return currentPage + 1;
	}

	return {
		totalItems: response.count,
		itemsPerPage: limit,
		lastPage: Math.ceil(response.count / limit),
		nextPage: determineNextPage(
			currentPage,
			Math.ceil(response.count / limit)
		),
	};
}
