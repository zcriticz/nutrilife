import Colors from "../../../styles/colors";
import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: Colors.white,
	},
	title: {
		marginTop: "20%",
		marginBottom: "10%",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
		borderRadius: 4,
		padding: 10,
		marginTop: "5%",
		textAlign: "center",
	},
	button: {
		backgroundColor: Colors.green,
		width: "80%",
		padding: 20,
		marginTop: "20%",
		borderRadius: 13,
		alignItems: "center",
		alignSelf: "center",
	},
});

export default Styles;
