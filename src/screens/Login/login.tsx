import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { StackTypes } from "../../routes/stackRoutes";
import {
  Container,
  Logo,
  Title,
  InputArea,
  ForgetPassowrd,
  RegisterContainer,
  RegisterText,
  RegisterTextLink,
  Button,
  ButtonText,
  SocialContainer,
  Social,
  NoAccount,
  NoAccountText,
  NoAccountTextLink,
} from "./loginStyles";

const Login = () => {
  const navigation = useNavigation<StackTypes>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Por favor, digite seu email e senha");
      return;
    } else {
      navigation.navigate("Tabs");
    }
  };

  return (
    <Container>
      <Logo source={require("../../assets/login/nutrilife.png")} />
      <Title>Entre na sua conta NutriLife!</Title>
      <InputArea
        placeholder="Email"
        keyboardType="email-address"
        autoCorrect={false}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <InputArea
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <ForgetPassowrd>Esqueceu a senha?</ForgetPassowrd>

      <Button onPress={handleLogin}>
        <ButtonText>Entrar</ButtonText>
      </Button>

      <RegisterContainer>
        <RegisterText>Ainda não tem conta?</RegisterText>
        <RegisterTextLink onPress={() => navigation.navigate("Register")}> 
          Cadastre-se
        </RegisterTextLink>
      </RegisterContainer>

      <SocialContainer>
        <Social source={require("../../assets/login/facebook.png")} />
        <Social source={require("../../assets/login/google.png")} />
      </SocialContainer>

      <NoAccount>
        <NoAccountText>Você também pode</NoAccountText>
        <NoAccountTextLink onPress={() => navigation.navigate("Tabs")}>
          experimentar o NutriLife sem conta
        </NoAccountTextLink>
      </NoAccount>
    </Container>
  );
};

export default Login;
