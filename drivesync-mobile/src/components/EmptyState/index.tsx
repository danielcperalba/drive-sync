import React, { ReactNode } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';

type Props = {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  /** Ação opcional (ex.: botão secundário). */
  action?: ReactNode;
  /** `card` desenha uma superfície tracejada; `plain` fica sem moldura. */
  variant?: 'card' | 'plain';
  style?: ViewStyle;
};

export function EmptyState({
  icon = 'information-circle-outline',
  title,
  description,
  action,
  variant = 'card',
  style,
}: Props) {
  return (
    <View style={[styles.container, variant === 'card' && styles.card, style]}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={22} color={theme.COLORS.TEXT_TERTIARY} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.SPACING.LG,
    paddingHorizontal: theme.SPACING.MD,
    gap: theme.SPACING.XS,
  },
  card: {
    backgroundColor: theme.COLORS.SURFACE_VARIANT,
    borderRadius: theme.RADIUS.MD,
    borderWidth: theme.BORDER_WIDTH.HAIRLINE,
    borderColor: theme.COLORS.BORDER,
  },
  iconCircle: {
    width: theme.LAYOUT.ICON_TILE,
    height: theme.LAYOUT.ICON_TILE,
    borderRadius: theme.RADIUS.PILL,
    backgroundColor: theme.COLORS.SURFACE_STRONG,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.SPACING.XXS,
  },
  title: {
    ...theme.TYPOGRAPHY.bodyStrong,
    color: theme.COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  description: {
    ...theme.TYPOGRAPHY.caption,
    color: theme.COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    maxWidth: 280,
  },
  action: {
    marginTop: theme.SPACING.XS,
  },
});

export default EmptyState;
