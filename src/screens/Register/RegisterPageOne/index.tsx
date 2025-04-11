import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { ButtonGroup } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../../routes/stackRoutes";
import React, { useState } from "react";
import Styles from "./styles";

export default function RegisterPageOne() {
	const navigation = useNavigation<StackTypes>();

	const [selectedGender, setSelectedGender] = useState("");
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [location, setLocation] = useState("");

	const handleNext = () => {
		if (!selectedGender || !name || !age || !location) {
			alert("Por favor, preencha todos os campos");
			return;
		} else {
			navigation.navigate("RegisterPageTwo");
		}
	};

	return (
		<View style={Styles.container}>
			<Text style={Styles.title}>Conte-me um pouco sobre você</Text>
			<ButtonGroup
				onPress={(index) =>
					setSelectedGender(index === 0 ? "Masculino" : "Feminino")
				}
				selectedIndex={selectedGender === "Feminino" ? 1 : 0}
				buttons={["Masculino", "Feminino"]}
				containerStyle={{ marginTop: 20, height: 50 }}
				selectedButtonStyle={{ backgroundColor: "#048c4c" }}
				textStyle={{ color: "#000" }} // Corrected textProps
			/>
			<Text>Qual é o seu nome?</Text>
			<TextInput
				placeholder="Nome"
				value={name}
				onChangeText={(text) => setName(text)}
			/>
			<Text>Qual a sua idade?</Text>
			<TextInput
				placeholder="Idade"
				value={age}
				onChangeText={(text) => setAge(text)}
				keyboardType="numeric"
			/>
			<Text>Onde você mora?</Text>
			<TextInput
				placeholder="Cidade"
				defaultValue="Recife"
				value={location}
				onChangeText={(text) => setLocation(text)}
			/>
			<TextInput
				placeholder="Cidade"
				defaultValue="Recife"
				value={location}
				onChangeText={(text) => setLocation(text)}
			/>
			<TouchableOpacity style={Styles.button} onPress={handleNext} />
		</View>
	);
}
