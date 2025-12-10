import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	loading: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.white,
	},
	loadingText: {
		fontSize: width * 0.04,
		color: colors.title,
		textAlign: "center",
		paddingHorizontal: width * 0.05,
	},
	header: {
		paddingHorizontal: width * 0.05,
		paddingTop: height * 0.05,
		paddingBottom: height * 0.02,
		backgroundColor: colors.green,
	},
	title: {
		fontSize: width * 0.06,
		fontWeight: "bold",
		color: colors.white,
		marginBottom: height * 0.005,
	},
	subtitle: {
		fontSize: width * 0.035,
		color: colors.white,
		opacity: 0.9,
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		padding: width * 0.05,
		paddingBottom: height * 0.05,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: height * 0.1,
	},
	emptyText: {
		fontSize: width * 0.045,
		color: colors.title,
		textAlign: "center",
		marginBottom: height * 0.01,
		fontWeight: "600",
	},
	emptySubtext: {
		fontSize: width * 0.035,
		color: colors.subtext,
		textAlign: "center",
		marginBottom: height * 0.03,
	},
	createButton: {
		backgroundColor: colors.green,
		borderRadius: 12,
		padding: width * 0.04,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: height * 0.02,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
	},
	createButtonText: {
		color: colors.white,
		fontSize: width * 0.04,
		fontWeight: "bold",
	},
	planCard: {
		backgroundColor: "#fafafa",
		borderRadius: 12,
		padding: width * 0.04,
		marginBottom: height * 0.02,
		borderWidth: 1,
		borderColor: "#e0e0e0",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},
	planHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: height * 0.01,
	},
	planName: {
		fontSize: width * 0.045,
		fontWeight: "bold",
		color: colors.title,
		flex: 1,
		marginRight: width * 0.02,
	},
	planDate: {
		fontSize: width * 0.03,
		color: colors.subtext,
	},
	planObjective: {
		fontSize: width * 0.035,
		color: colors.subtext,
		marginBottom: height * 0.005,
	},
	planCalories: {
		fontSize: width * 0.037,
		color: colors.green,
		fontWeight: "600",
		marginBottom: height * 0.01,
	},
	planFooter: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: height * 0.005,
		paddingTop: height * 0.01,
		borderTopWidth: 1,
		borderTopColor: "#e0e0e0",
	},
	viewText: {
		fontSize: width * 0.035,
		color: colors.green,
		fontWeight: "600",
	},
	retryButton: {
		marginTop: 20,
		padding: 12,
		backgroundColor: colors.green,
		borderRadius: 8,
	},
	retryButtonText: {
		color: colors.white,
		fontSize: width * 0.037,
		fontWeight: "600",
		textAlign: "center",
	},
});
