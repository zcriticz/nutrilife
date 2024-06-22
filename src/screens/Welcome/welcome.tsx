import React from "react";

import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";

import { StackTypes } from "../../routes/stackRoutes";
import {
  Container,
  SlideImageOne,
  SlideImageTwo,
  SlideImageThree,
  TitleOne,
  TitleTwo,
  TitleThree,
  ParagraphOne,
  ParagraphTwo,
  ParagraphThree,
  ButtonOne,
  ButtonTwo,
  ButtonThree,
  ButtonText,
} from "./welcomeStyles";

export default function Welcome() {
  const navigation = useNavigation<StackTypes>();

  return (
    <Swiper
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        bottom: "40%",
      }}
      activeDotStyle={{
        backgroundColor: "#048C4C",
        width: 10,
        height: 10,
        borderRadius: 5,
        bottom: "40%",
      }}
    >
      <Container>
        <SlideImageOne source={require("../../assets/slides/salad.png")} />
        <TitleOne>Bem vindo ao NutriLife!</TitleOne>
        <ParagraphOne>
          Descubra uma vida mais saudável com nossas sugestões nutricionais
          personalizadas e receitas nutritivas.
        </ParagraphOne>
        <ButtonOne onPress={() => navigation.navigate("Login")}>
          <ButtonText>Próximo</ButtonText>
        </ButtonOne>
      </Container>

      <Container>
        <SlideImageTwo source={require("../../assets/slides/camera.png")} />
        <TitleTwo>Registre suas Refeições</TitleTwo>
        <ParagraphTwo>
          Registre suas refeições diárias facilmente com a nossa ferramenta de
          registro de refeições.
        </ParagraphTwo>
        <ButtonTwo onPress={() => navigation.navigate("Login")}>
          <ButtonText>Próximo</ButtonText>
        </ButtonTwo>
      </Container>

      <Container>
        <SlideImageThree source={require("../../assets/slides/goat.png")} />
        <TitleThree>Acompanhe Seu Progresso</TitleThree>
        <ParagraphThree>
          Acompanhe seu progresso de saúde ao longo do tempo com gráficos
          interativos.
        </ParagraphThree>
        <ButtonThree onPress={() => navigation.navigate("Login")}>
          <ButtonText>Próximo</ButtonText>
        </ButtonThree>
      </Container>
    </Swiper>
  );
}
