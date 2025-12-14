import { StyleSheet } from "react-native";

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
		marginBottom: 10,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 14,
		color: "#666",
		marginBottom: 30,
		textAlign: "center",
	},
	buttonContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	backContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 20,
	},
	backText: {
		color: "#007AFF",
		fontWeight: "600",
	},
});
