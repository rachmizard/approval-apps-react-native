export interface BaseResponse<T> {
	data: T;
	errors: any[];
	message: string;
	status_code: number;
}
