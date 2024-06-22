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

const RegisterPageThree = () => {
  const navigation = useNavigation<StackTypes>();
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleNext = () => {
    if (input1 === "" || input2 === "") {
      alert("Por favor, preencha todos os campos");
    } else {
      navigation.navigate("RegisterScreenFour");
    }
  };

  return (
    <Container>
      <Title>Metas</Title>

      <InputText>Qual é a sua meta semanal?</InputText>
      <Input
        placeholder="Ganhar 0,2 quilogramas por semana"
        value={input1}
        onChangeText={(text) => setInput1(text)}
      />
      <Input
        placeholder="Ganhar 0,5 quilogramas por semana"
        value={input2}
        onChangeText={(text) => setInput2(text)}
      />

      <Button onPress={handleNext}>
        <ButtonText>Próximo</ButtonText>
      </Button>
    </Container>
  );
};

export default RegisterPageThree;
