import { StyledSafeAreaView, StyledView } from "@/components/StyledView";
import { ReimbursementList } from "@/components/reimbursement/List";
import { useQueryGetReimbursementApprovals } from "@/hooks/react-query/reimbursement-approval/use-get-reimbursement-approvals";

export default function ReimbursementApprovalScreen() {
	const {
		data: reimbursementApprovals,
		isFetching: isFetchingReimbursementApprovals,
		isLoading: isLoadingReimbursementApprovals,
		refetch: refetchReimbursementApprovals,
		hasNextPage,
		setNextPage,
	} = useQueryGetReimbursementApprovals();

	return (
		<StyledSafeAreaView>
			<StyledView mx={20}>
				<StyledView marginTop={20}>
					<ReimbursementList
						data={reimbursementApprovals?.data ?? []}
						isRefreshing={
							isFetchingReimbursementApprovals ||
							isLoadingReimbursementApprovals
						}
						isFetching={isFetchingReimbursementApprovals}
						onRefresh={() => refetchReimbursementApprovals()}
						onEndReached={() => {
							if (hasNextPage) {
								setNextPage();
							}
						}}
					/>
				</StyledView>
			</StyledView>
		</StyledSafeAreaView>
	);
}
