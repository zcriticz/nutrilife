import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { optionSelectorStyles } from "./styles";
import { Controller } from "react-hook-form";

interface Option {
	value: string;
	label: string;
}

interface OptionSelectorProps {
	name: string;
	control: any;
	error?: string;
	options: Option[];
	label: string;
}

export default function OptionSelector({
	name,
	control,
	error,
	options,
	label,
}: OptionSelectorProps) {
	return (
		<View style={optionSelectorStyles.wrapper}>
			<Text style={optionSelectorStyles.label}>{label}</Text>
			<View style={optionSelectorStyles.optionsContainer}>
				<Controller
					control={control}
					name={name}
					render={({ field: { onChange, value } }) => (
						<>
							{options.map((option) => (
								<TouchableOpacity
									key={option.value}
									style={[
										optionSelectorStyles.option,
										value === option.value && optionSelectorStyles.optionActive,
									]}
									onPress={() => onChange(option.value)}
									activeOpacity={0.7}
								>
									<Text
										style={[
											optionSelectorStyles.optionText,
											value === option.value &&
												optionSelectorStyles.optionTextActive,
										]}
									>
										{option.label}
									</Text>
								</TouchableOpacity>
							))}
						</>
					)}
				/>
			</View>
			{error && <Text style={optionSelectorStyles.errorText}>{error}</Text>}
		</View>
	);
}
