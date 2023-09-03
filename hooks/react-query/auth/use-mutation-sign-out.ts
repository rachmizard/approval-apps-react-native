import { useAuthContext } from "@/contexts/auth/auth-context";
import { BaseMutationCallbackOptions } from "@/interfaces/base-react-query";
import { AuthService } from "@/services/AuthService";
import { SignOutResponse } from "@/services/AuthService/interface";
import { useBaseMutation } from "../use-base-mutation";

export function useMutationSignOut(
	options: BaseMutationCallbackOptions<void, SignOutResponse>
) {
	const authService = new AuthService();
	const authContext = useAuthContext();

	return useBaseMutation<void, SignOutResponse>({
		mutationFn: () => authService.signOut(),
		mutationKey: ["auth", "sign-out"],
		onSuccess: () => authContext.setLogout(),
		...options,
	});
}
