import React, { Component } from 'react';
import { Text } from 'react-native';
import styles from './Styles/H3Styles';

export default H3 = (props) => {
    return (
        <Text style={[styles.text, props.style]}>{ props.children }</Text>
    )
}