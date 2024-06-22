import React, { useState } from "react";
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

const RegisterPageTwo = () => {
  const navigation = useNavigation<StackTypes>();

  const handleNext = () => {
    if (!height || !weight || !goal) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    navigation.navigate("RegisterPageThree");
  };

  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [goal, setGoal] = React.useState("");

  return (
    <Container>
      <Title>Conte-me um pouco sobre você</Title>

      <InputText>Qual a sua altura?</InputText>
      <Input
        placeholder="0cm"
        value={height}
        onChangeText={(text) => setHeight(text)}
      />

      <InputText>Qual o seu peso?</InputText>
      <Input
        placeholder="0kg"
        value={weight}
        onChangeText={(text) => setWeight(text)}
      />

      <InputText>Qual o seu objetivo?</InputText>
      <Input
        placeholder="Perder peso"
        value={goal}
        onChangeText={(text) => setGoal(text)}
      />

      <Button onPress={handleNext}>
        <ButtonText>Próximo</ButtonText>
      </Button>
    </Container>
  );
};

export default RegisterPageTwo;
