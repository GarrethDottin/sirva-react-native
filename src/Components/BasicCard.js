import React from 'react';
import { View } from 'react-native';
import { Touchable } from './Touchable';
import S from '../StyleUtils';

export const BasicCard = (props) => {
    return (
        <Touchable onPress={ props.onPress }>
            <View style={ [S.p6, S.rounded, S.whiteBg, S.cardShadow, props.style] } >
            {props.children}
            </View>
        </Touchable>
    )
}
