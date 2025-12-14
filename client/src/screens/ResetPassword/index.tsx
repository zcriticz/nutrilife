import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Input from "@/components/Input";
import { styles } from "./styles";
import { buttonStyles } from "@/styles/Button/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackTypes } from "@/routes/stackRoutes";
import { api } from "@/services/api";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z
	.object({
		token: z.string().min(1, { message: "Token é obrigatório" }),
		newPassword: z
			.string()
			.min(1, { message: "Senha é obrigatória" })
			.min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
		confirmPassword: z
			.string()
			.min(1, { message: "Confirmação de senha é obrigatória" }),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "As senhas não coincidem",
		path: ["confirmPassword"],
	});

type FormDataInput = z.infer<typeof schema>;

export default function ResetPassword() {
	const navigation = useNavigation<StackTypes>();
	const route = useRoute();
	const { token } = (route.params as { token?: string }) || {};

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<FormDataInput>({
		resolver: zodResolver(schema),
		mode: "onBlur",
		defaultValues: {
			token: token || "",
		},
	});

	React.useEffect(() => {
		if (token) {
			setValue("token", token);
		}
	}, [token, setValue]);

	const [loading, setLoading] = React.useState(false);

	async function handleResetPassword(data: FormDataInput) {
		setLoading(true);
		try {
			await api.post("/auth/reset-password", {
				token: data.token.trim(),
				newPassword: data.newPassword,
			});

			Alert.alert("Sucesso", "Senha redefinida com sucesso!", [
				{
					text: "OK",
					onPress: () => {
						navigation.navigate("Login");
					},
				},
			]);
		} catch (err: any) {
			console.error("Erro ao redefinir senha:", err);
			const errorMessage =
				err.response?.data?.err ||
				err.message ||
				"Erro ao redefinir senha. Verifique sua conexão e tente novamente.";
			Alert.alert("Erro", errorMessage);
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Redefinir senha</Text>
			<Text style={styles.subtitle}>
				Digite o token recebido e sua nova senha
			</Text>

			<Input
				name="token"
				control={control}
				placeholder="Token"
				error={errors.token?.message}
				keyboardType="default"
				autoCapitalize="none"
				autoCorrect={false}
				variant="login"
				// editable={!token}
			/>

			<Input
				name="newPassword"
				control={control}
				placeholder="Nova senha (mínimo 6 caracteres)"
				error={errors.newPassword?.message}
				keyboardType="default"
				secureTextEntry
				variant="login"
			/>

			<Input
				name="confirmPassword"
				control={control}
				placeholder="Confirmar nova senha"
				error={errors.confirmPassword?.message}
				keyboardType="default"
				secureTextEntry
				variant="login"
			/>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={[buttonStyles.button, loading && { opacity: 0.6 }]}
					onPress={handleSubmit(handleResetPassword)}
					disabled={loading}
				>
					<Text style={buttonStyles.buttonText}>
						{loading ? "Redefinindo..." : "Redefinir senha"}
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.backContainer}>
				<TouchableOpacity onPress={() => navigation.navigate("Login")}>
					<Text style={styles.backText}>Voltar para login</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
