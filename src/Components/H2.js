import React, { Component } from 'react';
import { Text } from 'react-native';
import styles from './Styles/H2Styles';

export default H2 = (props) => {
    return (
        <Text style={[styles.text, props.style]}>{ props.children }</Text>
    )
}