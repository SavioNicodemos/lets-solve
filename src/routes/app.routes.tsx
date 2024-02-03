/* eslint-disable import/extensions */
import { CreateProductDTO, IProductId, ProductDTO } from '@dtos/ProductDTO';
import { NavigatorScreenParams } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Ad } from '@screens/Ad';
import { AdPreview } from '@screens/AdPreview';
import { CreateAd } from '@screens/CreateAd';
import { Profile } from '@screens/Profile';
import { BottomTabRoutes, HomeRoutes } from './home.routes';

export type MainNavRoutes = {
  MainNav: NavigatorScreenParams<BottomTabRoutes>;
  createAd: {
    product?: ProductDTO;
  };
  ad: { productId: IProductId; isMyAd: boolean };
  adPreview: { product: CreateProductDTO };
  profile: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<MainNavRoutes>;

const Stack = createNativeStackNavigator<MainNavRoutes>();

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainNav" component={HomeRoutes} />
      <Stack.Screen name="createAd" component={CreateAd} />
      <Stack.Screen name="ad" component={Ad} />
      <Stack.Screen name="adPreview" component={AdPreview} />
      <Stack.Screen name="profile" component={Profile} />
    </Stack.Navigator>
  );
}
