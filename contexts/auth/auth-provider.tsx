import { useIsReadyToNavigate } from "@/hooks/use-is-ready-to-navigate";
import { User } from "@/interfaces/user";
import { SecureStore } from "@/utils/SecureStore";
import { useRouter, useSegments } from "expo-router";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { AuthContextProvider, AuthContextProviderProps } from "./auth-context";

type AuthAction = {
	type: "LOGIN" | "LOGOUT";
	params?: Partial<AuthState>;
};

type AuthState = {
	user: any | null;
	isAuthenticated: boolean;
	token: string | null;
};

const INITIAL_STATE = {
	user: null,
	isAuthenticated: false,
	token: null,
};

const authReducer = (state: AuthState, action: AuthAction) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				...action.params,
				isAuthenticated: true,
			};
		case "LOGOUT":
			return {
				...state,
				user: null,
				token: null,
				isAuthenticated: false,
			};
		default:
			return state;
	}
};

export function AuthProvider({ children }: AuthContextProviderProps) {
	const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

	const handleSetLogin = useCallback(
		async (user: User | null, token: string) => {
			await SecureStore.setItem("token", token);
			await SecureStore.setItem("user", JSON.stringify(user));

			dispatch({ type: "LOGIN", params: { user, token } });
		},
		[dispatch]
	);

	const handleSetLogout = useCallback(async () => {
		await SecureStore.deleteItem("token");
		await SecureStore.deleteItem("user");

		dispatch({ type: "LOGOUT" });
	}, [dispatch]);

	useEffect(() => {
		const bootstrapAsync = async () => {
			const token = await SecureStore.getItem<string>("token");
			const user = await SecureStore.getItem<any>("user");

			if (token && user) {
				dispatch({
					type: "LOGIN",
					params: {
						token: token,
						user: JSON.parse(user),
					},
				});
			}
		};

		bootstrapAsync();
	}, [dispatch]);

	const value = useMemo(
		() => ({
			isAuthenticated: state.isAuthenticated,
			setLogin: handleSetLogin,
			setLogout: handleSetLogout,
			token: state.token,
			user: state.user,
		}),
		[
			state.isAuthenticated,
			handleSetLogin,
			handleSetLogout,
			state.token,
			state.user,
		]
	);

	useProtectedRoute(state.user);

	return <AuthContextProvider value={value}>{children}</AuthContextProvider>;
}

export const useProtectedRoute = (user: User) => {
	const segments = useSegments();
	const router = useRouter();
	const isReady = useIsReadyToNavigate();

	useEffect(() => {
		if (!isReady) return;

		const execute = setTimeout(() => {
			const inAuthGroup = segments[0] === "(auth)";
			if (!user && !inAuthGroup) {
				router.replace("/signin");
			} else if (user && inAuthGroup) {
				router.replace("/");
			} else if (user && inAuthGroup) {
				router.replace("/");
			}
		}, 0);

		return () => {
			clearTimeout(execute);
		};
	}, [user, router, isReady]);
};
