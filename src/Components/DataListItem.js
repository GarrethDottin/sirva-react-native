import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { View } from 'react-native';
import { P } from '../Components'
import styles from './Styles/DataListItemStyles';

export default DataListItem = (props) => {

    const value = props.children 
        ? <View>{props.children}</View>
        : <P style={[styles.value, props.valueStyle]}>{props.value}</P>

    return (
        <View style={[styles.dlItem, props.style]}>
            <P style={[styles.label, props.labelStyle]}>{props.label}</P>
            {value}
        </View>
    )
}

Button.propTypes = {
    style: PropTypes.any,
    labelStyle: PropTypes.any,
    valueStyle: PropTypes.any,
}