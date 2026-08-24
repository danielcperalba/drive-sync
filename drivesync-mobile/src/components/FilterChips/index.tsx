import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, ViewStyle } from 'react-native';
import theme from '../../theme';

export type FilterOption<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  options: FilterOption<T>[];
  selected: T;
  onSelect: (value: T) => void;
  style?: ViewStyle;
};

/** Filtros em linha, roláveis horizontalmente para não quebrar em telas estreitas. */
export function FilterChips<T>({ options, selected, onSelect, style }: Props<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={style}
    >
      {options.map((option) => {
        const isSelected = option.value === selected;

        return (
          <Pressable
            key={String(option.label)}
            onPress={() => onSelect(option.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            style={({ pressed }) => [
              styles.chip,
              isSelected && styles.chipSelected,
              pressed && !isSelected && styles.chipPressed,
            ]}
          >
            <Text style={[styles.label, isSelected && styles.labelSelected]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: theme.SPACING.XS,
    paddingVertical: theme.SPACING.XXS,
    paddingHorizontal: theme.LAYOUT.SCREEN_PADDING,
  },
  chip: {
    minHeight: 36,
    justifyContent: 'center',
    paddingHorizontal: theme.SPACING.SM,
    borderRadius: theme.RADIUS.PILL,
    borderWidth: theme.BORDER_WIDTH.HAIRLINE,
    borderColor: theme.COLORS.BORDER,
    backgroundColor: theme.COLORS.SURFACE,
  },
  chipPressed: {
    backgroundColor: theme.COLORS.SURFACE_VARIANT,
  },
  chipSelected: {
    backgroundColor: theme.COLORS.BRAND,
    borderColor: theme.COLORS.BRAND,
  },
  label: {
    ...theme.TYPOGRAPHY.label,
    color: theme.COLORS.TEXT_SECONDARY,
  },
  labelSelected: {
    color: theme.COLORS.TEXT_INVERTED,
  },
});

export default FilterChips;
