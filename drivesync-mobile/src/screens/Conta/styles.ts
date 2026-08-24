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
    flexGrow: 1,
  },
  profileInfo: {
    flexDirection: 'row',  // Organiza os elementos em linha
    alignItems: 'center',  // Alinha verticalmente os itens no centro
    gap: theme.SPACING.MD,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: theme.RADIUS.PILL,
    backgroundColor: theme.COLORS.BRAND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    ...theme.TYPOGRAPHY.screenTitle,
    color: theme.COLORS.TEXT_INVERTED,
    textTransform: 'uppercase', // Garante que as iniciais estarão em maiúsculas
  },
  userDetails: {
    flex: 1,
    gap: 2,
  },
  userName: {
    ...theme.TYPOGRAPHY.sectionTitle,
    color: theme.COLORS.TEXT_PRIMARY,
  },
  userPosition: {
    ...theme.TYPOGRAPHY.caption,
    color: theme.COLORS.TEXT_SECONDARY,
  },
  section: {
    gap: theme.SPACING.SM,
  },
  infoCard: {
    paddingHorizontal: theme.SPACING.MD,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: theme.SPACING.LG,
  },
});

export default styles;
