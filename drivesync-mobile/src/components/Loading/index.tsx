import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ViewStyle } from 'react-native';
import theme from '../../theme';

type Props = {
  /** Mensagem opcional exibida abaixo do indicador. */
  label?: string;
  size?: 'small' | 'large';
  style?: ViewStyle;
};

export function Loading({ label, size = 'large', style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={theme.COLORS.TEXT_TERTIARY} />
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.SPACING.LG,
    gap: theme.SPACING.SM,
    backgroundColor: theme.COLORS.BACKGROUND,
  },
  label: {
    ...theme.TYPOGRAPHY.caption,
    color: theme.COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
});

export default Loading;
