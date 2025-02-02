import { Redirect, Stack } from 'expo-router';

import Loading from '@/components/Loading';
import { useAuth } from '@/features/auth/hooks';

export default function AppLayout() {
  const { isLoadingUserStorageData, user } = useAuth();

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  if (!user?.id) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack screenOptions={{ headerShown: false }} initialRouteName="/" />;
}
