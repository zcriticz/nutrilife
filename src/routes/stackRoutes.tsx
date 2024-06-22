import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import Welcome from "../screens/Welcome/welcome";
import Login from "../screens/Login/login";
import Register from "../screens/Register/registerScreenOne";
import RegisterPageTwo from "../screens/Register/registerScreenTwo";
import RegisterPageThree from "../screens/Register/registerScreenThree";
import RegisterScreenFour from "../screens/Register/registerScreenFour";
import Records from "../screens/Records/records";
import TabComponent from "./tabRoutes";

const Stack = createNativeStackNavigator();

type StackNavigation = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  RegisterPageTwo: undefined;
  RegisterPageThree: undefined;
  RegisterScreenFour: undefined;
  Records: undefined;
  Tabs: undefined;
  Food: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

const StackComponent = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterPageTwo" component={RegisterPageTwo} />
      <Stack.Screen name="RegisterPageThree" component={RegisterPageThree} />
      <Stack.Screen name="RegisterScreenFour" component={RegisterScreenFour} />
      <Stack.Screen name="Records" component={Records} />
      <Stack.Screen name="Tabs" component={TabComponent} />
    </Stack.Navigator>
  );
};

export default StackComponent;
