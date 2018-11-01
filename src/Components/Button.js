import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors } from '../Theme'
import styles from './Styles/ButtonStyles';

export default Button = (props) => {

    const inWorkingState = props.working
    let buttonStyles = props.type === "secondary" ? [styles.containerSecondary, props.style] : [styles.container, props.style]
    if (props.disabled) buttonStyles.push( { backgroundColor: Colors.xxLightGray })

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[buttonStyles, inWorkingState ? {backgroundColor: Colors.xxLightGray} : null]} 
        >
            {inWorkingState ?
                <ActivityIndicator size="large" color="#110080" /> :
                props.children 
                    ? props.children 
                    : <Text style={[props.type === "secondary" ? styles.buttonTextSecondary : styles.buttonText, props.labelStyle]}>{props.label}</Text>
            }
        </TouchableOpacity>
    )
}

Button.propTypes = {
    onPress: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
}

Button.defaultProps = {
    disabled: false,
}