import { TextStyle, ViewStyle } from 'react-native';

/**
 * DriveSync — Design tokens
 *
 * Fonte única de verdade para cores, tipografia, espaçamento, raios e sombras.
 * A identidade do produto foi mantida: superfícies claras, ações em preto neutro
 * e o verde da marca reservado para status positivos e destaques pontuais.
 */

const COLORS = {
  /* Ação principal (herdada do preto já usado nos botões do app) */
  PRIMARY: '#16181D',
  PRIMARY_PRESSED: '#2B2F38',
  PRIMARY_SOFT: '#F2F4F7',

  /* Marca */
  BRAND: '#00875F',
  BRAND_LIGHT: '#00B37E',
  BRAND_SOFT: '#E7F6F0',

  /* Superfícies */
  BACKGROUND: '#FFFFFF',
  SURFACE: '#FFFFFF',
  SURFACE_VARIANT: '#F7F8FA',
  SURFACE_STRONG: '#EFF1F4',

  /* Texto */
  TEXT_PRIMARY: '#16181D',
  TEXT_SECONDARY: '#5B616E',
  TEXT_TERTIARY: '#8A909E',
  TEXT_INVERTED: '#FFFFFF',
  TEXT_DISABLED: '#AFB4BD',

  /* Bordas */
  BORDER: '#E4E7EC',
  BORDER_STRONG: '#D3D8E0',
  BORDER_FOCUS: '#00875F',

  /* Estados */
  SUCCESS: '#00875F',
  SUCCESS_SOFT: '#E7F6F0',
  WARNING: '#A85B08',
  WARNING_SOFT: '#FDF3E6',
  ERROR: '#C13B32',
  ERROR_SOFT: '#FBEDEC',
  INFO: '#2563C4',
  INFO_SOFT: '#EAF1FC',

  /* Desabilitado */
  DISABLED_BG: '#EFF1F4',
  DISABLED_BORDER: '#E4E7EC',
  DISABLED_TEXT: '#AFB4BD',

  OVERLAY: 'rgba(22, 24, 29, 0.45)',

  /* --- Aliases legados (mantidos para compatibilidade) --- */
  WHITE: '#FFFFFF',
  BRAND_MID: '#00875F',
  GRAY_100: '#F7F8FA',
  GRAY_200: '#EFF1F4',
  GRAY_300: '#E4E7EC',
  GRAY_400: '#AFB4BD',
  GRAY_500: '#8A909E',
  GRAY_600: '#5B616E',
  GRAY_700: '#3A3F48',
  GRAY_800: '#16181D',
} as const;

const FONT_FAMILY = {
  REGULAR: 'Roboto_400Regular',
  MEDIUM: 'Roboto_500Medium',
  BOLD: 'Roboto_700Bold',
} as const;

/** Escala tipográfica — passos previsíveis, sem tamanhos intermediários avulsos. */
const FONT_SIZE = {
  XS: 12,
  SM: 13,
  MD: 15,
  LG: 17,
  XL: 20,
  XXL: 24,
  XXXL: 28,
} as const;

/**
 * Estilos de texto reutilizáveis. Use com spread:
 *   { ...theme.TYPOGRAPHY.sectionTitle, color: ... }
 *
 * Observação: a hierarquia é feita por família (Regular/Medium/Bold) e não por
 * `fontWeight`, porque a combinação de fontFamily + fontWeight é inconsistente
 * no Android.
 */
const TYPOGRAPHY: Record<string, TextStyle> = {
  /** Título de destaque — onboarding, telas de entrada */
  display: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.XXXL,
    lineHeight: 34,
    letterSpacing: -0.4,
  },
  /** Título de tela */
  screenTitle: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.XXL,
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  /** Título de seção dentro de uma tela */
  sectionTitle: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.LG,
    lineHeight: 22,
    letterSpacing: -0.1,
  },
  /** Título de card / item de lista */
  cardTitle: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: FONT_SIZE.MD,
    lineHeight: 20,
  },
  /** Texto principal */
  body: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.MD,
    lineHeight: 21,
  },
  /** Texto principal com ênfase */
  bodyStrong: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: FONT_SIZE.MD,
    lineHeight: 21,
  },
  /** Texto secundário / auxiliar */
  caption: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.SM,
    lineHeight: 18,
  },
  /** Rótulo de campo e de métrica */
  label: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: FONT_SIZE.SM,
    lineHeight: 18,
  },
  /** Rótulo de agrupamento (maiúsculas) */
  overline: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  /** Valores numéricos em destaque */
  metric: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.XL,
    lineHeight: 26,
    letterSpacing: -0.3,
  },
  /** Texto de botão */
  button: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.MD,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
};

/** Escala de espaçamento base 4. */
const SPACING = {
  XXS: 4,
  XS: 8,
  SM: 12,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 40,
} as const;

const RADIUS = {
  XS: 6,
  SM: 8,
  MD: 12,
  LG: 16,
  PILL: 999,
} as const;

const BORDER_WIDTH = {
  HAIRLINE: 1,
  THICK: 2,
} as const;

/** Elevação discreta — separação por superfície e borda vem antes da sombra. */
const SHADOWS: Record<string, ViewStyle> = {
  NONE: {},
  SUBTLE: {
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  RAISED: {
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
};

/** Área de toque mínima confortável. */
const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 } as const;

const LAYOUT = {
  SCREEN_PADDING: SPACING.MD,
  CONTROL_HEIGHT: 48,
  CONTROL_HEIGHT_SM: 40,
  ICON_TILE: 44,
} as const;

export default {
  COLORS,
  FONT_FAMILY,
  FONT_SIZE,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  BORDER_WIDTH,
  SHADOWS,
  HIT_SLOP,
  LAYOUT,
};
