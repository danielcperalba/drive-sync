import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import theme from '../../theme';

type Props = {
  children: ReactNode;
  /**
   * `outlined` (padrão): superfície branca com borda discreta.
   * `filled`: superfície levemente tonalizada, sem borda — para blocos agrupados.
   */
  variant?: 'outlined' | 'filled';
  /** Remove o padding interno quando o conteúdo controla o próprio espaçamento. */
  noPadding?: boolean;
  style?: ViewStyle | ViewStyle[];
};

export function Card({ children, variant = 'outlined', noPadding = false, style }: Props) {
  return (
    <View
      style={[
        styles.base,
        variant === 'filled' ? styles.filled : styles.outlined,
        !noPadding && styles.padded,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
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
  padded: {
    padding: theme.SPACING.MD,
  },
});

export default Card;
