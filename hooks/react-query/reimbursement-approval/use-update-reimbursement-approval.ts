import { useQueryClient } from "@tanstack/react-query";
import { ReimbursementService } from "@/services/Reimbursement";
import { useBaseMutation } from "../use-base-mutation";
import {
	ReimbursementApproval,
	ReimbursementUpdateRequestPayload,
} from "@/services/Reimbursement/interface";
import { GeneralException } from "@/exceptions/GeneralException";
import { BaseMutationCallbackOptions } from "@/interfaces/base-react-query";

const reimbursementService = new ReimbursementService();

export function useUpdateReimbursementApproval(
	config?: BaseMutationCallbackOptions<
		ReimbursementUpdateRequestPayload,
		ReimbursementApproval | undefined
	>
) {
	const queryClient = useQueryClient();

	return useBaseMutation<
		ReimbursementUpdateRequestPayload,
		ReimbursementApproval | undefined,
		GeneralException
	>({
		...config,
		mutationFn: (payload) =>
			reimbursementService.updateReimbursementApproval(
				payload.id,
				payload
			),
		onSuccess: async (newUpdatedData, variables, context) => {
			await queryClient.invalidateQueries(["reimbursement-approvals"], {
				exact: false,
				predicate: (query) => {
					return query.queryKey.includes("reimbursement-approvals");
				},
			});

			queryClient.setQueryData<ReimbursementApproval | undefined>(
				["reimbursement-approvals"],
				(oldData) => {
					if (oldData) {
						return {
							...oldData,
							...newUpdatedData,
						};
					}

					return oldData;
				}
			);

			config?.onSuccess &&
				config.onSuccess(newUpdatedData, variables, context);
		},
	});
}
