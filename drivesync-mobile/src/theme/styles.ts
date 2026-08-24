import { StyleSheet } from "react-native";
import theme from ".";

/** Estilos de layout compartilhados entre telas. */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.BACKGROUND,
    paddingHorizontal: theme.LAYOUT.SCREEN_PADDING,
    paddingTop: theme.SPACING.MD,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.COLORS.BACKGROUND,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.COLORS.BORDER,
    marginVertical: theme.SPACING.MD,
  },
});

export default styles;
