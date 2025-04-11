import { NavigationContainer } from "@react-navigation/native";

import StackComponent from "./stackRoutes";

export default function MainRoutes() {
  return (
    <NavigationContainer>
      <StackComponent />
    </NavigationContainer>
  );
}
