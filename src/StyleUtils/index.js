import { StyleSheet } from 'react-native';

import flexStyles from './flex';
import textColorStyles from './textColor';
import bgColorsStyles from './bgColor';
import fontSize from './fontSize';
import paddingStyles from './padding';
import marginStyles from './margin';
import shadowStyles from './shadow';
import borderRadiusStyles from './borderRadius';
import fontWeight from './fontWeight';
import border from './border';


const styles = {
  ...flexStyles,
  ...textColorStyles,
  ...bgColorsStyles,
  ...fontSize,
  ...paddingStyles,
  ...marginStyles,
  ...shadowStyles,
  ...borderRadiusStyles,
  ...fontWeight,
  ...border
};

console.log(styles);

export default StyleSheet.create(styles);
