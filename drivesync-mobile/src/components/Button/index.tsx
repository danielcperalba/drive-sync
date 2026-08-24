import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';
export type ButtonSize = 'md' | 'sm';

type Props = PressableProps & {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  /** Ícone opcional (família Ionicons) exibido antes do texto. */
  icon?: keyof typeof Ionicons.glyphMap;
  /** Ícone opcional exibido depois do texto. */
  iconRight?: keyof typeof Ionicons.glyphMap;
  fullWidth?: boolean;
  style?: ViewStyle;
};

const VARIANTS: Record<
  ButtonVariant,
  { background: string; backgroundPressed: string; border: string; content: string }
> = {
  primary: {
    background: theme.COLORS.PRIMARY,
    backgroundPressed: theme.COLORS.PRIMARY_PRESSED,
    border: 'transparent',
    content: theme.COLORS.TEXT_INVERTED,
  },
  secondary: {
    background: theme.COLORS.SURFACE,
    backgroundPressed: theme.COLORS.SURFACE_STRONG,
    border: theme.COLORS.BORDER_STRONG,
    content: theme.COLORS.TEXT_PRIMARY,
  },
  destructive: {
    background: theme.COLORS.SURFACE,
    backgroundPressed: theme.COLORS.ERROR_SOFT,
    border: theme.COLORS.ERROR,
    content: theme.COLORS.ERROR,
  },
  ghost: {
    background: 'transparent',
    backgroundPressed: theme.COLORS.SURFACE_STRONG,
    border: 'transparent',
    content: theme.COLORS.TEXT_PRIMARY,
  },
};

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconRight,
  fullWidth = true,
  disabled,
  style,
  ...rest
}: Props) {
  const palette = VARIANTS[variant];
  const isDisabled = Boolean(disabled) || isLoading;
  const iconSize = size === 'sm' ? 16 : 18;

  const contentColor = isDisabled ? theme.COLORS.DISABLED_TEXT : palette.content;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        size === 'sm' ? styles.sizeSm : styles.sizeMd,
        fullWidth && styles.fullWidth,
        {
          backgroundColor: pressed ? palette.backgroundPressed : palette.background,
          borderColor: palette.border,
        },
        isDisabled && styles.disabled,
        isDisabled && variant === 'primary' && styles.disabledSolid,
        style,
      ]}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={contentColor} />
      ) : (
        <View style={styles.content}>
          {icon ? <Ionicons name={icon} size={iconSize} color={contentColor} /> : null}
          <Text numberOfLines={1} style={[styles.title, { color: contentColor }]}>
            {title}
          </Text>
          {iconRight ? <Ionicons name={iconRight} size={iconSize} color={contentColor} /> : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.RADIUS.MD,
    borderWidth: theme.BORDER_WIDTH.HAIRLINE,
    paddingHorizontal: theme.SPACING.MD,
  },
  sizeMd: {
    minHeight: theme.LAYOUT.CONTROL_HEIGHT,
  },
  sizeSm: {
    minHeight: theme.LAYOUT.CONTROL_HEIGHT_SM,
    paddingHorizontal: theme.SPACING.SM,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.SPACING.XS,
  },
  title: {
    ...theme.TYPOGRAPHY.button,
    textAlign: 'center',
  },
  disabled: {
    backgroundColor: theme.COLORS.DISABLED_BG,
    borderColor: theme.COLORS.DISABLED_BORDER,
  },
  disabledSolid: {
    backgroundColor: theme.COLORS.DISABLED_BG,
  },
});

export default Button;
