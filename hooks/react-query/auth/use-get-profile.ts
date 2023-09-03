import { GeneralException } from "@/exceptions/GeneralException";
import { UnauthorizedException } from "@/exceptions/auth/UnauthorizedException";
import { AuthService } from "@/services/AuthService";
import { useBaseQuery } from "../use-base-query";
import { BaseUseQueryOptions } from "@/interfaces/base-react-query";
import { User } from "@/interfaces/user";

export function useQueryGetProfile(
	token?: string,
	options?: BaseUseQueryOptions<
		User,
		UnauthorizedException | GeneralException
	>
) {
	const authService = new AuthService();
	return useBaseQuery<User, UnauthorizedException | GeneralException>({
		queryKey: ["auth", "profile"],
		queryFn: () => authService.me(token),
		...options,
	});
}
