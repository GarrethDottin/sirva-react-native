import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Text, TouchableOpacity } from 'react-native';
import { RadioButtonInput } from 'react-native-simple-radio-button'
import { Colors } from '../Theme'
import styles from './Styles/ButtonStyles';

export default AppRadioInput = (props) => {   
    return (
        <RadioButtonInput
            obj={props.dataObj}
            index={props.index}
            isSelected={props.isSelected}
            onPress={(value, index) => { props.onPress(value, index) }}
            borderWidth={2}
            buttonInnerColor={props.isSelected ? Colors.white : 'transparent'}
            buttonOuterColor={props.isSelected ? Colors.darkBlue : Colors.white}
            buttonSize={8}
            buttonOuterSize={22}
            buttonStyle={{ backgroundColor: props.isSelected ? Colors.darkBlue : 'transparent' }} />
    )
}

AppRadioInput.propTypes = {
    dataObj: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    isSelected: PropTypes.bool,
    onPress: PropTypes.func,
}

AppRadioInput.defaultProps = {
    isSelected: false,
    onPress: () => {}
}
