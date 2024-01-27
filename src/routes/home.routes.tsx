/* eslint-disable react/no-unstable-nested-components */
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { Home } from '@screens/Home';
import { MyAds } from '@screens/MyAds';
import { useTheme, Pressable } from 'native-base';
import { Octicons } from '@expo/vector-icons';
import { useAuth } from '@hooks/useAuth';

export type BottomTabRoutes = {
  home: undefined;
  myAds: undefined;
  logout: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<BottomTabRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<BottomTabRoutes>();

function LogoutComponent() {
  return null;
}

export function HomeRoutes() {
  const { signOut } = useAuth();
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

      <Screen
        name="logout"
        component={LogoutComponent}
        options={{
          tabBarButton: () => (
            <Pressable
              pt="3"
              pr="4"
              onPress={() => signOut()}
              _pressed={{ opacity: 0.5 }}
            >
              <Octicons
                name="sign-out"
                color={colors.red[300]}
                size={iconSize}
              />
            </Pressable>
          ),
        }}
      />
    </Navigator>
  );
}
