import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

export const Title = styled.Text`
  margin-top: 20%;
  margin-bottom: 10%;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export const Input = styled.TextInput`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-top: 5%;
  text-align: center;
`;

export const InputText = styled.Text`
  font-size: 14px;
  margin-top: 5%;
  font-weight: bold;
  text-align: center;
`;

export const Button = styled.TouchableOpacity`
  background-color: #048c4c;
  width: 80%;
  padding: 20px;
  align-items: center;
  align-self: center;
  border-radius: 13px;
  margin-top: 20%;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  text-align: center;
`;

// Styles for RegisterScreenFour

export const InputFour = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: "#ccc";
  border-color: #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-top: 5%;
  text-align: left;
`;

export const InputTextFour = styled.Text`
  font-size: 14px;
  margin-top: 5%;
  font-weight: bold;
  text-align: left;
`;

export const CheckContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 10%;
`;

export const CheckText = styled.Text`
  font-size: 10px;
`;
