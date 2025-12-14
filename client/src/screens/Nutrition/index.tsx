import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { styles } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackTypes } from "@/routes/stackRoutes";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Data } from "@/types/data";
import { useDataStore } from "@/store/data";
import { useAuthStore } from "@/store/auth";

interface ResponseData {
	data: Data;
}

interface PlanResponseData {
	plan: {
		id: string;
		data: Data;
		createdAt: string;
		updatedAt: string;
	};
}

export default function Nutrition() {
	const navigation = useNavigation<StackTypes>();
	const route = useRoute();
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const user = useDataStore((state) => state.user);

	// Pega o planId dos parâmetros da rota, se existir
	const planId = (route.params as { planId?: string })?.planId;

	useEffect(() => {
		if (!isAuthenticated) {
			Alert.alert(
				"Autenticação necessária",
				"Você precisa estar logado para criar um plano nutricional.",
				[
					{
						text: "Fazer Login",
						onPress: () => navigation.navigate("Login"),
					},
				]
			);
		}
	}, [isAuthenticated, navigation]);

	// Se planId existe, busca a receita existente; caso contrário, cria uma nova
	const { data, isFetching, error } = useQuery<ResponseData | PlanResponseData>(
		{
			queryKey: planId ? ["nutrition-plan", planId] : ["nutrition", user],
			queryFn: async () => {
				try {
					if (!isAuthenticated) {
						throw new Error("Usuário não autenticado");
					}

					// Se planId existe, busca a receita existente
					if (planId) {
						const response = await api.get<PlanResponseData>(
							`/nutrition/${planId}`
						);

						if (!response.data || !response.data.plan) {
							throw new Error("Resposta inválida do servidor");
						}

						// Retorna no formato esperado pela interface ResponseData
						return {
							data: response.data.plan.data,
						} as ResponseData;
					}

					// Caso contrário, cria uma nova receita
					if (!user || !user.name || !user.age || !user.weight) {
						throw new Error("Dados do usuário incompletos");
					}

					const response = await api.post<ResponseData>("/nutrition/create", {
						name: user.name,
						age: user.age,
						weight: user.weight,
						height: user.height,
						gender: user.gender,
						level: user.level,
						objective: user.objective,
					});

					if (!response.data || !response.data.data) {
						throw new Error("Resposta inválida do servidor");
					}

					return response.data;
				} catch (err: any) {
					console.error("Erro ao buscar dados da API:", err);

					if (
						err.response?.status === 401 ||
						err.message === "Usuário não autenticado"
					) {
						Alert.alert("Sessão expirada", "Por favor, faça login novamente.", [
							{
								text: "OK",
								onPress: () => navigation.navigate("Login"),
							},
						]);
					}

					if (err.response?.status === 404) {
						Alert.alert(
							"Plano não encontrado",
							"O plano nutricional solicitado não foi encontrado.",
							[
								{
									text: "Voltar",
									onPress: () => navigation.navigate("NutritionList"),
								},
							]
						);
					}

					const errorMessage =
						err.response?.data?.error || err.message || planId
							? "Erro ao carregar plano nutricional. Tente novamente."
							: "Erro ao criar plano nutricional. Tente novamente.";

					const serverError = new Error(errorMessage);
					(serverError as any).response = err.response;

					throw serverError;
				}
			},
			enabled: planId
				? isAuthenticated
				: isAuthenticated &&
				  !!user &&
				  !!user.name &&
				  !!user.age &&
				  !!user.weight,
		}
	);

	if (isFetching) {
		return (
			<View style={styles.loading}>
				<Text style={styles.loadingText}>
					{planId ? "Carregando sua dieta..." : "Gerando sua dieta..."}
				</Text>
			</View>
		);
	}

	if (error) {
		const errorMessage =
			error instanceof Error
				? error.message
				: "Erro desconhecido ao carregar dieta";

		return (
			<View style={styles.loading}>
				<Text style={styles.loadingText}>Falha ao carregar dieta</Text>
				<Text
					style={[
						styles.loadingText,
						{ marginTop: 10, fontSize: 14, color: "#ff6b6b" },
					]}
				>
					{errorMessage}
				</Text>
				<TouchableOpacity
					style={{
						marginTop: 20,
						padding: 10,
						backgroundColor: "#048c4c",
						borderRadius: 8,
					}}
					onPress={() => navigation.navigate("Submit")}
				>
					<Text style={[styles.loadingText, { color: "#fff" }]}>
						Tentar novamente
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	// Extrai os dados da receita, seja de uma receita existente ou nova
	// Ambos os casos retornam no formato ResponseData com a propriedade 'data'
	const nutritionData = (data as ResponseData)?.data;

	if (nutritionData) {
		console.log("Dados recebidos:", JSON.stringify(nutritionData, null, 2));
	}

	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{nutritionData && Object.keys(nutritionData).length > 0 && (
					<>
						<View style={styles.header}>
							<Text style={styles.welcomeText}>Olá, {nutritionData.nome}!</Text>
							<Text style={styles.subWelcomeText}>
								Aqui está sua dieta personalizada
							</Text>
						</View>

						{nutritionData.caloriasDiarias && (
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>
									Suas Necessidades Diárias
								</Text>
								<View style={styles.statsCard}>
									<View style={styles.statRow}>
										<Text style={styles.statValue}>
											{nutritionData.caloriasDiarias}
										</Text>
										<Text style={styles.statLabel}>Calorias/dia</Text>
									</View>
								</View>
								{nutritionData.macronutrientes && (
									<View style={styles.macroContainer}>
										{nutritionData.macronutrientes.proteinas && (
											<View style={styles.macroItem}>
												<Text style={styles.macroValue}>
													{nutritionData.macronutrientes.proteinas}
												</Text>
												<Text style={styles.macroLabel}>Proteínas</Text>
											</View>
										)}
										{nutritionData.macronutrientes.carboidratos && (
											<View style={styles.macroItem}>
												<Text style={styles.macroValue}>
													{nutritionData.macronutrientes.carboidratos}
												</Text>
												<Text style={styles.macroLabel}>Carboidratos</Text>
											</View>
										)}
										{nutritionData.macronutrientes.gorduras && (
											<View style={styles.macroItem}>
												<Text style={styles.macroValue}>
													{nutritionData.macronutrientes.gorduras}
												</Text>
												<Text style={styles.macroLabel}>Gorduras</Text>
											</View>
										)}
									</View>
								)}
							</View>
						)}

						<View style={styles.section}>
							<Text style={styles.sectionTitle}>Informações Pessoais</Text>
							<View style={styles.infoCard}>
								{nutritionData.idade && (
									<>
										<View style={styles.infoRow}>
											<Text style={styles.infoLabel}>Idade</Text>
											<Text style={styles.infoValue}>
												{nutritionData.idade} anos
											</Text>
										</View>
										<View style={styles.divider} />
									</>
								)}
								{nutritionData.genero && (
									<>
										<View style={styles.infoRow}>
											<Text style={styles.infoLabel}>Gênero</Text>
											<Text style={styles.infoValue}>
												{nutritionData.genero}
											</Text>
										</View>
										<View style={styles.divider} />
									</>
								)}
								{nutritionData.altura && (
									<>
										<View style={styles.infoRow}>
											<Text style={styles.infoLabel}>Altura</Text>
											<Text style={styles.infoValue}>
												{nutritionData.altura}
											</Text>
										</View>
										<View style={styles.divider} />
									</>
								)}
								{nutritionData.peso && (
									<>
										<View style={styles.infoRow}>
											<Text style={styles.infoLabel}>Peso</Text>
											<Text style={styles.infoValue}>{nutritionData.peso}</Text>
										</View>
										<View style={styles.divider} />
									</>
								)}
								{nutritionData.nivelAtividadeFisica && (
									<View style={styles.infoRow}>
										<Text style={styles.infoLabel}>Nível de Atividade</Text>
										<Text style={styles.infoValue}>
											{nutritionData.nivelAtividadeFisica}
										</Text>
									</View>
								)}
							</View>
						</View>

						{nutritionData.objetivo && (
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>Objetivo</Text>
								<View style={styles.objectiveCard}>
									<Text style={styles.objectiveText}>
										{nutritionData.objetivo}
									</Text>
								</View>
							</View>
						)}

						{nutritionData.refeicoes && nutritionData.refeicoes.length > 0 && (
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>Sua Rotina Alimentar</Text>
								{nutritionData.refeicoes.map((refeicao: any, index: number) => (
									<View key={index} style={styles.mealCard}>
										<View style={styles.mealHeader}>
											<Text style={styles.mealTime}>{refeicao.horario}</Text>
											<Text style={styles.mealName}>{refeicao.nome}</Text>
										</View>
										{refeicao.alimentos && refeicao.alimentos.length > 0 && (
											<View style={styles.alimentosContainer}>
												<Text style={styles.alimentosLabel}>Alimentos:</Text>
												{refeicao.alimentos.map(
													(alimento: string, foodIndex: number) => (
														<View key={foodIndex} style={styles.alimentoItem}>
															<Text style={styles.alimentoBullet}>•</Text>
															<Text style={styles.alimentoText}>
																{alimento}
															</Text>
														</View>
													)
												)}
											</View>
										)}
									</View>
								))}
							</View>
						)}

						{nutritionData.recomendacoes &&
							nutritionData.recomendacoes.length > 0 && (
								<View style={styles.section}>
									<Text style={styles.sectionTitle}>Recomendações</Text>
									<View style={styles.recommendationCard}>
										{nutritionData.recomendacoes.map(
											(recomendacao: string, index: number) => (
												<View key={index} style={styles.recommendationItem}>
													<Text style={styles.recommendationBullet}>💡</Text>
													<Text style={styles.recommendationText}>
														{recomendacao}
													</Text>
												</View>
											)
										)}
									</View>
								</View>
							)}

						{nutritionData.hidratacao && (
							<View style={[styles.section, styles.lastSection]}>
								<Text style={styles.sectionTitle}>Hidratação</Text>
								<View style={styles.hydrationCard}>
									<Text style={styles.hydrationText}>
										💧 {nutritionData.hidratacao}
									</Text>
								</View>
							</View>
						)}
					</>
				)}
			</ScrollView>
		</View>
	);
}
