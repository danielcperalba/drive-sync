import React, { forwardRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';

type Props = TextInputProps & {
  label?: string;
  /** Texto de apoio exibido abaixo do campo. */
  helperText?: string;
  /** Mensagem de erro — substitui o texto de apoio e destaca a borda. */
  error?: string | null;
  /** Ícone à esquerda (família Ionicons). */
  icon?: keyof typeof Ionicons.glyphMap;
  /** Ícone à direita, opcionalmente clicável. */
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
};

export const Input = forwardRef<TextInput, Props>(function Input(
  {
    label,
    helperText,
    error,
    icon,
    rightIcon,
    onRightIconPress,
    containerStyle,
    editable = true,
    multiline,
    style,
    onFocus,
    onBlur,
    ...rest
  },
  ref
) {
  const [focused, setFocused] = useState(false);
  const hasError = Boolean(error);

  const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(false);
    onBlur?.(event);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.field,
          multiline && styles.fieldMultiline,
          focused && styles.fieldFocused,
          hasError && styles.fieldError,
          !editable && styles.fieldDisabled,
        ]}
      >
        {icon ? (
          <Ionicons
            name={icon}
            size={18}
            color={hasError ? theme.COLORS.ERROR : theme.COLORS.TEXT_TERTIARY}
          />
        ) : null}

        <TextInput
          ref={ref}
          style={[styles.input, multiline && styles.inputMultiline, style]}
          placeholderTextColor={theme.COLORS.TEXT_TERTIARY}
          editable={editable}
          multiline={multiline}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />

        {rightIcon ? (
          <Pressable
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            hitSlop={theme.HIT_SLOP}
            accessibilityRole={onRightIconPress ? 'button' : undefined}
          >
            <Ionicons name={rightIcon} size={18} color={theme.COLORS.TEXT_TERTIARY} />
          </Pressable>
        ) : null}
      </View>

      {hasError ? (
        <View style={styles.messageRow}>
          <Ionicons name="alert-circle" size={13} color={theme.COLORS.ERROR} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: theme.SPACING.XXS + 2,
  },
  label: {
    ...theme.TYPOGRAPHY.label,
    color: theme.COLORS.TEXT_SECONDARY,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.SPACING.XS + 2,
    minHeight: theme.LAYOUT.CONTROL_HEIGHT,
    paddingHorizontal: theme.SPACING.SM,
    borderRadius: theme.RADIUS.MD,
    borderWidth: theme.BORDER_WIDTH.HAIRLINE,
    borderColor: theme.COLORS.BORDER,
    backgroundColor: theme.COLORS.SURFACE,
  },
  fieldMultiline: {
    alignItems: 'flex-start',
    paddingVertical: theme.SPACING.SM,
    minHeight: 96,
  },
  fieldFocused: {
    borderColor: theme.COLORS.BORDER_FOCUS,
  },
  fieldError: {
    borderColor: theme.COLORS.ERROR,
    backgroundColor: theme.COLORS.ERROR_SOFT,
  },
  fieldDisabled: {
    backgroundColor: theme.COLORS.SURFACE_VARIANT,
    borderColor: theme.COLORS.BORDER,
  },
  input: {
    flex: 1,
    ...theme.TYPOGRAPHY.body,
    color: theme.COLORS.TEXT_PRIMARY,
    paddingVertical: 0,
  },
  inputMultiline: {
    textAlignVertical: 'top',
    minHeight: 72,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.SPACING.XXS,
  },
  errorText: {
    ...theme.TYPOGRAPHY.caption,
    fontSize: theme.FONT_SIZE.XS,
    color: theme.COLORS.ERROR,
    flex: 1,
  },
  helperText: {
    ...theme.TYPOGRAPHY.caption,
    fontSize: theme.FONT_SIZE.XS,
    color: theme.COLORS.TEXT_TERTIARY,
  },
});

export default Input;
