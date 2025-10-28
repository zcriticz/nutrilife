import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../styles/colors";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.white,
	},
	logo: {
		width: width * 0.4,
		height: height * 0.08,
		resizeMode: "contain",
	},
	title: {
		fontSize: width * 0.04,
		maxWidth: width * 0.8,
		textAlign: "center",
		fontWeight: "bold",
		marginTop: height * 0.02,
		marginBottom: height * 0.02,
	},
});
