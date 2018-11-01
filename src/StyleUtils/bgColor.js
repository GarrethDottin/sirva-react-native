import colors from '../Theme/Colors';

const colorRules = Object.keys(colors).reduce((accum, color)=> {
  return {
    ...accum,
    [`${color}Bg`]: {
      backgroundColor: colors[color]
    }
  }
}, {})

export default colorRules;
