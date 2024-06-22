import React from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/stackRoutes";

import { styles } from "./homeStyles";

const Home = () => {
  const navigation = useNavigation<StackTypes>();

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <Image
          source={require("../../assets/feed/avatar_blank.png")}
          style={styles.homeImage}
        />
        <Feather name="bell" size={23} style={{ bottom: 5 }} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.helloText}>Olá</Text>
        <Text style={styles.welcomeText}>Bem-Vindo(a)</Text>
      </View>

      <Image
        source={require("../../assets/graphics/default_graphic.png")}
        style={styles.graphicImage}
      />

      <ScrollView>
        <Text style={styles.foodText}>REGISTRAR REFEIÇÕES</Text>

        <View style={styles.foodContainer}>
          <Image
            source={require("../../assets/feed/breakfast.png")}
            style={styles.foodImage}
          />
          <Feather
            name="plus-circle"
            size={23}
            color="#000"
            style={{ right: "30%" }}
            onPress={() => alert("Acesso negado")}
          />
        </View>
        <View style={styles.foodContainerText}>
          <TouchableOpacity onPress={() => navigation.navigate("Records")}>
            <Text style={styles.foodTextContainer}>Cafe da manhã</Text>
          </TouchableOpacity>
          <Text style={styles.kiloText}>0 / 0 Kcal</Text>
        </View>

        <View style={styles.foodContainer}>
          <Image
            source={require("../../assets/feed/lunch.png")}
            style={styles.foodImage}
          />
          <Feather
            name="plus-circle"
            size={23}
            color="#000"
            style={{ right: "30%" }}
            onPress={() => alert("Acesso negado")}
          />
        </View>

        <View style={styles.foodContainerText}>
          <TouchableOpacity onPress={() => navigation.navigate("Records")}>
            <Text style={styles.foodTextContainer}>Almoço</Text>
          </TouchableOpacity>
          <Text style={styles.kiloText}>0 / 0 Kcal</Text>
        </View>
        <View style={styles.foodContainer}>
          <Image
            source={require("../../assets/feed/snack.png")}
            style={styles.foodImage}
          />
          <Feather
            name="plus-circle"
            size={23}
            color="#000"
            style={{ right: "30%" }}
            onPress={() => alert("Acesso negado")}
          />
        </View>
        <View style={styles.foodContainerText}>
          <TouchableOpacity onPress={() => navigation.navigate("Records")}>
            <Text style={styles.foodTextContainer}>Lanche</Text>
          </TouchableOpacity>
          <Text style={styles.kiloText}>0 / 0 Kcal</Text>
        </View>
        <View style={styles.foodContainer}>
          <Image
            source={require("../../assets/feed/dinner.png")}
            style={styles.foodImage}
          />
          <Feather
            name="plus-circle"
            size={23}
            color="#000"
            style={{ right: "30%" }}
            onPress={() => alert("Acesso negado")}
          />
        </View>
        <View style={styles.foodContainerText}>
          <TouchableOpacity onPress={() => navigation.navigate("Records")}>
            <Text style={styles.foodTextContainer}>Jantar</Text>
          </TouchableOpacity>
          <Text style={styles.kiloText}>0 / 0 Kcal</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
