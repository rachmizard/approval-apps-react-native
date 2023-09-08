import React, { useCallback } from "react";
import { StyledSafeAreaView, StyledView } from "@/components/StyledView";
import {
	AlertIcon,
	Badge,
	BadgeIcon,
	BadgeText,
	Button,
	ButtonSpinner,
	ButtonText,
	Center,
	CheckIcon,
	ClockIcon,
	HStack,
	Spinner,
	Text,
	VStack,
} from "@gluestack-ui/themed";
import { router, useGlobalSearchParams } from "expo-router";
import { useQueryGetReimbursementApprovalDetail } from "@/hooks/react-query/reimbursement-approval/use-get-reimbursement-approval-detail";
import { formatDate } from "@/utils/date-utility";
import { toCapitalize, toDollar } from "@/utils/string-utility";
import { ReimbursementStatus } from "@/services/Reimbursement/interface";
import { useUpdateReimbursementApproval } from "@/hooks/react-query/reimbursement-approval/use-update-reimbursement-approval";

type Params = {
	id: string;
};

const ReimbursementDetailScreen = () => {
	const { id } = useGlobalSearchParams<Params>();

	const onRedirectBack = useCallback(() => {
		router.back();
	}, []);

	const {
		data: reimbursementApprovalDetail,
		isLoading: isReimbursementApprovalDetailLoading,
	} = useQueryGetReimbursementApprovalDetail(id);

	const {
		mutate: updateReimbursementApproval,
		isLoading: isLoadingUpdateReimbursementApproval,
	} = useUpdateReimbursementApproval({
		onSuccess: () => onRedirectBack(),
	});

	if (isReimbursementApprovalDetailLoading) {
		return (
			<StyledSafeAreaView>
				<StyledView flex={1}>
					<Center flex={1}>
						<Spinner size="large" />
					</Center>
				</StyledView>
			</StyledSafeAreaView>
		);
	}

	const {
		id: reimbursementId,
		claim_date,
		employee_name,
		category,
		description,
		amount,
	} = reimbursementApprovalDetail ?? {};

	const renderStatusBadgeState: Record<
		ReimbursementStatus,
		{
			size: "lg" | "md" | "sm";
			variant: "solid" | "outline";
			action: "error" | "warning" | "success" | "info" | "muted";
			text: string;
			icon?: React.ElementType;
		}
	> = {
		approved: {
			size: "lg",
			variant: "solid",
			action: "success",
			text: "Approved",
			icon: CheckIcon,
		},
		pending: {
			size: "lg",
			variant: "solid",
			action: "warning",
			text: "Pending",
			icon: ClockIcon,
		},
		rejected: {
			size: "lg",
			variant: "solid",
			action: "error",
			text: "Rejected",
			icon: AlertIcon,
		},
	};

	const statusBadgeState =
		renderStatusBadgeState[
			reimbursementApprovalDetail?.status ?? "pending"
		];

	const isShowApprovalButton =
		reimbursementApprovalDetail?.status === "pending";

	return (
		<StyledSafeAreaView>
			<StyledView
				sx={{
					paddingTop: 30,
					px: 20,
				}}
				gap={22}>
				<VStack>
					<Text>Reimbursement ID </Text>
					<Text bold sub>
						{reimbursementId}
					</Text>
				</VStack>
				<VStack>
					<Text>Claim Date </Text>
					<Text bold sub>
						{formatDate(claim_date ?? new Date().toISOString())}
					</Text>
				</VStack>
				<VStack>
					<Text>Employee Name </Text>
					<Text bold sub>
						{employee_name}
					</Text>
				</VStack>
				<VStack>
					<Text>Category </Text>
					<Text bold sub>
						{toCapitalize(category ?? "")}
					</Text>
				</VStack>
				<VStack>
					<Text>Description </Text>
					<Text sub>{description}</Text>
				</VStack>
				<VStack>
					<Text>Amount </Text>
					<Text sub>{toDollar(amount ?? 0)}</Text>
				</VStack>
				<VStack space="md">
					<Text>Status</Text>
					<HStack>
						<Badge
							size={statusBadgeState?.size}
							variant={statusBadgeState?.variant}
							action={statusBadgeState?.action}
							ml="$1">
							<BadgeText>{statusBadgeState?.text}</BadgeText>
							<BadgeIcon as={statusBadgeState?.icon} ml="$1" />
						</Badge>
					</HStack>
				</VStack>

				{isShowApprovalButton && (
					<VStack flex={1} space="md" justifyContent="flex-end">
						<Button
							isDisabled={isLoadingUpdateReimbursementApproval}
							onPress={() =>
								updateReimbursementApproval({
									id: reimbursementId ?? "",
									status: "approved",
								})
							}>
							{isLoadingUpdateReimbursementApproval && (
								<ButtonSpinner mr="$1" />
							)}
							<ButtonText>Approve</ButtonText>
						</Button>
						<Button
							isDisabled={isLoadingUpdateReimbursementApproval}
							onPress={() =>
								updateReimbursementApproval({
									id: reimbursementId ?? "",
									status: "rejected",
								})
							}
							variant="outline"
							action="negative">
							{isLoadingUpdateReimbursementApproval && (
								<ButtonSpinner mr="$1" />
							)}
							<ButtonText>Reject</ButtonText>
						</Button>
					</VStack>
				)}
			</StyledView>
		</StyledSafeAreaView>
	);
};

export default ReimbursementDetailScreen;
