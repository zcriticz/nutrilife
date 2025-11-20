import React from "react";
import { View, Text, KeyboardTypeOptions, TextInput } from "react-native";
import { inputStyles } from "@/styles/Input/styles";
import { Controller } from "react-hook-form";

interface InputProps {
	name: string;
	control: any;
	placeholder?: string;
	rules?: object;
	error?: string;
	keyboardType: KeyboardTypeOptions;
}

export default function Input({
	name,
	control,
	placeholder,
	rules,
	error,
	keyboardType,
}: InputProps) {
	return (
		<View style={inputStyles.wrapper}>
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={inputStyles.inputArea}
						placeholder={placeholder}
						placeholderTextColor="#999"
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						keyboardType={keyboardType}
					/>
				)}
			/>

			{error && <Text style={inputStyles.errorText}>{error}</Text>}
		</View>
	);
}
