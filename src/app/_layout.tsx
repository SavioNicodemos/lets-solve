import {
  Karla_400Regular as Karla400Regular,
  Karla_700Bold as Karla700Bold,
  useFonts,
} from '@expo-google-fonts/karla';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, ToastProvider } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Loading from '@/components/Loading';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { ReactQueryContext } from '@/contexts/ReactQueryContext';
import THEME from '@/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla400Regular, Karla700Bold });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={THEME}>
        <ReactQueryContext>
          <ToastProvider>
            <AuthContextProvider>
              <StatusBar backgroundColor="transparent" translucent />
              {fontsLoaded ? <Slot /> : <Loading />}
            </AuthContextProvider>
          </ToastProvider>
        </ReactQueryContext>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
