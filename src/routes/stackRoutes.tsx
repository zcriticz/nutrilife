import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import RegisterPageOne from "../screens/Register/RegisterPageOne";
import RegisterPageTwo from "../screens/Register/RegisterPageTwo";
import RegisterPageThree from "../screens/Register/RegisterPageThree";
import RegisterPageFour from "../screens/Register/RegisterPageFour";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

type StackNavigation = {
	Welcome: undefined;
	Login: undefined;
	RegisterPageOne: undefined;
	RegisterPageTwo: undefined;
	RegisterPageThree: undefined;
	RegisterPageFour: undefined;
	Home: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export default function StackComponent() {
	return (
		<Stack.Navigator
			initialRouteName="Welcome"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Welcome" component={Welcome} />
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="RegisterPageOne" component={RegisterPageOne} />
			<Stack.Screen name="RegisterPageTwo" component={RegisterPageTwo} />
			<Stack.Screen name="RegisterPageThree" component={RegisterPageThree} />
			<Stack.Screen name="RegisterPageFour" component={RegisterPageFour} />
			<Stack.Screen name="Home" component={Home} />
		</Stack.Navigator>
	);
}
