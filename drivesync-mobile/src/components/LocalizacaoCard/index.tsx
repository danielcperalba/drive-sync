import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ViewStyle } from 'react-native';
import theme from '../../theme';
import IconTile from '../IconTile';

type Props = {
  /** Endereço já convertido a partir das coordenadas. */
  endereco?: string | null;
  /** Objeto do expo-location. Enquanto for nulo, o card fica em carregamento. */
  location?: any;
  /** Rótulo do bloco. */
  titulo?: string;
  /**
   * `outlined` (padrão) quando o card aparece sozinho na tela;
   * `filled` quando está aninhado dentro de outro card.
   */
  variant?: 'outlined' | 'filled';
  style?: ViewStyle;
};

/** Formata as coordenadas com precisão suficiente (~1 m) sem poluir a leitura. */
const formatarCoordenadas = (location: any) => {
  const { latitude, longitude } = location?.coords ?? {};
  if (typeof latitude !== 'number' || typeof longitude !== 'number') return null;
  return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
};

/**
 * Mostra onde o usuário está no momento — substitui o mapa, que depende de uma
 * chave do Google Maps indisponível no Expo Go.
 */
export function LocalizacaoCard({
  endereco,
  location,
  titulo = 'Localização atual',
  variant = 'outlined',
  style,
}: Props) {
  const carregando = !location;
  const coordenadas = formatarCoordenadas(location);

  return (
    <View
      style={[
        styles.container,
        variant === 'filled' ? styles.filled : styles.outlined,
        style,
      ]}
    >
      {carregando ? (
        <>
          <View style={styles.spinnerBox}>
            <ActivityIndicator size="small" color={theme.COLORS.TEXT_TERTIARY} />
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>{titulo}</Text>
            <Text style={styles.pendente}>{endereco || 'Obtendo localização...'}</Text>
          </View>
        </>
      ) : (
        <>
          <IconTile name="location-outline" />
          <View style={styles.content}>
            <Text style={styles.label}>{titulo}</Text>
            <Text style={styles.endereco}>{endereco || 'Endereço não identificado'}</Text>
            {coordenadas ? <Text style={styles.coordenadas}>{coordenadas}</Text> : null}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.SPACING.SM,
    padding: theme.SPACING.MD,
    borderRadius: theme.RADIUS.MD,
  },
  outlined: {
    backgroundColor: theme.COLORS.SURFACE,
    borderWidth: theme.BORDER_WIDTH.HAIRLINE,
    borderColor: theme.COLORS.BORDER,
  },
  filled: {
    backgroundColor: theme.COLORS.SURFACE_VARIANT,
  },
  spinnerBox: {
    width: theme.LAYOUT.ICON_TILE,
    height: theme.LAYOUT.ICON_TILE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: 2,
  },
  label: {
    ...theme.TYPOGRAPHY.overline,
    color: theme.COLORS.TEXT_TERTIARY,
  },
  endereco: {
    ...theme.TYPOGRAPHY.bodyStrong,
    color: theme.COLORS.TEXT_PRIMARY,
  },
  pendente: {
    ...theme.TYPOGRAPHY.body,
    color: theme.COLORS.TEXT_SECONDARY,
  },
  coordenadas: {
    ...theme.TYPOGRAPHY.caption,
    fontSize: theme.FONT_SIZE.XS,
    color: theme.COLORS.TEXT_TERTIARY,
  },
});

export default LocalizacaoCard;
