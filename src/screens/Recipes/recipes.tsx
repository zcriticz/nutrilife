import React from "react";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/stackRoutes";

import { styles } from "./recipesStyles";

const Recipes = () => {
  const navigation = useNavigation<StackTypes>();

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar receitas"
      ></TextInput>

      <View>
        <Image
          source={require("../../assets/recipes/receita-frango-brocolis.jpg")}
          style={styles.grandModal}
        />
        <TouchableOpacity>
          <Text style={styles.modalTitle}>Frango com Caju e Brocolis</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.modalText}>SUGESTÕES DO DIA!</Text>

      <ScrollView>
        <View style={styles.modalSection}>
          <Image
            source={require("../../assets/recipes/receita-granola01.jpg")}
            style={styles.modalImage}
          />
          <Image
            source={require("../../assets/recipes/vanilla-almond-granola.jpg")}
            style={styles.modalImage}
          />
        </View>
        <View style={styles.modalSection}></View>
        <View style={styles.modalSection}>
          <Image
            source={require("../../assets/recipes/receita-guisado-de-grão-de-bico-com-cogumelos.jpg")}
            style={styles.modalImage}
          />
          <Image
            source={require("../../assets/recipes/receita-lanche-chips-de-batata-doce-no-forno.jpg")}
            style={styles.modalImage}
          />
        </View>
        <View style={styles.modalSection}>
          <Image
            source={require("../../assets/recipes/receita-quinoa.jpg")}
            style={styles.modalImage}
          />
          <Image
            source={require("../../assets/recipes//receita-prato-salada.jpg")}
            style={styles.modalImage}
          />
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Novo</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Recipes;
