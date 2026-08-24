// App.tsx
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { AuthProvider } from "./src/contexts/auth";
import Routes from "./src/routes";
import { Loading } from "./src/components/Loading";
import theme from "./src/theme";

/** Alinha o fundo padrão do React Navigation à superfície do app. */
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.COLORS.BACKGROUND,
    card: theme.COLORS.SURFACE,
    text: theme.COLORS.TEXT_PRIMARY,
    border: theme.COLORS.BORDER,
    primary: theme.COLORS.PRIMARY,
  },
};

const App: React.FC = () => {
  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  // Se a fonte falhar, o app segue com a fonte do sistema em vez de travar.
  const podeRenderizar = fontsLoaded || Boolean(fontError);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {podeRenderizar ? (
          <NavigationContainer theme={navigationTheme}>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </NavigationContainer>
        ) : (
          <Loading />
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
