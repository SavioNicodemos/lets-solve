import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainNavRoutes } from '@routes/app.routes';
import { BottomTabRoutes } from '@routes/home.routes';

export type INavigationRoutes = CompositeScreenProps<
  NativeStackScreenProps<MainNavRoutes>,
  BottomTabScreenProps<BottomTabRoutes>
>;

export type IAdDetailsRoutes = CompositeScreenProps<
  NativeStackScreenProps<MainNavRoutes, 'ad'>,
  BottomTabScreenProps<BottomTabRoutes>
>;

export type IAdPreviewRoutes = CompositeScreenProps<
  NativeStackScreenProps<MainNavRoutes, 'adPreview'>,
  BottomTabScreenProps<BottomTabRoutes>
>;

export type ICreateAdRoutes = CompositeScreenProps<
  NativeStackScreenProps<MainNavRoutes, 'createAd'>,
  BottomTabScreenProps<BottomTabRoutes>
>;
