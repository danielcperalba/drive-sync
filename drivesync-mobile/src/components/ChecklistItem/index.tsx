import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';

type Props = {
  label: string;
  checked: boolean;
  onToggle: () => void;
  /** Remove a linha divisória inferior (último item da lista). */
  last?: boolean;
};

/** Item de checklist com área de toque completa e estado visual explícito. */
export function ChecklistItem({ label, checked, onToggle, last = false }: Props) {
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.row,
        !last && styles.divider,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <Ionicons name="checkmark" size={14} color={theme.COLORS.TEXT_INVERTED} /> : null}
      </View>
      <Text style={[styles.label, checked && styles.labelChecked]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.SPACING.SM,
    minHeight: theme.LAYOUT.CONTROL_HEIGHT,
    paddingVertical: theme.SPACING.XS,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.COLORS.BORDER,
  },
  pressed: {
    opacity: 0.6,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: theme.RADIUS.XS,
    borderWidth: 1.5,
    borderColor: theme.COLORS.BORDER_STRONG,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.SURFACE,
  },
  boxChecked: {
    backgroundColor: theme.COLORS.SUCCESS,
    borderColor: theme.COLORS.SUCCESS,
  },
  label: {
    ...theme.TYPOGRAPHY.body,
    color: theme.COLORS.TEXT_PRIMARY,
    flex: 1,
  },
  labelChecked: {
    color: theme.COLORS.TEXT_PRIMARY,
  },
});

export default ChecklistItem;
