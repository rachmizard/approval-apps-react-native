import { focusManager } from "@tanstack/react-query";
import { useEffect } from "react";
import type { AppStateStatus } from "react-native";
import { AppState, Platform } from "react-native";

export function useRefetchAppFocus() {
	function onAppStateChange(status: AppStateStatus) {
		if (Platform.OS !== "web") {
			focusManager.setFocused(status === "active");
		}
	}

	useEffect(() => {
		const subscription = AppState.addEventListener(
			"change",
			onAppStateChange
		);

		return () => subscription.remove();
	}, []);
}
