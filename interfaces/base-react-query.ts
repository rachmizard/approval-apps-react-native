import { GeneralException } from "@/exceptions/GeneralException";
import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

type PickedMutationOptions<
	TVariables = unknown,
	TResponse = unknown,
	TError = GeneralException
> = Pick<
	BaseMutationOptions<TVariables, TResponse, TError>,
	"onSuccess" | "onError" | "onMutate" | "onSettled"
>;

export interface BaseMutationOptions<
	TVariables = unknown,
	TResponse = unknown,
	TError = GeneralException
> extends UseMutationOptions<TResponse, TError, TVariables> {}

export interface BaseMutationCallbackOptions<
	TVariables = unknown,
	TResponse = unknown,
	TError = GeneralException
> extends PickedMutationOptions<TVariables, TResponse, TError> {}

export type BaseMutationFn<
	TVariables = unknown,
	TResponse = unknown,
	TError = Error
> = UseMutationOptions<TResponse, TVariables, TError>["mutationFn"];

export interface BaseUseQueryOptions<
	TResponse = unknown,
	TError = GeneralException
> extends UseQueryOptions<TResponse, TError> {}
