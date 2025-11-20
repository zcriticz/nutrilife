import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import Welcome from "@/screens/Welcome";
import Submit from "@/screens/Submit";
import Create from "@/screens/Create";
import Nutrition from "@/screens/Nutrition";

const Stack = createNativeStackNavigator();

type StackNavigation = {
	Welcome: undefined;
	Login: undefined;
	Submit: undefined;
	Create: undefined;
	Nutrition: undefined;
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
			<Stack.Screen name="Submit" component={Submit} />
			<Stack.Screen name="Create" component={Create} />
			<Stack.Screen name="Nutrition" component={Nutrition} />
		</Stack.Navigator>
	);
}
