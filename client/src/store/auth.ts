import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = {
	id: string;
	email: string;
	name?: string | null;
};

type AuthState = {
	token: string | null;
	user: User | null;
	isAuthenticated: boolean;
	login: (token: string, user: User) => Promise<void>;
	logout: () => Promise<void>;
	loadToken: () => Promise<void>;
	setUser: (user: User) => void;
};

const TOKEN_KEY = "@nutrilife:token";
const USER_KEY = "@nutrilife:user";

export const useAuthStore = create<AuthState>((set) => ({
	token: null,
	user: null,
	isAuthenticated: false,

	login: async (token: string, user: User) => {
		await AsyncStorage.setItem(TOKEN_KEY, token);
		await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
		set({ token, user, isAuthenticated: true });
	},

	logout: async () => {
		await AsyncStorage.removeItem(TOKEN_KEY);
		await AsyncStorage.removeItem(USER_KEY);
		set({ token: null, user: null, isAuthenticated: false });
	},

	loadToken: async () => {
		const token = await AsyncStorage.getItem(TOKEN_KEY);
		const userStr = await AsyncStorage.getItem(USER_KEY);

		if (token && userStr) {
			const user = JSON.parse(userStr);
			set({ token, user, isAuthenticated: true });
		}
	},

	setUser: (user: User) => {
		set({ user });
	},
}));
