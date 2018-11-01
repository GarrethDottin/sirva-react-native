const sizes = {
  textBase: 16,
  textXxs: 10,
  textXs: 12,
  textSm: 14,
  textMd: 18,
  textLg: 20,
  textXl: 24,
  text2XL: 30
}

const styles = Object.keys(sizes).reduce((accum, sizeKey)=> {
  return {
    ...accum,
    [sizeKey]: {
      fontSize: sizes[sizeKey]
    } 
  };
}, {})

export default styles;