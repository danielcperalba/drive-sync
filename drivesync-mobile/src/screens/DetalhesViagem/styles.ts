import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.BACKGROUND,
  },
  content: {
    paddingHorizontal: theme.LAYOUT.SCREEN_PADDING,
    paddingTop: theme.SPACING.MD,
    paddingBottom: theme.SPACING.XL,
    gap: theme.SPACING.LG,
  },
  section: {
    gap: theme.SPACING.SM,
  },
  infoCard: {
    paddingHorizontal: theme.SPACING.MD,
  },

  /* Trajeto */
  stop: {
    flexDirection: 'row',
    gap: theme.SPACING.SM,
  },
  stopMarker: {
    alignItems: 'center',
    paddingTop: 2,
  },
  stopLine: {
    flex: 1,
    width: StyleSheet.hairlineWidth,
    backgroundColor: theme.COLORS.BORDER_STRONG,
    marginTop: theme.SPACING.XXS,
  },
  stopContent: {
    flex: 1,
    gap: theme.SPACING.XXS,
    paddingBottom: theme.SPACING.MD,
  },
  stopLabel: {
    ...theme.TYPOGRAPHY.overline,
    color: theme.COLORS.TEXT_TERTIARY,
  },
  stopTitle: {
    ...theme.TYPOGRAPHY.bodyStrong,
    color: theme.COLORS.TEXT_PRIMARY,
  },
  stopMeta: {
    ...theme.TYPOGRAPHY.caption,
    color: theme.COLORS.TEXT_SECONDARY,
  },
  stopNote: {
    ...theme.TYPOGRAPHY.caption,
    color: theme.COLORS.TEXT_SECONDARY,
    fontStyle: 'italic',
  },

  /* Comparativo do diagnóstico */
  diagnosticoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.SPACING.SM,
    paddingBottom: theme.SPACING.XS,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.COLORS.BORDER,
  },
  diagnosticoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.SPACING.SM,
  },
  diagnosticoDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.COLORS.BORDER,
  },
  colLabel: {
    flex: 1.4,
    paddingRight: theme.SPACING.XS,
  },
  colValue: {
    flex: 1,
    alignItems: 'flex-end',
  },
  columnTitle: {
    ...theme.TYPOGRAPHY.overline,
    color: theme.COLORS.TEXT_TERTIARY,
    textAlign: 'right',
  },
  metricLabel: {
    ...theme.TYPOGRAPHY.body,
    color: theme.COLORS.TEXT_SECONDARY,
  },
  metricValue: {
    ...theme.TYPOGRAPHY.bodyStrong,
    color: theme.COLORS.TEXT_PRIMARY,
  },
  metricValueEmpty: {
    ...theme.TYPOGRAPHY.bodyStrong,
    color: theme.COLORS.TEXT_TERTIARY,
  },
});

export default styles;
