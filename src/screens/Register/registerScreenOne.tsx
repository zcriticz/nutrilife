import React, { useState } from "react";
import { ButtonGroup } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { StackTypes } from "../../routes/stackRoutes";
import {
  Container,
  Title,
  Input,
  InputText,
  Button,
  ButtonText,
} from "./registerStyles";

const Register = () => {
  const navigation = useNavigation<StackTypes>();

  const [selectedGender, setSelectedGender] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  const handleNext = () => {
    if (!name || !age || !location) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    navigation.navigate("RegisterPageTwo");
  };

  return (
    <Container>
      <Title>Conte-me um pouco sobre você</Title>

      <InputText>Qual é o seu gênero?</InputText>
      <ButtonGroup
        onPress={(index) =>
          setSelectedGender(index === 0 ? "Masculino" : "Feminino")
        }
        selectedIndex={selectedGender === "Feminino" ? 1 : 0}
        buttons={["Masculino", "Feminino"]}
        containerStyle={{ marginTop: 20, height: 50 }}
        selectedButtonStyle={{ backgroundColor: "#048c4c" }}
      />

      <InputText>Qual é o seu nome?</InputText>
      <Input
        placeholder="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <InputText>Qual é a sua idade?</InputText>
      <Input
        keyboardType="numeric"
        placeholder="Idade"
        value={age}
        onChangeText={(text) => setAge(text)}
      />

      <InputText>Onde você mora?</InputText>
      <Input
        defaultValue="Brasil"
        placeholder="Brasil"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />

      <Button onPress={handleNext}>
        <ButtonText>Próximo</ButtonText>
      </Button>
    </Container>
  );
};

export default Register;
