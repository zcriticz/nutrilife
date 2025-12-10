import React from "react";
import { View, Text, KeyboardTypeOptions, TextInput, StyleSheet, Dimensions } from "react-native";
import { inputStyles } from "@/styles/Input/styles";
import { Controller } from "react-hook-form";

const { width, height } = Dimensions.get("window");

// Estilos originais para formulários (Submit, Create)
const originalInputStyles = StyleSheet.create({
	inputArea: {
		width: "90%",
		padding: width * 0.03,
		marginTop: height * 0.02,
		borderWidth: 0.5,
		borderColor: "#e0e0e0",
		borderRadius: 8,
		textAlign: "center",
	},
});

interface InputProps {
	name: string;
	control: any;
	placeholder?: string;
	rules?: object;
	error?: string;
	keyboardType: KeyboardTypeOptions;
	secureTextEntry?: boolean;
	autoCapitalize?: "none" | "sentences" | "words" | "characters";
	autoCorrect?: boolean;
	variant?: "login" | "default"; // "login" para Login/Register, "default" para outros
}

export default function Input({
	name,
	control,
	placeholder,
	rules,
	error,
	keyboardType,
	secureTextEntry,
	autoCapitalize,
	autoCorrect,
	variant = "default",
}: InputProps) {
	const inputStyle = variant === "login" 
		? inputStyles.inputArea 
		: originalInputStyles.inputArea;

	return (
		<View style={inputStyles.wrapper}>
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={inputStyle}
						placeholder={placeholder}
						placeholderTextColor="#999"
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						keyboardType={keyboardType}
						secureTextEntry={secureTextEntry}
						autoCapitalize={autoCapitalize}
						autoCorrect={autoCorrect}
					/>
				)}
			/>

			{error && <Text style={inputStyles.errorText}>{error}</Text>}
		</View>
	);
}
