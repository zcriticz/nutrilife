import Colors from "../../styles/colors";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.white,
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
		color: Colors.title,
		marginBottom: height * 0.02,
	},
	subtext: {
		fontSize: width * 0.04,
		color: Colors.subtext,
		textAlign: "center",
		paddingHorizontal: width * 0.05,
	},
	buttonContainer: {
		backgroundColor: Colors.white,
		padding: height * 0.02,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		width: "80%",
		padding: height * 0.025,
		borderRadius: 13,
		backgroundColor: Colors.green,
	},
	buttonText: {
		color: Colors.white,
		fontSize: width * 0.04,
		textAlign: "center",
	},
});

export default Styles;
