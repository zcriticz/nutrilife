import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/stackRoutes";
import { styles } from "./styles";
import { buttonStyles } from "../../styles/Button/styles";
import Input from "../../components/Input";
import { useDataStore } from "../../store/data";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
	level: z.string().min(1, { message: "Selecione seu nível de atividade" }),
	objective: z.string().min(1, { message: "Selecione seu objetivo" }),
});

type FormDataInput = z.infer<typeof schema>;

type FormData = {
	level: string;
	objective: string;
};

export default function Create() {
	const navigation = useNavigation<StackTypes>();
	const setPageTwo = useDataStore((state) => state.setPageTwo);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataInput>({
		resolver: zodResolver(schema),
	});

	function handleSubmitForm(data: FormDataInput) {
		const convertedData: FormData = {
			level: data.level,
			objective: data.objective,
		};
		setPageTwo(convertedData);

		navigation.navigate("Nutrition");
	}

	return (
		<View style={styles.container}>
			<Image
				source={require("../../assets/commons/icon.png")}
				style={styles.logo}
			/>
			<Text style={styles.title}>Preencha os dados adicionais</Text>

			<Input
				name="level"
				control={control}
				placeholder="Seu nível de atividade"
				error={errors.level?.message}
				keyboardType="default"
			/>

			<Input
				name="objective"
				control={control}
				placeholder="Seu objetivo"
				error={errors.objective?.message}
				keyboardType="default"
			/>

			<TouchableOpacity
				style={buttonStyles.button}
				onPress={handleSubmit(handleSubmitForm)}
			>
				<Text style={buttonStyles.buttonText}>Finalizar</Text>
			</TouchableOpacity>
		</View>
	);
}
