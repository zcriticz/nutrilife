import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Input from "@/components/Input";
import { styles } from "./styles";
import { buttonStyles } from "@/styles/Button/styles";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "@/routes/stackRoutes";
import { api } from "@/services/api";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
	email: z
		.string()
		.min(1, { message: "Email é obrigatório" })
		.email({ message: "Email inválido" }),
});

type FormDataInput = z.infer<typeof schema>;

export default function ForgotPassword() {
	const navigation = useNavigation<StackTypes>();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataInput>({
		resolver: zodResolver(schema),
		mode: "onBlur",
	});

	const [loading, setLoading] = React.useState(false);

	async function handleForgotPassword(data: FormDataInput) {
		setLoading(true);
		try {
			const response = await api.post("/auth/forgot-password", {
				email: data.email.trim(),
			});

			const { message, token } = response.data;

			Alert.alert(
				"Token gerado",
				`${message}\n\nToken: \n${token}\n\nCopie este token para redefinir sua senha.`,
				[
					{
						text: "OK",
						onPress: () => {
							navigation.navigate("ResetPassword", { token });
						},
					},
				]
			);
		} catch (err: any) {
			console.error("Erro ao solicitar redefinição:", err);
			const errorMessage =
				err.response?.data?.error ||
				err.message ||
				"Erro ao solicitar redefinição de senha. Verifique sua conexão e tente novamente.";
			Alert.alert("Erro", errorMessage);
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Esqueci minha senha</Text>
			<Text style={styles.subtitle}>
				Digite seu email para receber um link de redefinição de senha
			</Text>

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

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={[buttonStyles.button, loading && { opacity: 0.6 }]}
					onPress={handleSubmit(handleForgotPassword)}
					disabled={loading}
				>
					<Text style={buttonStyles.buttonText}>
						{loading ? "Enviando..." : "Enviar"}
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.backContainer}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Text style={styles.backText}>Voltar para login</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
