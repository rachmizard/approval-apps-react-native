export interface BaseRequestParams {
	l?: number;
	limit?: number;
	p?: number;
	page?: number;
	search?: string;
	filter?: string;
	field_name?: string;
	sortBy?: string;
	orderBy?: string;
	order?: "asc" | "desc";
	[key: string]: any;
}
