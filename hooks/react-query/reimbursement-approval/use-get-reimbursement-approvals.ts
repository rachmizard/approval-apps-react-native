import { BaseRequestParams } from "@/interfaces/base-request";
import { ReimbursementService } from "@/services/Reimbursement";
import { useBaseQuery } from "../use-base-query";
import { useState } from "react";

const DEFAULT_LIMIT = 10;

const reimbursementService = new ReimbursementService();

export function useQueryGetReimbursementApprovals(params?: BaseRequestParams) {
	const [limit, setLimit] = useState(
		params?.limit || params?.l || DEFAULT_LIMIT
	);
	const [page, __] = useState(params?.page || params?.p || 1);

	const query = useBaseQuery({
		queryKey: ["reimbursement-approvals", { page, limit, ...params }],
		queryFn: () =>
			reimbursementService.getReimbursementApprovals({
				page,
				limit,
				...params,
			}),
		keepPreviousData: true,
		staleTime: 1000 * 60 * 5,
	});

	function setNextPage() {
		if (!query.data?.meta_data.nextPage) return;

		setLimit((prev) => prev + DEFAULT_LIMIT);
	}

	return {
		...query,
		hasNextPage: query.data?.meta_data.nextPage !== null,
		setNextPage,
	};
}
