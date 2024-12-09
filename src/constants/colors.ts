import theme from '@/styles/theme';

interface ColorModel {
  [key: string]: string;
}

export const scheduleColors: ColorModel = {
  red: theme.colors.paleRed,
  orange: theme.colors.paleOrange,
  yellow: theme.colors.paleYellow,
  green: theme.colors.paleGreen,
  blue: theme.colors.paleBlue,
  purple: theme.colors.palePurple,
};
