import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.white,
	},
	logo: {
		width: width * 0.3,
		height: height * 0.06,
		resizeMode: "contain",
	},
	title: {
		fontSize: width * 0.05,
		textAlign: "center",
		fontWeight: "bold",
		marginTop: height * 0.02,
		marginBottom: height * 0.02,
	},
	subTitle: {
		fontSize: width * 0.04,
		textAlign: "center",
		fontWeight: "bold",
		marginTop: height * 0.02,
		marginBottom: height * 0.02,
	},
});
