import { StyleSheet } from 'react-native';
import { Colors } from '../Theme';

const widthSizes = {
    'Hair': StyleSheet.hairlineWidth,
    '': 1,
    '1': 1,
    '2': 2,
    '4': 4,
    '8': 8
}

const sides = {
    '': '',
    't': 'Top',
    'r': 'Right',
    'b': 'Bottom',
    'l': 'Left'
}

const borderWidthStyles = Object.keys(widthSizes).reduce((accum, widthKey)=> {
    const value = widthSizes[widthKey];
    return Object.keys(sides).reduce((accum, sideKey) => {
        const sideProp = sides[sideKey];
        return {
            ...accum,
            [`border${sideKey}${widthKey}`]: {
                [`border${sideProp}Width`]: value
            }
        }
    }, accum)
}, {})

const borderColorStyles = Object.keys(Colors).reduce((accum, colorKey)=> {
    const value = Colors[colorKey];
    return Object.keys(sides).reduce((accum, sideKey) => {
        const sideProp = sides[sideKey];
        return {
            ...accum,
            [`${colorKey}Border${sideKey}`]: {
                [`border${sideProp}Color`]: value
            }
        }
    }, accum)
}, {})


export default {
    ...borderWidthStyles,
    ...borderColorStyles
}