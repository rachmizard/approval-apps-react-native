import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { BaseUseQueryOptions } from "@/interfaces/base-react-query";
import { GeneralException } from "@/exceptions/GeneralException";

export function useBaseQuery<
	TResponse extends unknown = unknown,
	TError = GeneralException
>(
	options?: BaseUseQueryOptions<TResponse, TError>
): UseQueryResult<TResponse, TError> {
	return useQuery<TResponse, TError>({
		...options,
	});
}
