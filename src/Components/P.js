import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types'
import styles from './Styles/PStyles';

export default P = (props) => {
    return (
        <Text numberOfLines={props.numberOfLines} style={[styles.text, props.style]}>{props.children}</Text>
    )
}

P.propTypes = {
    style: PropTypes.any,
    numberOfLines: PropTypes.number
}

P.defaultProps = {
    numberOfLines: null
}