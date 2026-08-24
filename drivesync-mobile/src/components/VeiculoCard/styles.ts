// src/components/VeiculoCard/styles.ts
import { StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.SPACING.SM,
    padding: theme.SPACING.SM,
    marginBottom: theme.SPACING.XS,
    borderRadius: theme.RADIUS.MD,
    borderWidth: theme.BORDER_WIDTH.HAIRLINE,
    borderColor: theme.COLORS.BORDER,
    backgroundColor: theme.COLORS.SURFACE,
  },
  cardPressed: {
    backgroundColor: theme.COLORS.SURFACE_VARIANT,
  },
  content: {
    flex: 1,
    gap: theme.SPACING.XXS,
  },
  title: {
    ...theme.TYPOGRAPHY.cardTitle,
    color: theme.COLORS.TEXT_PRIMARY,
  },
  subtitle: {
    ...theme.TYPOGRAPHY.caption,
    color: theme.COLORS.TEXT_SECONDARY,
  },
  badgeRow: {
    marginTop: theme.SPACING.XXS / 2,
  },
});

export default styles;
