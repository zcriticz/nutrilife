import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { StackTypes } from "../../routes/stackRoutes";
import { styles } from "./profileStyles";

const Profile = () => {
  const navigation = useNavigation<StackTypes>();

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require("../../assets/feed/avatar_blank.png")}
          style={styles.profileImage}
        />

        <Text style={styles.profileName}>Usuário(a)</Text>
      </View>

        <Text style={styles.singUpText}>Gostou do NutriLife?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.singUpLink}>Então faça seu Login!</Text>
        </TouchableOpacity>

      <View style={styles.singUpIconContainer}>
        <Image
          source={require("../../assets/login/facebook.png")}
          style={styles.singUpIcon}
        />
        <Image
          source={require("../../assets/login/google.png")}
          style={styles.singUpIcon}
        />
      </View>
    </View>
  );
};

export default Profile;
