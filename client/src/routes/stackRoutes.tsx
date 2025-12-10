import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import Welcome from "@/screens/Welcome";
import Login from "@/screens/Login";
import Register from "@/screens/Register";
import Submit from "@/screens/Submit";
import Create from "@/screens/Create";
import Nutrition from "@/screens/Nutrition";
import NutritionList from "@/screens/NutritionList";

const Stack = createNativeStackNavigator();

type StackNavigation = {
	Welcome: undefined;
	Login: undefined;
	Register: undefined;
	Submit: undefined;
	Create: undefined;
	Nutrition: { planId?: string };
	NutritionList: undefined;
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
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="Submit" component={Submit} />
			<Stack.Screen name="Create" component={Create} />
			<Stack.Screen name="Nutrition" component={Nutrition} />
			<Stack.Screen name="NutritionList" component={NutritionList} />
		</Stack.Navigator>
	);
}
