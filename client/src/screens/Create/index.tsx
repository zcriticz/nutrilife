import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/stackRoutes";
import { styles } from "./styles";
import { buttonStyles } from "../../styles/Button/styles";
import OptionSelector from "../../components/OptionSelector";
import { useDataStore, Level, Objective } from "../../store/data";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
	level: z.enum(["nenhum", "leve", "moderado", "pesado"]),
	objective: z.enum(["hipertrofia", "definição", "emagrecimento"]),
});

type FormDataInput = z.infer<typeof schema>;

type FormData = {
	level: Level;
	objective: Objective;
};

const levelOptions = [
	{ value: "nenhum", label: "Nenhum" },
	{ value: "leve", label: "Leve" },
	{ value: "moderado", label: "Moderado" },
	{ value: "pesado", label: "Pesado" },
];

const objectiveOptions = [
	{ value: "hipertrofia", label: "Hipertrofia" },
	{ value: "definição", label: "Definição" },
	{ value: "emagrecimento", label: "Emagrecimento" },
];

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
			<OptionSelector
				name="level"
				control={control}
				options={levelOptions}
				error={errors.level?.message}
				label="Nível de Atividade"
			/>

			<OptionSelector
				name="objective"
				control={control}
				options={objectiveOptions}
				error={errors.objective?.message}
				label="Seu Objetivo"
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
