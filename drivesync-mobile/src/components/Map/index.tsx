// MapScreen.js
//
// NÃO ESTÁ EM USO. O app passou a exibir o endereço atual em um card
// (components/LocalizacaoCard) porque, no Expo Go, os tiles do Google Maps não
// carregam — a chave da API é a do próprio Expo Go e não pode ser substituída.
// Este componente foi mantido funcional para o dia em que houver um
// development build com chave própria: basta voltar a importá-lo.
import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import theme from '../../theme';

export default function MapScreen({ location, height = 180, style }) {
  // Estado de carregamento: mantém o espaço do mapa reservado enquanto a
  // localização não chega, evitando "pulos" no layout.
  if (!location) {
    return (
      <View style={[styles.container, styles.placeholder, { height }, style]}>
        <ActivityIndicator size="small" color={theme.COLORS.TEXT_TERTIARY} />
        <Text style={styles.placeholderText}>Obtendo localização...</Text>
      </View>
    );
  }

  const { latitude, longitude } = location.coords ?? {};

  return (
    <View style={[styles.container, { height }, style]}>
      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        // A posição não muda depois de obtida, então o mapa não precisa ser
        // controlado — `initialRegion` evita reposicionar a cada renderização.
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="Minha localização" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  /**
   * Atenção: nada de `borderRadius` + `overflow: 'hidden'` aqui.
   * No Android o Google Maps desenha num SurfaceView, que o sistema compõe
   * fora da árvore de views e ignora recorte arredondado do pai — o mapa sai
   * todo preto. Por isso a moldura é só a borda, sem raio e sem clipping.
   */
  container: {
    width: '100%',
    borderWidth: theme.BORDER_WIDTH.HAIRLINE,
    borderColor: theme.COLORS.BORDER,
    backgroundColor: theme.COLORS.SURFACE_VARIANT,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.SPACING.XS,
  },
  placeholderText: {
    ...theme.TYPOGRAPHY.caption,
    color: theme.COLORS.TEXT_SECONDARY,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
