import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, router } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Reimbursement Approval",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name={"money"} color={color} />
					),
					headerRight: () => (
						<Pressable
							onPress={() =>
								router.setParams({ showActionSheet: "true" })
							}>
							{({ pressed }) => (
								<FontAwesome
									name="filter"
									size={25}
									color={Colors[colorScheme ?? "light"].text}
									style={{
										marginRight: 15,
										opacity: pressed ? 0.5 : 1,
									}}
								/>
							)}
						</Pressable>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="user-circle" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
