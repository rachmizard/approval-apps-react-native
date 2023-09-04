import { BaseRequestParams } from "@/interfaces/base-request";
import { ReimbursementService } from "@/services/Reimbursement";
import { useBaseQuery } from "../use-base-query";
import { useState } from "react";

const DEFAULT_LIMIT = 10;

const reimbursementService = new ReimbursementService();

function removeEmpty<T extends object>(obj: T) {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, v]) => v != null && v !== "")
	);
}

export function useQueryGetReimbursementApprovals(
	defaultParams?: BaseRequestParams
) {
	const [limit, setLimit] = useState(
		defaultParams?.limit || defaultParams?.l || DEFAULT_LIMIT
	);
	const [page, __] = useState(defaultParams?.page || defaultParams?.p || 1);

	const [reimbursementParams, setReimbursementParams] = useState({});

	function setParams(params: BaseRequestParams) {
		setReimbursementParams((prev) => ({ ...prev, ...params }));
	}

	const query = useBaseQuery({
		queryKey: [
			"reimbursement-approvals",
			{ page, limit, ...defaultParams, ...reimbursementParams },
		],
		queryFn: () =>
			reimbursementService.getReimbursementApprovals(
				removeEmpty({
					page,
					limit,
					...defaultParams,
					...reimbursementParams,
				})
			),
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
		params: reimbursementParams,
		setParams,
	};
}
