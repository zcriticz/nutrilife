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
		borderBottomWidth: 0.5,
		borderRadius: 4,
		borderBottomColor: "#ccc",
		borderColor: "#ccc",
	},
	errorText: {
		color: "red",
		marginTop: 4,
		marginLeft: "5%",
		fontSize: 12,
		textAlign: "left",
		width: "90%",
	},
});
