import { Stack } from "expo-router";

export default () => (
	<Stack>
		<Stack.Screen
			name="index"
			options={{
				headerShown: false,
			}}
		/>
	</Stack>
);
