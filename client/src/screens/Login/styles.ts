import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.white,
		paddingHorizontal: width * 0.05,
	},
	logo: {
		width: width * 0.12,
		height: height * 0.06,
		resizeMode: "contain",
	},
	title: {
		fontSize: width * 0.04,
		fontWeight: "bold",
		marginTop: height * 0.02,
		marginBottom: height * 0.02,
	},
	inputArea: {
		width: "90%",
		padding: width * 0.03,
		marginTop: height * 0.02,
		borderBottomWidth: 1,
		borderRadius: 4,
		borderBottomColor: "#ccc",
		borderColor: "#ccc",
	},
	forgetPasswordContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "90%",
		marginTop: height * 0.01,
	},
	forgetPassword: {
		marginTop: height * 0.005,
		color: "#8d8deb",
	},
	button: {
		backgroundColor: colors.green,
		width: "80%",
		padding: height * 0.02,
		borderRadius: 13,
		marginTop: height * 0.03,
	},
	buttonText: {
		color: colors.white,
		fontSize: width * 0.035,
		textAlign: "center",
	},
	socialContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: width * 0.08,
		width: "90%",
		marginTop: height * 0.05,
	},
	socialIcon: {
		width: width * 0.08,
		height: width * 0.08,
		resizeMode: "contain",
	},
	noAccountContainer: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		marginTop: height * 0.03,
	},
	noAccountText: {
		color: "#8d8deb",
		fontWeight: "bold",
		fontSize: width * 0.035,
	},
});
