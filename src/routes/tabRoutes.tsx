import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";

import Home from "../screens/Home/home";
import Recipes from "../screens/Recipes/recipes";
import Maps from "../screens/Maps/maps";
import Statistics from "../screens/Statistics/statistics";
import Profile from "../screens/Profile/profile";

const Tab = createBottomTabNavigator();

type TabNavigation = {
  Home: undefined;
  Recipes: undefined;
  Maps: undefined;
  Statistics: undefined;
  Profile: undefined;
};

export type TabTypes = BottomTabNavigationProp<TabNavigation>;

const TabComponent = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
          tabBarLabel: () => null,
          tabBarActiveTintColor: "#048c4c",
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={Recipes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="book-open" color={color} size={size} />
          ),
          tabBarLabel: () => null,
          tabBarActiveTintColor: "#048c4c",
        }}
      />
      <Tab.Screen
        name="Maps"
        component={Maps}
        options={{
          tabBarIcon: ({ size }) => (
            <Feather name="map-pin" color={"#fff"} size={size} />
          ),
          tabBarLabel: () => null,
          tabBarActiveTintColor: "#048c4c",
          tabBarIconStyle: {
            backgroundColor: "#00F180",
            width: 50,
            height: 50,
            borderRadius: 50,
          },
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="bar-chart-2" color={color} size={size} />
          ),
          tabBarLabel: () => null,
          tabBarActiveTintColor: "#048c4c",
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
          tabBarLabel: () => null,
          tabBarActiveTintColor: "#048c4c",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabComponent;
