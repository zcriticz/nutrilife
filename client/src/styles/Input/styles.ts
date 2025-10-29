import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const inputStyles = StyleSheet.create({
	wrapper: {
		width: "100%",
		alignItems: "center",
	},
	inputArea: {
		width: "90%",
		padding: width * 0.03,
		marginTop: height * 0.02,
		borderWidth: 1,
		borderColor: "#e0e0e0",
		borderRadius: 8,
		textAlign: "center",
	},
	errorText: {
		color: "red",
		marginTop: 4,
		textAlign: "left",
	},
});
