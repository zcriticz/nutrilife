import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { StackTypes } from "../../routes/stackRoutes";
import {
  Container,
  Title,
  InputFour,
  InputTextFour,
  CheckContainer,
  CheckText,
  Button,
  ButtonText,
} from "./registerStyles";

const RegisterScreenFour = () => {
  const navigation = useNavigation<StackTypes>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
  };

  const handleRegisterPress = () => {
    if (email === "" || password === "" || confirmPassword === "") {
      alert("Por favor, preencha todos os campos");
      return;
    }

    if (!isChecked) {
      alert("Por favor, marque a caixa de seleção");
      return;
    }
    alert("Cadastro realizado com sucesso!");
    navigation.navigate("Login");
  };

  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckPress = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Container>
      <Title>Criar Conta</Title>
      <InputTextFour>Digite seu e-mail</InputTextFour>
      <InputFour
        placeholder="E-mail"
        value={email}
        onChangeText={handleEmailChange}
        autoCapitalize="none"
      />
      <InputTextFour>Digite sua senha</InputTextFour>
      <InputFour
        placeholder="*******"
        value={password}
        onChangeText={handlePasswordChange}
        autoCapitalize="none"
      />
      <InputTextFour>Confirme sua senha</InputTextFour>
      <InputFour
        placeholder="*******"
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
        autoCapitalize="none"
      />
      <CheckContainer>
        <Feather
          name={isChecked ? "check-circle" : "circle"}
          size={20}
          onPress={handleCheckPress}
          color={isChecked ? "#00F180" : "#ccc"}
        ></Feather>
        <CheckText>
          Eu concordo com os Termos e Condições e a Política de Privacidade do
          NutriLife.
        </CheckText>
      </CheckContainer>

      <Button onPress={handleRegisterPress}>
        <ButtonText>Cadastrar</ButtonText>
      </Button>
    </Container>
  );
};

export default RegisterScreenFour;
