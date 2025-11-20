import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.white,
		paddingHorizontal: width * 0.05,
	},
	image: {
		width: "100%",
		height: height * 0.4,
		resizeMode: "contain",
	},
	title: {
		fontSize: width * 0.06,
		fontWeight: "bold",
		color: colors.title,
		marginBottom: height * 0.02,
	},
	subtext: {
		fontSize: width * 0.04,
		color: colors.subtext,
		textAlign: "center",
		paddingHorizontal: width * 0.05,
	},
	buttonContainer: {
		backgroundColor: colors.white,
		padding: height * 0.02,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		width: "80%",
		padding: height * 0.025,
		borderRadius: 13,
		backgroundColor: colors.green,
	},
	buttonText: {
		color: colors.white,
		fontSize: width * 0.04,
		textAlign: "center",
	},
});
