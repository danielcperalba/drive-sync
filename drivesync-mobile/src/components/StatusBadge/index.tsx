import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import theme from '../../theme';

export type StatusTone = 'neutral' | 'success' | 'warning' | 'error' | 'info';

type Props = {
  label: string;
  tone?: StatusTone;
  /** Exibe o ponto indicador antes do texto. */
  dot?: boolean;
  style?: ViewStyle;
};

const TONES: Record<StatusTone, { background: string; content: string }> = {
  neutral: { background: theme.COLORS.SURFACE_STRONG, content: theme.COLORS.TEXT_SECONDARY },
  success: { background: theme.COLORS.SUCCESS_SOFT, content: theme.COLORS.SUCCESS },
  warning: { background: theme.COLORS.WARNING_SOFT, content: theme.COLORS.WARNING },
  error: { background: theme.COLORS.ERROR_SOFT, content: theme.COLORS.ERROR },
  info: { background: theme.COLORS.INFO_SOFT, content: theme.COLORS.INFO },
};

/** Traduz o status de um veículo para o tom visual correspondente. */
export function veiculoStatusTone(status?: string): StatusTone {
  switch (status) {
    case 'Em uso':
      return 'warning';
    case 'Em manutenção':
    case 'Manutenção':
      return 'error';
    case 'Disponível':
      return 'success';
    default:
      return 'neutral';
  }
}

export function StatusBadge({ label, tone = 'neutral', dot = true, style }: Props) {
  const palette = TONES[tone];

  return (
    <View style={[styles.container, { backgroundColor: palette.background }, style]}>
      {dot ? <View style={[styles.dot, { backgroundColor: palette.content }]} /> : null}
      <Text numberOfLines={1} style={[styles.label, { color: palette.content }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: theme.SPACING.XXS + 2,
    paddingVertical: 5,
    paddingHorizontal: theme.SPACING.XS + 2,
    borderRadius: theme.RADIUS.PILL,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    ...theme.TYPOGRAPHY.label,
    fontSize: theme.FONT_SIZE.XS,
    lineHeight: 16,
  },
});

export default StatusBadge;
