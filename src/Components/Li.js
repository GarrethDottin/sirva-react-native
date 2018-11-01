import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Images } from '../Theme'
import styles from './Styles/LiStyles';

export default Li = (props) => {
    return (
        <View style={styles.wrapper}>
            <Image style={styles.bullet} source={Images.iconBullet} />
            <Text style={[styles.text, props.style]}>{ props.children }</Text>
        </View>
    )
}