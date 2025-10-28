import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { api } from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/stackRoutes";
import { styles } from "./styles";
import { useQuery } from "@tanstack/react-query";
import { useDataStore } from "../../store/data";
import { Data } from "../../types/data";

interface ResponseData {
	data: Data;
}

export default function Nutrition() {
	const navigation = useNavigation<StackTypes>();

	const user = useDataStore((state) => state.user);

	const { data, isFetching, error } = useQuery<ResponseData>({
		queryKey: ["nutrition", user],
		queryFn: async () => {
			try {
				if (!user || !user.name || !user.age || !user.weight) {
					throw new Error("Dados do usuário incompletos");
				}

				const response = await api.post<ResponseData>("/create", {
					name: user.name,
					age: user.age,
					weight: user.weight,
					height: user.height,
					gender: user.gender,
					level: user.level,
					objective: user.objective,
				});

				return response.data;
			} catch (e) {
				console.log("Erro ao buscar dados da API:", e);
				throw e;
			}
		},
		enabled: !!user && !!user.name && !!user.age && !!user.weight,
	});

	if (isFetching) {
		return (
			<View style={styles.loading}>
				<Text style={styles.loadingText}>Gerando sua dieta...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.loading}>
				<Text style={styles.loadingText}>Falha ao carregar dieta</Text>
				<TouchableOpacity onPress={() => navigation.navigate("Submit")}>
					<Text style={styles.loadingText}>
						Ainda estamos em beta, seja paciente e tente novamente
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	const nutritionData = data?.data;

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
