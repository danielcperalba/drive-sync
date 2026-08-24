// src/routes/app.routes.tsx
import React from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import theme from '../theme';
import Viagem from '../screens/Partida';
import MinhaConta from '../screens/Conta';
import Atividades from '../screens/Atividades';
import Veiculo from '../screens/Veiculos';
import DetalhesVeiculo from '../screens/Veiculos/Detalhes';
import Home from '../screens/Home';
import DetalhesViagem from '../screens/DetalhesViagem';
import EncerrarViagem from '../screens/Chegada';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const headerSurface = {
  backgroundColor: theme.COLORS.SURFACE,
  elevation: 0,
  shadowOpacity: 0,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: theme.COLORS.BORDER,
};

/** Cabeçalho das telas internas (com botão voltar). */
const stackScreenOptions: StackNavigationOptions = {
  headerStyle: headerSurface,
  headerTintColor: theme.COLORS.TEXT_PRIMARY,
  headerTitleStyle: {
    ...theme.TYPOGRAPHY.sectionTitle,
    color: theme.COLORS.TEXT_PRIMARY,
  },
  headerTitleAlign: Platform.OS === 'ios' ? 'center' : 'left',
  // v7: substitui o antigo `headerBackTitleVisible: false` — só a seta, sem rótulo.
  headerBackButtonDisplayMode: 'minimal',
  cardStyle: { backgroundColor: theme.COLORS.BACKGROUND },
};

/**
 * O cabeçalho da aba só aparece na tela raiz da pilha — nas telas internas
 * quem identifica o contexto é o cabeçalho da própria pilha (com o voltar).
 */
const hideTabHeaderOnNestedScreens =
  (rootRouteName: string) =>
  ({ route }: { route: any }): BottomTabNavigationOptions => ({
    headerShown: (getFocusedRouteNameFromRoute(route) ?? rootRouteName) === rootRouteName,
  });

const VeiculoStack = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen
      name="Veiculos"
      component={Veiculo}
      options={{ title: 'Veículos', headerShown: false }}
    />
    <Stack.Screen
      name="DetalhesVeiculo"
      component={DetalhesVeiculo}
      options={{ title: 'Detalhes do veículo' }}
    />
  </Stack.Navigator>
);

const ViagemStack = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen
      name="Atividade"
      component={Atividades}
      options={{ title: 'Atividades', headerShown: false }}
    />
    <Stack.Screen
      name="DetalhesViagem"
      component={DetalhesViagem}
      options={{ title: 'Detalhes da viagem' }}
    />
    <Stack.Screen
      name="EncerrarViagem"
      component={EncerrarViagem}
      options={{ title: 'Encerrar viagem' }}
    />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ title: 'Início', headerShown: false }}
    />
    <Stack.Screen
      name="EncerrarViagem"
      component={EncerrarViagem}
      options={{ title: 'Encerrar viagem' }}
    />
  </Stack.Navigator>
);

/** Ícone da aba: contorno quando inativo, preenchido quando ativo. */
const tabIcon =
  (outline: keyof typeof Ionicons.glyphMap, filled: keyof typeof Ionicons.glyphMap, size = 22) =>
  ({ color, focused }: { color: string; focused: boolean }) =>
    <Ionicons name={focused ? filled : outline} size={size} color={color} />;

/** Altura útil da barra, acima da área reservada ao sistema. */
const TAB_BAR_CONTENT_HEIGHT = 56;

const AppRoutes: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
  <>
    <StatusBar backgroundColor={theme.COLORS.SURFACE} barStyle="dark-content" />
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.COLORS.BRAND,
        tabBarInactiveTintColor: theme.COLORS.TEXT_TERTIARY,
        tabBarStyle: {
          backgroundColor: theme.COLORS.SURFACE,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: theme.COLORS.BORDER,
          elevation: 0,
          /* A altura precisa somar o inset do sistema: no Android com
             edge-to-edge a barra de gestos fica por cima da tab bar. */
          height: TAB_BAR_CONTENT_HEIGHT + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarLabelStyle: {
          fontFamily: theme.FONT_FAMILY.MEDIUM,
          fontSize: 11,
          letterSpacing: 0.1,
        },
        tabBarShowLabel: true,
        headerStyle: headerSurface,
        headerTintColor: theme.COLORS.TEXT_PRIMARY,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          ...theme.TYPOGRAPHY.screenTitle,
          color: theme.COLORS.TEXT_PRIMARY,
        },
      }}
    >
      <Tab.Screen
        name="Início"
        component={HomeStack}
        options={(props) => ({
          ...hideTabHeaderOnNestedScreens('Home')(props),
          tabBarIcon: tabIcon('home-outline', 'home'),
          title: 'Início',
        })}
      />
      <Tab.Screen
        name="Atividades"
        component={ViagemStack}
        options={(props) => ({
          ...hideTabHeaderOnNestedScreens('Atividade')(props),
          tabBarIcon: tabIcon('list-outline', 'list'),
          title: 'Atividades',
        })}
      />
      <Tab.Screen
        name="Nova Viagem"
        component={Viagem}
        options={{
          tabBarIcon: tabIcon('add-circle-outline', 'add-circle', 26),
          title: 'Nova viagem',
        }}
      />
      <Tab.Screen
        name="Veículos"
        component={VeiculoStack}
        options={(props) => ({
          ...hideTabHeaderOnNestedScreens('Veiculos')(props),
          tabBarIcon: tabIcon('bus-outline', 'bus'),
          title: 'Veículos',
        })}
      />
      <Tab.Screen
        name="Minha Conta"
        component={MinhaConta}
        options={{
          tabBarIcon: tabIcon('person-outline', 'person'),
          title: 'Conta',
        }}
      />
    </Tab.Navigator>
  </>
  );
};

export default AppRoutes;
