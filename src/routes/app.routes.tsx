/* eslint-disable import/extensions */
import {
  ComplaintDTO,
  CreateComplaintDTO,
  IComplaintId,
} from '@dtos/ComplaintDTO';
import { NavigatorScreenParams } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { Ad } from '@screens/Ad';
import { AdPreview } from '@screens/AdPreview';
import { CreateAd } from '@screens/CreateAd';
import { Profile } from '@screens/Profile';
import { BottomTabRoutes, HomeRoutes } from './home.routes';

export type MainNavRoutes = {
  MainNav: NavigatorScreenParams<BottomTabRoutes>;
  createAd: {
    complaint?: ComplaintDTO;
  };
  ad: { complaintId: IComplaintId; isMyAd: boolean };
  adPreview: { complaint: CreateComplaintDTO };
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
