import React, { Component } from 'react';
import { Text } from 'react-native';
import styles from './Styles/H1Styles';

export default H1 = (props) => {
    return (
        <Text style={[styles.text, props.style]}>{ props.children }</Text>
    )
}