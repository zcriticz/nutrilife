import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";

const { width, height } = Dimensions.get("window");

export const buttonStyles = StyleSheet.create({
	button: {
		backgroundColor: colors.green,
		width: "80%",
		padding: height * 0.02,
		borderRadius: 13,
		marginTop: height * 0.04,
	},
	buttonText: {
		color: colors.white,
		fontWeight: "bold",
		fontSize: width * 0.035,
		textAlign: "center",
	},
});
