import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/stackRoutes";
import Styles from "./styles";
import React from "react";

export default function Login() {
	const navigation = useNavigation<StackTypes>();

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleLogin = () => {
		if (!email || !password) {
			alert("Por favor preencha todoos os campos!");
		}
		return;
	};

	return (
		<View style={Styles.container}>
			<Image
				style={Styles.logo}
				source={require("../../assets/social/nutrilife.png")}
			></Image>
			<Text style={Styles.title}>Entre na sua conta NutriLife!</Text>
			<TextInput
				style={Styles.inputArea}
				placeholder="Email"
				keyboardType="email-address"
				autoCorrect={false}
				autoCapitalize="none"
				value={email}
				onChangeText={setEmail}
			/>

			<TextInput
				style={Styles.inputArea}
				placeholder="Senha"
				secureTextEntry={true}
				value={password}
				onChangeText={setPassword}
			/>

			<View style={Styles.forgetPasswordContainer}>
				<TouchableOpacity style={Styles.forgetPassword}>
					<Text style={Styles.forgetPassword}>Esqueci minha senha</Text>
				</TouchableOpacity>
			</View>

			<TouchableOpacity
				style={Styles.button}
				onPress={() => {
					handleLogin();
				}}
			>
				<Text style={Styles.buttonText}>Entrar</Text>
			</TouchableOpacity>

			<View style={Styles.socialContainer}>
				<Image
					style={Styles.socialIcon}
					source={require("../../assets/social/google.png")}
				/>
				<Image
					style={Styles.socialIcon}
					source={require("../../assets/social/facebook.png")}
				/>
			</View>

			<View style={Styles.noAccountContainer}>
				<Text>Ainda não possui uma conta?</Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("RegisterPageOne");
					}}
				>
					<Text style={Styles.noAccountText}>Cadastre-se</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
