import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";
const { height } = Dimensions.get("window");

export const optionSelectorStyles = StyleSheet.create({
	wrapper: {
		width: "90%",
		marginTop: height * 0.015,
		marginBottom: height * 0.02,
	},
	label: {
		fontSize: 16,
		fontWeight: "600",
		color: colors.title,
		marginBottom: 12,
	},
	optionsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
	},
	option: {
		minWidth: "31%",
		paddingVertical: 16,
		paddingHorizontal: 14,
		borderWidth: 2,
		borderColor: "#d0d0d0",
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	optionActive: {
		backgroundColor: colors.green,
		borderColor: colors.green,
		shadowColor: colors.green,
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
	},
	optionText: {
		fontSize: 14,
		color: "#666",
		textAlign: "center",
		fontWeight: "500",
	},
	optionTextActive: {
		color: colors.white,
		fontWeight: "700",
	},
	errorText: {
		color: "red",
		marginTop: 6,
		fontSize: 12,
	},
});
