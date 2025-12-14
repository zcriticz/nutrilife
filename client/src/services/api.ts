import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const getBaseURL = () => {
	if (__DEV__) {
		if (Platform.OS === "android") {
			return "http://10.0.2.2:3333";
		} else if (Platform.OS === "ios") {
			return "http://localhost:3333";
		}
	}
	return "http://192.168.0.8:3333";
};

export const api = axios.create({
	baseURL: getBaseURL(),
	headers: {
		"Content-Type": "application/json; charset=utf-8",
	},
	responseType: "json",
	responseEncoding: "utf8",
	timeout: 30000,
});

api.interceptors.request.use(
	async (config) => {
		const token = await AsyncStorage.getItem("@nutrilife:token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			await AsyncStorage.removeItem("@nutrilife:token");
			await AsyncStorage.removeItem("@nutrilife:user");
		}

		if (!error.response) {
			if (
				error.code === "ECONNREFUSED" ||
				error.message?.includes("Network Error")
			) {
				error.message =
					"Não foi possível conectar ao servidor. Verifique se o servidor está rodando.";
			} else if (error.code === "ETIMEDOUT") {
				error.message = "Tempo de conexão esgotado. Tente novamente.";
			}
		} else {
			const serverError = error.response?.data?.error;
			if (serverError) {
				error.message = serverError;
			}
		}

		return Promise.reject(error);
	}
);
