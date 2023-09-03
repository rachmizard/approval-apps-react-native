import { RequestAdapterService } from "../RequestAdapterService";

import { Environment } from "@/utils/environment";
import { SignInRequest, SignInResponse, SignOutResponse } from "./interface";
import { InvalidPasswordException } from "@/exceptions/auth/InvalidPasswordException";
import { GeneralException } from "@/exceptions/GeneralException";
import { BaseResponse } from "@/interfaces/base-response";
import { User } from "@/interfaces/user";

export class AuthService extends RequestAdapterService {
	constructor(baseURL = Environment.authApiUrl) {
		super(baseURL);
	}

	public async signIn(payload: SignInRequest): Promise<SignInResponse> {
		try {
			const { data } = await super.sendPostRequest<
				BaseResponse<SignInResponse>,
				SignInRequest
			>("/auth/signin", payload);

			return data?.data;
		} catch (error: any) {
			if (error.response) {
				switch (error.response.status) {
					case 400:
						throw new InvalidPasswordException("Invalid password");
					case 500:
						throw new GeneralException("Internal server error");
					default:
						throw new GeneralException(error.response.data.message);
				}
			}

			throw new GeneralException(error.message);
		}
	}

	public async signOut(): Promise<SignOutResponse> {
		try {
			const { data } = await super.sendPostRequest<
				BaseResponse<SignOutResponse>,
				undefined
			>("/auth/signout", undefined);

			return data.data;
		} catch (error: any) {
			if (error.response) {
				switch (error.response.status) {
					case 500:
						throw new GeneralException("Internal server error");
					default:
						throw new GeneralException(error.response.data.message);
				}
			}

			throw new GeneralException(error.message);
		}
	}

	public async me(token?: string): Promise<User> {
		try {
			const { data } = await super.sendPostRequest<
				BaseResponse<User>,
				null
			>("/auth/me", null, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return data.data;
		} catch (error: any) {
			if (error.response) {
				switch (error.response.status) {
					case 500:
						throw new GeneralException("Internal server error");
					default:
						throw new GeneralException(error.response.data.message);
				}
			}

			throw new GeneralException(error.message);
		}
	}
}
