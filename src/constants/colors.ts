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

export const schedulePickerColors: ColorModel = {
  red: theme.pickerColors.paleRed,
  orange: theme.pickerColors.paleOrange,
  yellow: theme.pickerColors.paleYellow,
  green: theme.pickerColors.paleGreen,
  blue: theme.pickerColors.paleBlue,
  purple: theme.pickerColors.palePurple,
};
