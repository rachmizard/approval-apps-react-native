import { useRootNavigation } from "expo-router";

export function useIsReadyToNavigate() {
	const rootNavigation = useRootNavigation();
	if (!rootNavigation?.isReady()) return false;

	return true;
}
