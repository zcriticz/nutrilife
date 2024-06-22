import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: "20%",
  },
  profileImage: {
    width: 80,
    height: 80,
    margin: "auto",
    borderRadius: 13,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
  },
  singUpTextContainer:{
    flexDirection: "row",
    justifyContent: "center",
  },
  singUpText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  singUpLink: {
    color: "#2097e7",
    fontSize: 14,
    fontWeight: "bold",
  },
  singUpIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
    marginTop: 30,
  },
  singUpIcon: {
    width: 35,
    height: 35,
  }
});
