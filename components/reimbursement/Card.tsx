import React from "react";
import {
	Avatar,
	AvatarImage,
	Badge,
	BadgeIcon,
	BadgeText,
	Box,
	CheckCircleIcon,
	ClockIcon,
	HStack,
	Text,
	VStack,
} from "@gluestack-ui/themed";

import { formatDate } from "@/utils/date-utility";
import { toCapitalize } from "@/utils/string-utility";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { ReimbursementStatus } from "@/services/Reimbursement/interface";

interface Props {
	avatar: string;
	category: string;
	employeeName: string;
	claimDate: string;
	status: ReimbursementStatus;
	id: string;
}

export function ReimbursementCard({
	avatar,
	category,
	claimDate,
	employeeName,
	id,
	status,
}: Props) {
	const badgeStates = {
		approved: {
			color: "success",
			text: "Approved",
			icon: CheckCircleIcon,
		},
		pending: {
			color: "warning",
			text: "Pending",
			icon: ClockIcon,
		},
		rejected: {
			color: "error",
			text: "Rejected",
			icon: CheckCircleIcon,
		},
	}[status];

	return (
		<Link
			href={{
				pathname: "/reimbursement-detail",
				params: {
					id,
				},
			}}
			asChild>
			<Pressable>
				<Box
					borderColor="$gray200"
					sx={{
						_dark: {
							borderColor: "$trueGray100",
						},
						"@base": {
							pl: 0,
							pr: 0,
						},
						"@sm": {
							pl: "$4",
							pr: "$5",
						},
					}}
					py="$2">
					<HStack space="md" justifyContent="space-between">
						<Avatar size="md">
							<AvatarImage source={{ uri: avatar }} />
						</Avatar>
						<VStack flex={1}>
							<Text
								color="$coolGray800"
								fontWeight="$bold"
								sx={{
									_dark: {
										color: "$warmGray100",
									},
								}}>
								{employeeName}
							</Text>
							<Text
								color="$coolGray600"
								sx={{
									_dark: {
										color: "$warmGray200",
									},
								}}>
								{toCapitalize(category)}
							</Text>
						</VStack>
						<VStack alignItems="flex-end">
							<Text
								fontSize="$xs"
								color="$coolGray800"
								alignSelf="flex-start"
								sx={{
									_dark: {
										color: "$warmGray100",
									},
								}}>
								{formatDate(claimDate)}
							</Text>

							<Badge
								size="sm"
								variant="solid"
								action={badgeStates.color as any}>
								<BadgeText>{badgeStates.text}</BadgeText>
								<BadgeIcon
									as={badgeStates.icon as any}
									ml="$1"
								/>
							</Badge>
						</VStack>
					</HStack>
				</Box>
			</Pressable>
		</Link>
	);
}
