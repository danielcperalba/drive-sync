// auth.routes.tsx
import React from 'react';
import { Pressable, StatusBar, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import theme from '../theme';
import OnboardingScreen from '../screens/Inicial';
import SignIn from '../screens/SignIn';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <>
    <StatusBar backgroundColor={theme.COLORS.SURFACE} barStyle="dark-content" />
    <AuthStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: theme.COLORS.BACKGROUND },
      }}
    >
      <AuthStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }} // Oculta o cabeçalho para a tela de onboarding
      />
      <AuthStack.Screen
        name="Login"
        component={SignIn}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: theme.COLORS.SURFACE,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.COLORS.TEXT_PRIMARY,
          headerTitle: '', // Título removido
          headerLeftContainerStyle: { paddingLeft: theme.SPACING.XS },
          headerLeft: () => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Voltar"
              hitSlop={theme.HIT_SLOP}
              onPress={() => navigation.goBack()}
              style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
            >
              <Ionicons name="arrow-back" size={22} color={theme.COLORS.TEXT_PRIMARY} />
            </Pressable>
          ),
        })}
      />
    </AuthStack.Navigator>
  </>
);

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    borderRadius: theme.RADIUS.PILL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: {
    backgroundColor: theme.COLORS.SURFACE_STRONG,
  },
});

export default AuthRoutes;
