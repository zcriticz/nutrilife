import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../styles/colors";

const { height } = Dimensions.get("window");

export const genderSelectorStyles = StyleSheet.create({
	wrapper: {
		width: "90%",
		marginTop: height * 0.02,
		marginBottom: height * 0.02,
	},
	optionsContainer: {
		flexDirection: "row",
		gap: 12,
	},
	option: {
		flex: 1,
		paddingVertical: 14,
		paddingHorizontal: 20,
		borderWidth: 1,
		borderColor: "#e0e0e0",
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
	},
	optionActive: {
		backgroundColor: colors.green,
	},
	optionText: {
		fontSize: 16,
		color: colors.title,
	},
	optionTextActive: {
		color: colors.white,
		fontWeight: "600",
	},
	errorText: {
		color: "red",
		marginTop: 4,
		fontSize: 12,
	},
});
