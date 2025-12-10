import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 20,
		justifyContent: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 30,
		textAlign: "center",
	},
	buttonContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	loginContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 20,
		gap: 5,
	},
	loginText: {
		color: "#007AFF",
		fontWeight: "600",
	},
});
