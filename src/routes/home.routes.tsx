/* eslint-disable react/no-unstable-nested-components */
import { Octicons } from '@expo/vector-icons';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Home } from '@screens/Home';
import { MyAds } from '@screens/MyAds';
import { useTheme } from 'native-base';

export type BottomTabRoutes = {
  home: undefined;
  myAds: undefined;
  logout: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<BottomTabRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<BottomTabRoutes>();

export function HomeRoutes() {
  const { sizes, colors } = useTheme();
  const iconSize = sizes[6];
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[200],
        tabBarInactiveTintColor: colors.gray[400],
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="home" color={color} size={iconSize} />
          ),
        }}
      />

      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="tag" color={color} size={iconSize} />
          ),
        }}
      />
    </Navigator>
  );
}
