export interface SignInRequest {
	username: string;
	password: string;
	device_name: string;
}

export interface SignInResponse {
	token: string;
}

export type SignOutResponse = null;
