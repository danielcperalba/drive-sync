import { StyleSheet } from "react-native";
import theme from "../../theme";

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
  header: {
    gap: 2,
  },
  greeting: {
    ...theme.TYPOGRAPHY.screenTitle,
    color: theme.COLORS.TEXT_PRIMARY,
  },
  greetingSubtitle: {
    ...theme.TYPOGRAPHY.caption,
    color: theme.COLORS.TEXT_SECONDARY,
  },
  section: {
    gap: theme.SPACING.SM,
  },
  tileRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.SPACING.SM,
  },
});

export default styles;
