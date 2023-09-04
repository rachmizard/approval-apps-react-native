import { StyledSafeAreaView, StyledView } from "@/components/StyledView";
import { ReimbursementFilterActionSheet } from "@/components/reimbursement/FilterActionSheet";
import { ReimbursementList } from "@/components/reimbursement/List";
import { useQueryGetReimbursementApprovals } from "@/hooks/react-query/reimbursement-approval/use-get-reimbursement-approvals";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function ReimbursementApprovalScreen() {
	const {
		data: reimbursementApprovals,
		isFetching: isFetchingReimbursementApprovals,
		isLoading: isLoadingReimbursementApprovals,
		refetch: refetchReimbursementApprovals,
		hasNextPage,
		setNextPage,
		setParams,
	} = useQueryGetReimbursementApprovals();

	const searchParams = useLocalSearchParams<{
		showActionSheet: string;
	}>();

	const [showActionsheet, setShowActionsheet] = useState(false);

	function handleCloseActionSheet() {
		setShowActionsheet(false);
		router.setParams({
			showActionSheet: "false",
		});
	}

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

			<ReimbursementFilterActionSheet
				showActionsheet={
					searchParams.showActionSheet === "true" || showActionsheet
				}
				handleClose={handleCloseActionSheet}
				onSubmit={(values) => {
					setParams(values);
				}}
			/>
		</StyledSafeAreaView>
	);
}
