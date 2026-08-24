import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';

type Props = {
  name: keyof typeof Ionicons.glyphMap;
  /** `soft` (padrão) para listas; `solid` para destaque pontual. */
  variant?: 'soft' | 'solid';
  size?: number;
  style?: ViewStyle;
};

/** Quadrado com ícone usado como marcador visual em cards e listas. */
export function IconTile({ name, variant = 'soft', size = theme.LAYOUT.ICON_TILE, style }: Props) {
  const isSolid = variant === 'solid';

  return (
    <View
      style={[
        styles.tile,
        {
          width: size,
          height: size,
          backgroundColor: isSolid ? theme.COLORS.BRAND : theme.COLORS.BRAND_SOFT,
          borderColor: 'transparent',
        },
        style,
      ]}
    >
      <Ionicons
        name={name}
        size={Math.round(size * 0.5)}
        color={isSolid ? theme.COLORS.TEXT_INVERTED : theme.COLORS.BRAND}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: theme.RADIUS.MD,
    borderWidth: theme.BORDER_WIDTH.HAIRLINE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconTile;
