import { useRootNavigation } from "expo-router";
import { useEffect, useState } from "react";

export function useIsReadyToNavigate() {
	const rootNavigation = useRootNavigation();
	const [ready, setReady] = useState(false);

	useEffect(() => {
		if (rootNavigation?.isReady()) {
			setReady(true);
			return;
		}
	}, [rootNavigation, setReady]);

	return ready;
}
