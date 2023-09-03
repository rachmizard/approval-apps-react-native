import { AuthService } from "@/services/AuthService";
import {
	SignInRequest,
	SignInResponse,
} from "@/services/AuthService/interface";

import { InvalidPasswordException } from "@/exceptions/auth/InvalidPasswordException";
import { BaseMutationCallbackOptions } from "@/interfaces/base-react-query";
import { useBaseMutation } from "../use-base-mutation";

export function useMutationSignIn(
	options?: BaseMutationCallbackOptions<
		SignInRequest,
		SignInResponse,
		InvalidPasswordException
	>
) {
	const authService = new AuthService();

	return useBaseMutation<
		SignInRequest,
		SignInResponse,
		InvalidPasswordException
	>({
		mutationKey: ["auth", "sign-in"],
		mutationFn: (payload) => authService.signIn(payload),
		...options,
	});
}
