import { StyleSheet } from "react-native";
import theme from "../../../theme";

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
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.SPACING.SM,
  },
  identityTexts: {
    flex: 1,
    gap: theme.SPACING.XXS,
  },
  title: {
    ...theme.TYPOGRAPHY.screenTitle,
    color: theme.COLORS.TEXT_PRIMARY,
  },
  plate: {
    ...theme.TYPOGRAPHY.caption,
    color: theme.COLORS.TEXT_SECONDARY,
  },
  infoCard: {
    paddingHorizontal: theme.SPACING.MD,
  },
  section: {
    gap: theme.SPACING.SM,
  },
});

export default styles;
