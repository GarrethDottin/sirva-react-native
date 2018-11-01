import React from 'react';
import { View, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';

export const Touchable = ({ children, onPress = null, highlight = false }) => {
    if (!onPress) {
        return (
            <View>
                {children}
            </View>
        )
    }

    if (highlight) {
        return (
            <TouchableHighlight underlayColor='transparent' onPress={onPress}>
                {children}
            </TouchableHighlight>
        )
    } else {
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                {children}
            </TouchableWithoutFeedback>
        )
    }
}
