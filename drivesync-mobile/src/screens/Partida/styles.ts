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
  section: {
    gap: theme.SPACING.SM,
  },
  checklistCard: {
    paddingVertical: 0,
  },
  fieldsGroup: {
    gap: theme.SPACING.SM,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: theme.SPACING.XS,
  },
  buttonRowItem: {
    flex: 1,
  },
  submit: {
    marginTop: theme.SPACING.XXS,
  },
});

export default styles;
