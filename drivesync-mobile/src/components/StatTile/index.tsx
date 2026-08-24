import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string | number;
  style?: ViewStyle;
};

/** Bloco de métrica: valor em destaque + rótulo curto. */
export function StatTile({ icon, label, value, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name={icon} size={18} color={theme.COLORS.BRAND} />
      <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      <Text style={styles.label} numberOfLines={2}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 120,
    gap: theme.SPACING.XXS,
    padding: theme.SPACING.SM,
    borderRadius: theme.RADIUS.MD,
    borderWidth: theme.BORDER_WIDTH.HAIRLINE,
    borderColor: theme.COLORS.BORDER,
    backgroundColor: theme.COLORS.SURFACE_VARIANT,
  },
  value: {
    ...theme.TYPOGRAPHY.metric,
    color: theme.COLORS.TEXT_PRIMARY,
    marginTop: theme.SPACING.XXS,
  },
  label: {
    ...theme.TYPOGRAPHY.caption,
    color: theme.COLORS.TEXT_SECONDARY,
  },
});

export default StatTile;
