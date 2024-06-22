import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: "15%",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  graphicContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  graphicImage: {
    width: "90%",
    height: 212,
  },
  graphicImageTwo: {
    width: "85%",
    height: 275,
    maxHeight: 285,
    marginTop: "5%",
  },
});
