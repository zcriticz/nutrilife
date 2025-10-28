import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../styles/colors";

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
		paddingTop: height * 0.03,
		paddingBottom: height * 0.02,
		backgroundColor: colors.green,
	},
	welcomeText: {
		fontSize: width * 0.06,
		fontWeight: "bold",
		color: colors.white,
		marginBottom: height * 0.005,
	},
	subWelcomeText: {
		fontSize: width * 0.035,
		color: colors.white,
		opacity: 0.9,
	},
	section: {
		paddingHorizontal: width * 0.05,
		marginTop: height * 0.02,
	},
	sectionTitle: {
		fontSize: width * 0.045,
		fontWeight: "bold",
		color: colors.title,
		marginBottom: height * 0.015,
	},
	infoCard: {
		backgroundColor: "#f5f5f5",
		borderRadius: 12,
		padding: width * 0.04,
		borderWidth: 1,
		borderColor: "#e0e0e0",
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: height * 0.01,
	},
	infoLabel: {
		fontSize: width * 0.037,
		color: colors.subtext,
		fontWeight: "500",
	},
	infoValue: {
		fontSize: width * 0.037,
		color: colors.title,
		fontWeight: "bold",
		flex: 1,
		textAlign: "right",
	},
	divider: {
		height: 1,
		backgroundColor: "#e0e0e0",
		marginVertical: height * 0.005,
	},
	objectiveCard: {
		backgroundColor: colors.green,
		borderRadius: 12,
		padding: width * 0.04,
		borderWidth: 1,
		borderColor: "#037a43",
	},
	objectiveText: {
		fontSize: width * 0.037,
		color: colors.white,
		textAlign: "center",
		fontWeight: "600",
	},
	mealCard: {
		backgroundColor: "#fafafa",
		borderRadius: 12,
		padding: width * 0.04,
		marginBottom: height * 0.015,
		borderWidth: 1,
		borderColor: "#e0e0e0",
	},
	mealHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: height * 0.01,
	},
	mealTime: {
		fontSize: width * 0.033,
		color: colors.green,
		fontWeight: "bold",
	},
	mealName: {
		fontSize: width * 0.04,
		color: colors.title,
		fontWeight: "bold",
		flex: 1,
		textAlign: "right",
	},
	alimentosContainer: {
		marginTop: height * 0.01,
		paddingTop: height * 0.01,
		borderTopWidth: 1,
		borderTopColor: "#e0e0e0",
	},
	alimentosLabel: {
		fontSize: width * 0.035,
		color: colors.subtext,
		fontWeight: "600",
		marginBottom: height * 0.005,
	},
	alimentoItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginVertical: height * 0.003,
	},
	alimentoBullet: {
		fontSize: width * 0.04,
		color: colors.green,
		marginRight: width * 0.02,
		fontWeight: "bold",
	},
	alimentoText: {
		fontSize: width * 0.033,
		color: colors.title,
		flex: 1,
	},
	statsCard: {
		backgroundColor: colors.green,
		borderRadius: 12,
		padding: width * 0.04,
		marginBottom: height * 0.015,
		alignItems: "center",
	},
	statRow: {
		alignItems: "center",
	},
	statValue: {
		fontSize: width * 0.06,
		fontWeight: "bold",
		color: colors.white,
	},
	statLabel: {
		fontSize: width * 0.033,
		color: colors.white,
		opacity: 0.9,
	},
	macroContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: height * 0.015,
	},
	macroItem: {
		flex: 1,
		alignItems: "center",
		padding: width * 0.02,
		backgroundColor: "#f5f5f5",
		borderRadius: 8,
		marginHorizontal: width * 0.01,
	},
	macroValue: {
		fontSize: width * 0.037,
		fontWeight: "bold",
		color: colors.green,
		textAlign: "center",
	},
	macroLabel: {
		fontSize: width * 0.03,
		color: colors.subtext,
		textAlign: "center",
		marginTop: height * 0.005,
	},
	recommendationCard: {
		backgroundColor: "#f5f5f5",
		borderRadius: 12,
		padding: width * 0.04,
		borderWidth: 1,
		borderColor: "#e0e0e0",
	},
	recommendationItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginVertical: height * 0.01,
	},
	recommendationBullet: {
		fontSize: width * 0.04,
		marginRight: width * 0.02,
	},
	recommendationText: {
		fontSize: width * 0.033,
		color: colors.title,
		flex: 1,
		lineHeight: width * 0.045,
	},
	hydrationCard: {
		backgroundColor: "#e3f2fd",
		borderRadius: 12,
		padding: width * 0.04,
		borderWidth: 1,
		borderColor: "#90caf9",
	},
	hydrationText: {
		fontSize: width * 0.037,
		color: "#1565c0",
		fontWeight: "600",
		textAlign: "center",
	},
	lastSection: {
		marginBottom: height * 0.05,
	},
});
