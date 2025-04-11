import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StackTypes } from "../../routes/stackRoutes";
import Styles from "./styles";
import React, { useRef, useCallback } from "react";
import Swiper from "react-native-swiper";

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
				<View style={Styles.container}>
					<Image
						style={Styles.image}
						source={require("../../assets/swiper/salad.png")}
					/>
					<Text style={Styles.title}>Bem vindo ao NutriLife!</Text>
					<Text style={Styles.subtext}>
						Descubra uma vida mais saudável com nossas sugestões nutricionais
						personalizadas.
					</Text>
				</View>

				<View style={Styles.container}>
					<Image
						source={require("../../assets/swiper/camera.png")}
						style={Styles.image}
					/>
					<Text style={Styles.title}>Registre suas Refeições</Text>
					<Text style={Styles.subtext}>
						Registre suas refeições diárias facilmente com a nossa ferramenta de
						registro de refeições.
					</Text>
				</View>

				<View style={Styles.container}>
					<Image
						style={Styles.image}
						source={require("../../assets/swiper/goat.png")}
					/>
					<Text style={Styles.title}>Acompanhe Seu Progresso</Text>
					<Text style={Styles.subtext}>
						Acompanhe seu progresso de saúde ao longo do tempo com gráficos
						interativos.
					</Text>
				</View>
			</Swiper>

			<View style={Styles.buttonContainer}>
				<TouchableOpacity
					style={Styles.button}
					onPress={() => navigation.navigate("Login")}
				>
					<Text style={Styles.buttonText}>Próximo</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
