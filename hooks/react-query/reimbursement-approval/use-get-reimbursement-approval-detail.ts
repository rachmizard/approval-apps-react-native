import { ReimbursementService } from "@/services/Reimbursement";
import { useBaseQuery } from "../use-base-query";

const service = new ReimbursementService();

export function useQueryGetReimbursementApprovalDetail(id: string) {
	return useBaseQuery({
		queryKey: [
			"reimbursement-approval-detail",
			{
				id,
			},
		],
		queryFn: () => service.getReimbursementApprovalDetail(id),
		enabled: !!id,
	});
}
