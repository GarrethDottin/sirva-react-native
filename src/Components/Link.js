import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Text, TouchableOpacity } from 'react-native';
import styles from './Styles/LinkStyles';

export default Link = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.container, props.style]}>
            <Text style={[styles.buttonText, props.textStyle]}>{props.children}</Text>
        </TouchableOpacity>
    )
}

Link.propTypes = {
    onPress: PropTypes.func.isRequired,
    textStyle: PropTypes.any,
}