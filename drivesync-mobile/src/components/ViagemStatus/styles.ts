import { StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.RADIUS.MD,
    borderWidth: theme.BORDER_WIDTH.HAIRLINE,
    borderColor: theme.COLORS.BORDER,
    backgroundColor: theme.COLORS.SURFACE,
  },
  cardPressed: {
    backgroundColor: theme.COLORS.SURFACE_VARIANT,
  },
  localizacaoWrapper: {
    padding: theme.SPACING.MD,
    paddingBottom: 0,
  },
  content: {
    padding: theme.SPACING.MD,
    gap: theme.SPACING.XS,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.SPACING.XS,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.SPACING.XS,
  },
  title: {
    ...theme.TYPOGRAPHY.sectionTitle,
    color: theme.COLORS.TEXT_PRIMARY,
    flexShrink: 1,
  },
  titlePending: {
    ...theme.TYPOGRAPHY.sectionTitle,
    color: theme.COLORS.TEXT_TERTIARY,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.SPACING.XS,
  },
  meta: {
    ...theme.TYPOGRAPHY.caption,
    color: theme.COLORS.TEXT_SECONDARY,
    flexShrink: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.SPACING.XS,
    paddingTop: theme.SPACING.SM,
    marginTop: theme.SPACING.XXS,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.COLORS.BORDER,
  },
  footerText: {
    ...theme.TYPOGRAPHY.label,
    color: theme.COLORS.TEXT_PRIMARY,
  },
});

export default styles;
