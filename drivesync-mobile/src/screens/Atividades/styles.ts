import { StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.BACKGROUND,
  },
  listContent: {
    paddingHorizontal: theme.LAYOUT.SCREEN_PADDING,
    paddingTop: theme.SPACING.MD,
    paddingBottom: theme.SPACING.XL,
    flexGrow: 1,
  },
  header: {
    gap: theme.SPACING.SM,
    marginBottom: theme.SPACING.LG,
  },
  section: {
    gap: theme.SPACING.SM,
  },
});

export default styles;
