import React, { useRef, useCallback } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { styles } from "./styles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackTypes } from "@/routes/stackRoutes";

export default function Welcome() {
	const navigation = useNavigation<StackTypes>();
	const swiperRef = useRef<Swiper>(null);

	useFocusEffect(
		useCallback(() => {
			swiperRef.current?.scrollTo(1);
		}, [])
	);

	return (
		<View style={{ flex: 1 }}>
			<Swiper
				ref={swiperRef}
				dotStyle={{ width: 10, height: 10, borderRadius: 5 }}
				activeDotStyle={{
					width: 10,
					height: 10,
					borderRadius: 5,
					backgroundColor: "#048C4C",
				}}
			>
				<View style={styles.container}>
					<Image
						style={styles.image}
						source={require("../../../assets/swiper/salad.png")}
					/>
					<Text style={styles.title}>Bem vindo ao NutriLife!</Text>
					<Text style={styles.subtext}>
						Descubra uma vida mais saudável com nossas sugestões nutricionais
						personalizadas.
					</Text>
				</View>

				<View style={styles.container}>
					<Image
						source={require("../../../assets/swiper/camera.png")}
						style={styles.image}
					/>
					<Text style={styles.title}>Registre suas Refeições</Text>
					<Text style={styles.subtext}>
						Registre suas refeições diárias facilmente com a nossa ferramenta de
						registro de refeições.
					</Text>
				</View>

				<View style={styles.container}>
					<Image
						style={styles.image}
						source={require("../../../assets/swiper/goat.png")}
					/>
					<Text style={styles.title}>Acompanhe Seu Progresso</Text>
					<Text style={styles.subtext}>
						Acompanhe seu progresso de saúde ao longo do tempo com gráficos
						interativos.
					</Text>
				</View>
			</Swiper>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("Submit")}
				>
					<Text style={styles.buttonText}>Próximo</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
