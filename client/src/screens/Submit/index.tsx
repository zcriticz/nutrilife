import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/stackRoutes";
import { styles } from "./styles";
import { buttonStyles } from "../../styles/Button/styles";
import Input from "../../components/Input";
import GenderSelector from "../../components/GenderSelector";
import { useDataStore } from "../../store/data";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
	name: z.string().min(1, { message: "O nome é obrigatório" }),
	age: z
		.string()
		.min(1, { message: "A idade é obrigatória" })
		.refine((val) => !isNaN(parseInt(val)), {
			message: "A idade deve ser um número",
		})
		.refine((val) => parseInt(val) > 0, {
			message: "A idade deve ser maior que 0",
		}),
	weight: z
		.string()
		.min(1, { message: "O peso é obrigatório" })
		.refine((val) => !isNaN(parseFloat(val)), {
			message: "O peso deve ser um número",
		})
		.refine((val) => parseFloat(val) > 0, {
			message: "O peso deve ser maior que 0",
		}),
	height: z
		.string()
		.min(1, { message: "A altura é obrigatória" })
		.refine((val) => !isNaN(parseFloat(val)), {
			message: "A altura deve ser um número",
		})
		.refine((val) => parseFloat(val) > 0, {
			message: "A altura deve ser maior que 0",
		}),
	gender: z.enum(["M", "F"], { message: "Selecione seu gênero" }),
});

type FormDataInput = z.infer<typeof schema>;

type FormData = {
	name: string;
	age: number;
	weight: number;
	height: number;
	gender: "M" | "F";
};

export default function Submit() {
	const navigation = useNavigation<StackTypes>();
	const setPageOne = useDataStore((state) => state.setPageOne);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataInput>({
		resolver: zodResolver(schema),
	});

	function handleRegister(data: FormDataInput) {
		const convertedData: FormData = {
			name: data.name,
			age: parseInt(data.age),
			weight: parseFloat(data.weight),
			height: parseFloat(data.height),
			gender: data.gender,
		};

		setPageOne(convertedData);

		navigation.navigate("Create");
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Conte-me um pouco sobre você</Text>

			<GenderSelector
				name="gender"
				control={control}
				error={errors.gender?.message}
			/>

			<Input
				name="name"
				control={control}
				placeholder="Nome"
				error={errors.name?.message}
				keyboardType="default"
			/>
			<Input
				name="age"
				control={control}
				placeholder="Idade"
				error={errors.age?.message}
				keyboardType="numeric"
			/>
			<Input
				name="weight"
				control={control}
				placeholder="Peso"
				error={errors.weight?.message}
				keyboardType="numeric"
			/>
			<Input
				name="height"
				control={control}
				placeholder="Altura"
				error={errors.height?.message}
				keyboardType="numeric"
			/>

			<TouchableOpacity
				style={buttonStyles.button}
				onPress={handleSubmit(handleRegister)}
			>
				<Text style={buttonStyles.buttonText}>Próximo</Text>
			</TouchableOpacity>
		</View>
	);
}
