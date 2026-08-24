import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';

type Tone = 'info' | 'warning' | 'error' | 'success';

type Props = {
  message: string;
  tone?: Tone;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
};

const TONES: Record<Tone, { background: string; content: string; icon: keyof typeof Ionicons.glyphMap }> = {
  info: { background: theme.COLORS.INFO_SOFT, content: theme.COLORS.INFO, icon: 'information-circle-outline' },
  warning: { background: theme.COLORS.WARNING_SOFT, content: theme.COLORS.WARNING, icon: 'alert-circle-outline' },
  error: { background: theme.COLORS.ERROR_SOFT, content: theme.COLORS.ERROR, icon: 'close-circle-outline' },
  success: { background: theme.COLORS.SUCCESS_SOFT, content: theme.COLORS.SUCCESS, icon: 'checkmark-circle-outline' },
};

/** Aviso curto e discreto, usado para contextualizar uma seção do formulário. */
export function Callout({ message, tone = 'info', icon, style }: Props) {
  const palette = TONES[tone];

  return (
    <View style={[styles.container, { backgroundColor: palette.background }, style]}>
      <Ionicons name={icon ?? palette.icon} size={16} color={palette.content} />
      <Text style={[styles.message, { color: palette.content }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.SPACING.XS,
    padding: theme.SPACING.SM,
    borderRadius: theme.RADIUS.SM,
  },
  message: {
    ...theme.TYPOGRAPHY.caption,
    flex: 1,
  },
});

export default Callout;
