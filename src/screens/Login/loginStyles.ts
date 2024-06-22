import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

export const Logo = styled.Image`
  width: 46px;
  height: 47px;
  resize: contain;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10%;
  margin-bottom: 10%;
`;

export const InputArea = styled.TextInput`
  width: 90%;
  padding: 10px;
  margin-top: 5%;
  border-bottom-width: 1px;
  border-bottom-color: "#ccc";
  border-color: #ccc;
  border-radius: 4px;
`;

export const ForgetPassowrd = styled.Text`
  top: 2%;
  right: 28%;
  font-size: 10px;
  text-decoration: underline;
  color: #8d8deb;
`;

export const Button = styled.TouchableOpacity`
  background-color: #048c4c;
  width: 80%;
  padding: 15px;
  border-radius: 13px;
  margin-top: 15%;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  text-align: center;
`;

export const RegisterContainer = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 40px;
`;

export const RegisterText = styled.Text`
  font-size: 10px;
`;

export const RegisterTextLink = styled.Text`
  font-size: 10px;
  left: 5px;
  color: #2097e7;
`;

export const SocialContainer = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 50px;
`;

export const Social = styled.Image`
  margin-top: 10%;
  width: 30px;
  height: 30px;
`;

export const NoAccount = styled.TouchableOpacity`
  margin-top: 10%;
`;

export const NoAccountText = styled.Text`
  font-size: 10px;
  text-align: center;
`;

export const NoAccountTextLink = styled.Text`
  font-size: 10px;
  color: #2097e7;
  text-align: center;
`;

