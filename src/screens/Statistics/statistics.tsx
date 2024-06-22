import React from "react";
import { View, Text, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

import { styles } from "../Statistics/statisticsStyles";

const Statistics = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>Seu Progresso</Text>
        <Feather name="more-vertical" size={23} />
      </View>

      <View style={styles.graphicContainer}>
        <Image
          source={require("../../assets/graphics/default-graphic-scale.png")}
          style={styles.graphicImage}
        />

        <Text style={{ fontWeight: "bold", marginTop: "5%" }}>
          QUANTIDADE DE CALORIAS GANHAS SEMANAIS
        </Text>
        <Image
          source={require("../../assets/graphics/default_graphic-bar.png")}
          style={styles.graphicImageTwo}
        />
      </View>
    </View>
  );
};

export default Statistics;
