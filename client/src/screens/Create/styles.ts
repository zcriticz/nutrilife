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
	title: {
		fontSize: width * 0.05,
		textAlign: "center",
		fontWeight: "bold",
		marginTop: height * 0.02,
		marginBottom: height * 0.02,
	},
});
