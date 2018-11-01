import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './Styles/IntroCardStyles';

export default IntroCard = (props) => {

    return (
        <View style={[styles.introCard, props.styles]}>
            {props.children}
        </View>
    );
};