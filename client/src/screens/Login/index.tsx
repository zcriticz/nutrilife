import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "@/routes/stackRoutes";
import { styles } from "./styles";
import React from "react";
import { api } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import Input from "@/components/Input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
	email: z
		.string()
		.min(1, { message: "Email é obrigatório" })
		.email({ message: "Email inválido" }),
	password: z.string().min(1, { message: "Senha é obrigatória" }),
});

type FormDataInput = z.infer<typeof schema>;

export default function Login() {
	const navigation = useNavigation<StackTypes>();
	const login = useAuthStore((state) => state.login);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataInput>({
		resolver: zodResolver(schema),
		mode: "onBlur",
	});

	const [loading, setLoading] = React.useState(false);

	const handleLogin = async (data: FormDataInput) => {
		setLoading(true);
		try {
			const response = await api.post("/auth/login", {
				email: data.email.trim(),
				password: data.password,
			});

			const { token, user } = response.data;
			await login(token, user);

			navigation.navigate("NutritionList");
		} catch (err: any) {
			console.error("Erro no login:", err);
			const errorMessage =
				err.response?.data?.err ||
				err.message ||
				"Erro ao fazer login. Verifique sua conexão e tente novamente.";
			Alert.alert("Erro ao fazer login", errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Image
				style={styles.logo}
				source={require("@assets/social/nutrilife.png")}
			></Image>
			<Text style={styles.title}>Entre na sua conta NutriLife!</Text>

			<Input
				name="email"
				control={control}
				placeholder="Email"
				error={errors.email?.message}
				keyboardType="email-address"
				autoCapitalize="none"
				autoCorrect={false}
				variant="login"
			/>

			<Input
				name="password"
				control={control}
				placeholder="Senha"
				keyboardType="default"
				error={errors.password?.message}
				secureTextEntry
				variant="login"
			/>

			<View style={styles.forgetPasswordContainer}>
				<TouchableOpacity
					style={styles.forgetPassword}
					onPress={() => navigation.navigate("ForgotPassword")}
				>
					<Text style={styles.forgetPassword}>Esqueci minha senha</Text>
				</TouchableOpacity>
			</View>

			<TouchableOpacity
				style={[styles.button, loading && { opacity: 0.6 }]}
				onPress={handleSubmit(handleLogin)}
				disabled={loading}
			>
				<Text style={styles.buttonText}>
					{loading ? "Entrando..." : "Entrar"}
				</Text>
			</TouchableOpacity>

			<View style={styles.socialContainer}>
				<Image
					style={styles.socialIcon}
					source={require("@assets/social/google.png")}
				/>
				<Image
					style={styles.socialIcon}
					source={require("@assets/social/facebook.png")}
				/>
			</View>

			<View style={styles.noAccountContainer}>
				<Text>Ainda não possui uma conta?</Text>
				<TouchableOpacity onPress={() => navigation.navigate("Register")}>
					<Text style={styles.noAccountText}>Cadastre-se</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
