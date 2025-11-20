import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { genderSelectorStyles } from "../GenderSelector/styles";
import { Controller } from "react-hook-form";

interface GenderSelectorProps {
	name: string;
	control: any;
	error?: string;
}

export default function GenderSelector({
	name,
	control,
	error,
}: GenderSelectorProps) {
	return (
		<View style={genderSelectorStyles.wrapper}>
			<View style={genderSelectorStyles.optionsContainer}>
				<Controller
					control={control}
					name={name}
					render={({ field: { onChange, value } }) => (
						<>
							<TouchableOpacity
								style={[
									genderSelectorStyles.option,
									value === "M" && genderSelectorStyles.optionActive,
								]}
								onPress={() => onChange("M")}
							>
								<Text
									style={[
										genderSelectorStyles.optionText,
										value === "M" && genderSelectorStyles.optionTextActive,
									]}
								>
									Masculino
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									genderSelectorStyles.option,
									value === "F" && genderSelectorStyles.optionActive,
								]}
								onPress={() => onChange("F")}
							>
								<Text
									style={[
										genderSelectorStyles.optionText,
										value === "F" && genderSelectorStyles.optionTextActive,
									]}
								>
									Feminino
								</Text>
							</TouchableOpacity>
						</>
					)}
				/>
			</View>
			{error && <Text style={genderSelectorStyles.errorText}>{error}</Text>}
		</View>
	);
}
