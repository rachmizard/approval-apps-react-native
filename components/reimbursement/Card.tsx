import React from "react";
import {
	Avatar,
	AvatarImage,
	Box,
	HStack,
	Text,
	VStack,
} from "@gluestack-ui/themed";

import { formatDate } from "@/utils/date-utility";
import { toCapitalize } from "@/utils/string-utility";

interface Props {
	avatar: string;
	category: string;
	employeeName: string;
	claimDate: string;
}

export function ReimbursementCard({
	avatar,
	category,
	claimDate,
	employeeName,
}: Props) {
	return (
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
			</HStack>
		</Box>
	);
}
