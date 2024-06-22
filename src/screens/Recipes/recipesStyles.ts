import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    margin: 12,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 50,
    marginTop: "10%",
  },
  grandModal: {
    width: "95%",
    height: 250,
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 20,
    color: "#fff",
    position: "absolute",
    alignSelf: "flex-start",
    bottom: 10,
  },
  modalText: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 10,
  },
  modalSection: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalImage: {
    width: "40%",
    height: 150,
    borderRadius: 20,
  },

  badge: {
    position: "absolute",
    top: "5%",
    left: "5%",
    backgroundColor: "#00F180",
    width: "12%",
    height: 20,
    borderRadius: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
  },
});
