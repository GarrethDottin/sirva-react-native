import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './Styles/ListItemCardStyles';
import images from '../Theme/Images'

export default ListItemCard = (props) => {

    return (
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
            <View style={[styles.card, props.cardStyles]}>
                {props.children}
                { props.actionImage ? (
                        <Image style={[styles.actionImage, props.actionImageStyles]} source={props.actionImage} />
                    ) : <Image style={styles.actionImage} source={images.listCardArrow} />
                }
                
            </View>
        </TouchableOpacity>
    );
};