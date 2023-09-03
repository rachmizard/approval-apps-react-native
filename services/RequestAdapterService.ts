import { SecureStore } from "@/utils/SecureStore";
import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";
export class RequestAdapterService {
	private adapter: AxiosInstance;

	constructor(baseURL?: string) {
		this.adapter = axios.create({
			baseURL: baseURL,
		});

		this.adapter.interceptors.request.use(this.handleRequestInterceptor);
		this.adapter.interceptors.response.use(this.handleResponseInterceptor);
	}

	private async handleRequestInterceptor(
		config: InternalAxiosRequestConfig
	): Promise<InternalAxiosRequestConfig<any>> {
		const token = await SecureStore.getItem<string>("token");

		if (!!token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	}

	private handleResponseInterceptor(response: AxiosResponse): AxiosResponse {
		return response;
	}

	public sendGetRequest<T extends unknown>(
		url: string,
		options?: AxiosRequestConfig<T>
	) {
		return this.adapter.get<T, AxiosResponse<T>>(url, options);
	}

	public async sendPostRequest<T extends unknown, P extends unknown>(
		url: string,
		payload: P,
		options?: AxiosRequestConfig<T>
	) {
		return this.adapter.post<T, AxiosResponse<T>>(url, payload, options);
	}
}
