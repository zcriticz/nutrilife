import { StyleSheet } from "react-native";

const mapsStyles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  searchContainer: {
    position: "absolute",
    top: "5%",
    left: 10,
    right: 10,
    borderRadius: 13,
  },
  googlePlacesAutocomplete: {
    flex: 1,
    backgroundColor: "transparent",
    borderTopWidth: 4,
    borderBottomWidth: 0,
  },
});

export default mapsStyles;
