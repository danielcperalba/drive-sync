import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.COLORS.BACKGROUND,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end', // Alinha o conteúdo na parte inferior
  },
  content: {
    paddingHorizontal: theme.LAYOUT.SCREEN_PADDING,
    paddingTop: theme.SPACING.LG,
    gap: theme.SPACING.SM,
    /* A arte já termina em branco; a superfície garante contraste do texto
       mesmo em telas com proporção diferente da imagem. */
    backgroundColor: theme.COLORS.BACKGROUND,
  },
  title: {
    ...theme.TYPOGRAPHY.display,
    color: theme.COLORS.TEXT_PRIMARY,
  },
  subtitle: {
    ...theme.TYPOGRAPHY.body,
    color: theme.COLORS.TEXT_SECONDARY,
    maxWidth: 320,
  },
  action: {
    marginTop: theme.SPACING.SM,
  },
});

export default styles;
