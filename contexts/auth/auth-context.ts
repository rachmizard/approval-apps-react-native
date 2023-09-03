import { User } from "@/interfaces/user";
import { createContext, useContext } from "react";

export interface AuthContextProps {
	user: User | null;
	setLogin: (user: any, token: string) => void;
	setLogout: () => void;
	isAuthenticated: boolean;
	token: string | null;
}

export interface AuthContextProviderProps {
	children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
export const AuthContextProvider = AuthContext.Provider;
export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error(
			"useAuthContext must be used within an AuthContextProvider"
		);
	}

	return context;
};
