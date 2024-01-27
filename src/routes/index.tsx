/* eslint-disable import/extensions */
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Box, ToastProvider, useTheme } from 'native-base';
import { useAuth } from '@hooks/useAuth';
import Loading from '@components/Loading';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();
  const { colors } = useTheme();
  const theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: colors.gray[700] },
  };

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <ToastProvider>
      <Box flex={1} bg="gray.700">
        <NavigationContainer theme={theme}>
          {user.id ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
      </Box>
    </ToastProvider>
  );
}
