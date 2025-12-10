import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import StackComponent from "./stackRoutes";
import { useAuthStore } from "@/store/auth";

export default function MainRoutes() {
	const queryClient = new QueryClient();
	const loadToken = useAuthStore((state) => state.loadToken);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function initializeAuth() {
			try {
				await loadToken();
			} catch (error) {
				console.error("Erro ao carregar token:", error);
			} finally {
				setIsLoading(false);
			}
		}

		initializeAuth();
	}, [loadToken]);

	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#fff",
				}}
			>
				<ActivityIndicator size="large" color="#048C4C" />
				<Text style={{ marginTop: 10, color: "#666" }}>Carregando...</Text>
			</View>
		);
	}

	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				<StackComponent />
			</NavigationContainer>
		</QueryClientProvider>
	);
}
