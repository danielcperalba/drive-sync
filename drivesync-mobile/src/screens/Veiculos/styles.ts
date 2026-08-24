import { StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.BACKGROUND,
  },
  filters: {
    flexGrow: 0,
    paddingTop: theme.SPACING.SM,
    paddingBottom: theme.SPACING.XS,
  },
  listContent: {
    paddingHorizontal: theme.LAYOUT.SCREEN_PADDING,
    paddingTop: theme.SPACING.XS,
    paddingBottom: theme.SPACING.XL,
    flexGrow: 1,
  },
});

export default styles;
