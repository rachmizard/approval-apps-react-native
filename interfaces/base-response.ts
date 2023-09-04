export interface BaseResponse<T> {
	data: T;
	errors: any[];
	message: string;
	status_code: number;
}

export interface BaseListResponse<T> {
	requestId: string;
	data: T[];
	count: number;
	meta_data: {
		totalItems: number;
		itemsPerPage: number;
		lastPage: number;
		nextPage: number | null;
	};
}
