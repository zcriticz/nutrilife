import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "@/routes/stackRoutes";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { styles } from "./styles";

interface NutritionPlan {
	id: string;
	data: any;
	createdAt: string;
	updatedAt: string;
}

interface ResponseData {
	plans: NutritionPlan[];
}

export default function NutritionList() {
	const navigation = useNavigation<StackTypes>();
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	const { data, isFetching, error, refetch } = useQuery<ResponseData>({
		queryKey: ["nutrition-plans"],
		queryFn: async () => {
			try {
				if (!isAuthenticated) {
					throw new Error("Usuário não autenticado");
				}

				const response = await api.get<ResponseData>("/nutrition/list");

				if (!response.data || !response.data.plans) {
					throw new Error("Resposta inválida do servidor");
				}

				return response.data;
			} catch (e: any) {
				console.error("Erro ao buscar planos nutricionais:", e);

				if (
					e.response?.status === 401 ||
					e.message === "Usuário não autenticado"
				) {
					Alert.alert("Sessão expirada", "Por favor, faça login novamente.", [
						{
							text: "OK",
							onPress: () => navigation.navigate("Login"),
						},
					]);
				}

				const errorMessage =
					e.response?.data?.error ||
					e.message ||
					"Erro ao carregar planos nutricionais. Tente novamente.";

				const serverError = new Error(errorMessage);
				(serverError as any).response = e.response;

				throw serverError;
			}
		},
		enabled: isAuthenticated,
	});

	React.useEffect(() => {
		if (!isAuthenticated) {
			Alert.alert(
				"Autenticação necessária",
				"Você precisa estar logado para ver seus planos nutricionais.",
				[
					{
						text: "Fazer Login",
						onPress: () => navigation.navigate("Login"),
					},
				]
			);
		}
	}, [isAuthenticated, navigation]);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	const handleViewPlan = (planId: string) => {
		navigation.navigate("Nutrition", { planId });
	};

	const handleCreateNew = () => {
		navigation.navigate("Submit");
	};

	if (isFetching) {
		return (
			<View style={styles.loading}>
				<Text style={styles.loadingText}>Carregando seus planos...</Text>
			</View>
		);
	}

	if (error) {
		const errorMessage =
			error instanceof Error
				? error.message
				: "Erro desconhecido ao carregar planos";

		return (
			<View style={styles.loading}>
				<Text style={styles.loadingText}>Falha ao carregar planos</Text>
				<Text
					style={[
						styles.loadingText,
						{ marginTop: 10, fontSize: 14, color: "#ff6b6b" },
					]}
				>
					{errorMessage}
				</Text>
				<TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
					<Text style={styles.retryButtonText}>Tentar novamente</Text>
				</TouchableOpacity>
			</View>
		);
	}

	const plans = data?.plans || [];

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Meus Planos Nutricionais</Text>
				<Text style={styles.subtitle}>
					{plans.length === 0
						? "Você ainda não possui planos nutricionais"
						: `${plans.length} plano${plans.length > 1 ? "s" : ""} encontrado${
								plans.length > 1 ? "s" : ""
						  }`}
				</Text>
			</View>

			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{plans.length === 0 ? (
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>
							Você ainda não criou nenhum plano nutricional.
						</Text>
						<Text style={styles.emptySubtext}>
							Crie seu primeiro plano personalizado agora!
						</Text>
						<TouchableOpacity
							style={styles.createButton}
							onPress={handleCreateNew}
						>
							<Text style={styles.createButtonText}>Criar Novo Plano</Text>
						</TouchableOpacity>
					</View>
				) : (
					<>
						<TouchableOpacity
							style={styles.createButton}
							onPress={handleCreateNew}
						>
							<Text style={styles.createButtonText}>+ Criar Novo Plano</Text>
						</TouchableOpacity>

						{plans.map((plan) => (
							<TouchableOpacity
								key={plan.id}
								style={styles.planCard}
								onPress={() => handleViewPlan(plan.id)}
							>
								<View style={styles.planHeader}>
									<Text style={styles.planName}>
										{plan.data?.nome || "Plano Nutricional"}
									</Text>
									<Text style={styles.planDate}>
										{formatDate(plan.createdAt)}
									</Text>
								</View>
								{plan.data?.objetivo && (
									<Text style={styles.planObjective}>
										Objetivo: {plan.data.objetivo}
									</Text>
								)}
								{plan.data?.caloriasDiarias && (
									<Text style={styles.planCalories}>
										{plan.data.caloriasDiarias} calorias/dia
									</Text>
								)}
								<View style={styles.planFooter}>
									<Text style={styles.viewText}>Ver detalhes →</Text>
								</View>
							</TouchableOpacity>
						))}
					</>
				)}
			</ScrollView>
		</View>
	);
}
