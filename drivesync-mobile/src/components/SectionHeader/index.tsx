import React, { ReactNode } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import theme from '../../theme';

type Props = {
  title: string;
  /** Linha de apoio opcional abaixo do título. */
  subtitle?: string;
  /** Ação à direita (ex.: botão ghost). */
  action?: ReactNode;
  style?: ViewStyle;
};

export function SectionHeader({ title, subtitle, action, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.SPACING.SM,
    marginBottom: theme.SPACING.SM,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...theme.TYPOGRAPHY.sectionTitle,
    color: theme.COLORS.TEXT_PRIMARY,
  },
  subtitle: {
    ...theme.TYPOGRAPHY.caption,
    color: theme.COLORS.TEXT_SECONDARY,
  },
});

export default SectionHeader;
