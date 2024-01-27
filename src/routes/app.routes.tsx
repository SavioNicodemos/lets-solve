/* eslint-disable import/extensions */
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { CreateAd } from '@screens/CreateAd';
import { Ad } from '@screens/Ad';
import { AdPreview } from '@screens/AdPreview';
import { NavigatorScreenParams } from '@react-navigation/native';
import { CreateProductDTO, IProductId, ProductDTO } from '@dtos/ProductDTO';
import { HomeRoutes, BottomTabRoutes } from './home.routes';

export type MainNavRoutes = {
  MainNav: NavigatorScreenParams<BottomTabRoutes>;
  createAd: {
    product?: ProductDTO;
  };
  ad: { productId: IProductId; isMyAd: boolean };
  adPreview: { product: CreateProductDTO };
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
    </Stack.Navigator>
  );
}
