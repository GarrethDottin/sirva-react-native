import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { H2, P } from './'
import { styles } from './Styles/FeatureCardStyles'
import { Colors, Images } from '../Theme'

export default FeatureCard = (props) => {
    return (
        <View style={[styles.cardContainer, props.style]}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
            <TouchableOpacity onPress={props.onPress}>
                <View style={styles.action}>
                    <Text style={styles.actionText}>{props.buttonLabel}</Text>
                    <Image source={Images.iconArrowheadRightWhite} style={{ width: 11, height: 21 }}/>
                </View>
            </TouchableOpacity>
        </View>
    )    
}

FeatureCard.propTypes = {
    onPress: PropTypes.func.isRequired,
    buttonLabel: PropTypes.string.isRequired
}