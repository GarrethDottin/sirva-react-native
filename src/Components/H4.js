import React, { Component } from 'react';
import { Text } from 'react-native';
import styles from './Styles/H4Styles';

export default H4 = (props) => {
    return (
        <Text style={[styles.text, props.style]}>{ props.children }</Text>
    )
}