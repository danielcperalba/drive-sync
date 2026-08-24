import React, { ReactNode } from 'react';
import { Platform, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../../theme';

type Props = {
  label?: string;
  selectedValue: any;
  onValueChange: (value: any, index: number) => void;
  helperText?: string;
  error?: string | null;
  enabled?: boolean;
  children: ReactNode;
  containerStyle?: ViewStyle;
};

/** Campo de seleção com a mesma moldura visual dos inputs de texto. */
export function SelectField({
  label,
  selectedValue,
  onValueChange,
  helperText,
  error,
  enabled = true,
  children,
  containerStyle,
}: Props) {
  const hasError = Boolean(error);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={[styles.field, hasError && styles.fieldError, !enabled && styles.fieldDisabled]}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          enabled={enabled}
          dropdownIconColor={theme.COLORS.TEXT_SECONDARY}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {children}
        </Picker>
      </View>

      {hasError ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}

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
    borderRadius: theme.RADIUS.MD,
    borderWidth: theme.BORDER_WIDTH.HAIRLINE,
    borderColor: theme.COLORS.BORDER,
    backgroundColor: theme.COLORS.SURFACE,
    justifyContent: 'center',
    overflow: 'hidden',
    minHeight: theme.LAYOUT.CONTROL_HEIGHT,
    paddingHorizontal: Platform.OS === 'ios' ? 0 : theme.SPACING.XXS,
  },
  fieldError: {
    borderColor: theme.COLORS.ERROR,
  },
  fieldDisabled: {
    backgroundColor: theme.COLORS.SURFACE_VARIANT,
  },
  picker: {
    color: theme.COLORS.TEXT_PRIMARY,
    backgroundColor: 'transparent',
  },
  pickerItem: {
    ...theme.TYPOGRAPHY.body,
    color: theme.COLORS.TEXT_PRIMARY,
  },
  errorText: {
    ...theme.TYPOGRAPHY.caption,
    fontSize: theme.FONT_SIZE.XS,
    color: theme.COLORS.ERROR,
  },
  helperText: {
    ...theme.TYPOGRAPHY.caption,
    fontSize: theme.FONT_SIZE.XS,
    color: theme.COLORS.TEXT_TERTIARY,
  },
});

export default SelectField;
