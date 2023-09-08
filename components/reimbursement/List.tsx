import { ActivityIndicator, FlatList, RefreshControl } from "react-native";

import { ReimbursementCard } from "./Card";
import type { ReimbursementApproval } from "@/services/Reimbursement/interface";
import { FC } from "react";

interface Props {
	isRefreshing?: boolean;
	isFetching?: boolean;
	data: ReimbursementApproval[];
	onRefresh?: () => void;
	onEndReached?: () => void;
}

export const ReimbursementList: FC<Props> = ({
	data,
	isRefreshing = false,
	isFetching = false,
	onRefresh,
	onEndReached,
}) => {
	return (
		<FlatList<ReimbursementApproval>
			refreshControl={
				<RefreshControl
					refreshing={isRefreshing}
					onRefresh={onRefresh}
				/>
			}
			data={data}
			renderItem={({ item, index }) => (
				<ReimbursementCard
					key={index}
					category={item.category}
					claimDate={item.claim_date}
					employeeName={item.employee_name}
					avatar={item.employee_avatar}
					status={item.status}
					id={item.id}
				/>
			)}
			scrollEnabled={true}
			keyExtractor={(__, index) => index.toString()}
			onEndReached={onEndReached}
			ListFooterComponent={() => isFetching && <ActivityIndicator />}
		/>
	);
};
