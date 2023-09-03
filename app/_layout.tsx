import { AuthProvider } from "@/contexts/auth/auth-provider";
import { extendedConfig } from "@/utils/gluestack.config";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

export { ErrorBoundary } from "expo-router";

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();

	return (
		<GluestackUIProvider
			colorMode={colorScheme === "dark" ? "dark" : "light"}
			config={extendedConfig}>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<Slot />
				</AuthProvider>
			</QueryClientProvider>
		</GluestackUIProvider>
	);
}
