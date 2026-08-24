import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import theme from '../../theme';

type Props = {
  label: string;
  value?: string | number | null;
  /** Texto exibido quando o valor está vazio. */
  fallback?: string;
  /** Remove a linha divisória inferior (último item da lista). */
  last?: boolean;
  style?: ViewStyle;
};

/** Par rótulo/valor usado nas telas de detalhe. */
export function InfoRow({ label, value, fallback = '—', last = false, style }: Props) {
  const isEmpty = value === null || value === undefined || value === '';

  return (
    <View style={[styles.row, !last && styles.divider, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, isEmpty && styles.valueEmpty]} numberOfLines={2}>
        {isEmpty ? fallback : String(value)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.SPACING.MD,
    paddingVertical: theme.SPACING.SM,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.COLORS.BORDER,
  },
  label: {
    ...theme.TYPOGRAPHY.body,
    color: theme.COLORS.TEXT_SECONDARY,
    flexShrink: 1,
  },
  value: {
    ...theme.TYPOGRAPHY.bodyStrong,
    color: theme.COLORS.TEXT_PRIMARY,
    flexShrink: 1,
    textAlign: 'right',
  },
  valueEmpty: {
    color: theme.COLORS.TEXT_TERTIARY,
  },
});

export default InfoRow;
