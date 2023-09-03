import { useMutation } from "@tanstack/react-query";

import { BaseMutationOptions } from "@/interfaces/base-react-query";
import { GeneralException } from "@/exceptions/GeneralException";

export function useBaseMutation<
	TVariables = unknown,
	TResponse = unknown,
	TError = GeneralException
>(options: BaseMutationOptions<TVariables, TResponse, TError>) {
	return useMutation({
		...options,
	});
}
