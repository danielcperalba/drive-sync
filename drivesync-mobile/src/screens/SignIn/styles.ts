import { StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.BACKGROUND,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: theme.LAYOUT.SCREEN_PADDING,
    paddingVertical: theme.SPACING.XL,
    gap: theme.SPACING.LG,
  },
  header: {
    gap: theme.SPACING.XXS,
  },
  title: {
    ...theme.TYPOGRAPHY.screenTitle,
    color: theme.COLORS.TEXT_PRIMARY,
  },
  subtitle: {
    ...theme.TYPOGRAPHY.body,
    color: theme.COLORS.TEXT_SECONDARY,
  },
  form: {
    gap: theme.SPACING.MD,
  },
});

export default styles;
