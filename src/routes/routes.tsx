import { NavigationContainer } from "@react-navigation/native";

import StackComponent from "./stackRoutes";

const Routes = () => {
  return (
    <NavigationContainer>
      <StackComponent />
    </NavigationContainer>
  );
};

export default Routes;
