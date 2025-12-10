import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Input from "@/components/Input";
import { styles } from "./styles";
import { buttonStyles } from "@/styles/Button/styles";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "@/routes/stackRoutes";
import { api } from "@/services/api";
import { useAuthStore } from "@/store/auth";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
	name: z.string().min(1, { message: "O nome é obrigatório" }),
	email: z
		.string()
		.min(1, { message: "Email é obrigatório" })
		.email({ message: "Email inválido" }),
	password: z
		.string()
		.min(1, { message: "Senha é obrigatória" })
		.min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

type FormDataInput = z.infer<typeof schema>;

export default function Register() {
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

	async function handleRegister(data: FormDataInput) {
		setLoading(true);
		try {
			const response = await api.post("/auth/register", {
				email: data.email.trim(),
				password: data.password,
				name: data.name.trim(),
			});

			const { token, user } = response.data;
			await login(token, user);

			Alert.alert("Sucesso", "Conta criada com sucesso!");
			navigation.navigate("Submit");
		} catch (error: any) {
			console.error("Erro no registro:", error);
			const errorMessage =
				error.response?.data?.error ||
				error.message ||
				"Erro ao criar conta. Verifique sua conexão e tente novamente.";
			Alert.alert("Erro ao criar conta", errorMessage);
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Crie sua conta NutriLife</Text>

			<Input
				name="name"
				control={control}
				placeholder="Nome"
				error={errors.name?.message}
				keyboardType="default"
				variant="login"
			/>

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
				placeholder="Senha (mínimo 6 caracteres)"
				error={errors.password?.message}
				keyboardType="default"
				secureTextEntry
				variant="login"
			/>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={[buttonStyles.button, loading && { opacity: 0.6 }]}
					onPress={handleSubmit(handleRegister)}
					disabled={loading}
				>
					<Text style={buttonStyles.buttonText}>
						{loading ? "Criando conta..." : "Criar conta"}
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.loginContainer}>
				<Text>Já possui uma conta?</Text>
				<TouchableOpacity onPress={() => navigation.navigate("Login")}>
					<Text style={styles.loginText}>Faça login</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
