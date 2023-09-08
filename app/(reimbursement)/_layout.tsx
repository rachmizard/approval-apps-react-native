import { Stack } from "expo-router";
import React from "react";

const ReimbursementRootLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="reimbursement-detail"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
};

export default ReimbursementRootLayout;
