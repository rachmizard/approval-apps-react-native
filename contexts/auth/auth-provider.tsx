import { SecureStore } from "@/utils/SecureStore";
import { router, useRootNavigation } from "expo-router";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import {
	AuthContextProps,
	AuthContextProvider,
	AuthContextProviderProps,
	useAuthContext,
} from "./auth-context";
import { User } from "@/interfaces/user";

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

	const value = useMemo<AuthContextProps>(
		() => ({
			isAuthenticated: state.isAuthenticated,
			setLogin: handleSetLogin,
			setLogout: handleSetLogout,
			token: state.token,
			user: state.user,
		}),
		[
			state.isAuthenticated,
			state.token,
			state.user,
			handleSetLogin,
			handleSetLogout,
		]
	);

	useEffect(() => {
		const bootstrapAsync = async () => {
			const token = await SecureStore.getItem<string>("token");
			const user = await SecureStore.getItem<any>("user");

			if (token && user) {
				dispatch({
					type: "LOGIN",
					params: {
						token,
						user,
					},
				});
			}
		};

		bootstrapAsync();
	}, [dispatch]);

	return <AuthContextProvider value={value}>{children}</AuthContextProvider>;
}

export const AuthGuard = ({ children }: AuthContextProviderProps) => {
	const rootNavigation = useRootNavigation();
	const authContext = useAuthContext();

	useEffect(() => {
		if (!rootNavigation?.isReady()) return;

		if (authContext.isAuthenticated) {
			router.replace("/(tabs)/");
			return;
		}

		router.replace("/(auth)/");
	}, [rootNavigation?.isReady(), authContext.isAuthenticated]);

	return children;
};
