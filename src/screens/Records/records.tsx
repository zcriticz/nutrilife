import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { StackTypes } from "../../routes/stackRoutes";

const Records = () => {
  const navigation = useNavigation<StackTypes>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Você não tem permissão para acessar este recurso pois ainda não está
        vinculado ao NutriLife!
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Por favor faça seu login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  link: {
    color: "#2097e7",
    textAlign: "center",
  },
});

export default Records;
