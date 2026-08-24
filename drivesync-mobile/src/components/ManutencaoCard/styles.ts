import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.SPACING.SM,
    padding: theme.SPACING.SM,
    marginBottom: theme.SPACING.XS,
    borderRadius: theme.RADIUS.MD,
    borderWidth: theme.BORDER_WIDTH.HAIRLINE,
    borderColor: theme.COLORS.BORDER,
    backgroundColor: theme.COLORS.SURFACE,
  },
  content: {
    flex: 1,
    gap: theme.SPACING.XXS,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.SPACING.XS,
  },
  title: {
    ...theme.TYPOGRAPHY.cardTitle,
    color: theme.COLORS.TEXT_PRIMARY,
    flexShrink: 1,
  },
  date: {
    ...theme.TYPOGRAPHY.caption,
    fontSize: theme.FONT_SIZE.XS,
    color: theme.COLORS.TEXT_TERTIARY,
  },
  overline: {
    ...theme.TYPOGRAPHY.overline,
    color: theme.COLORS.TEXT_TERTIARY,
  },
  description: {
    ...theme.TYPOGRAPHY.caption,
    color: theme.COLORS.TEXT_SECONDARY,
  },
});

export default styles;
