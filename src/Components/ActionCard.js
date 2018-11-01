import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { H4, P } from './'
import styles from './Styles/ActionCardStyles'
import { Colors, Images } from '../Theme'

export default ActionCard = (props) => {

    const action = (props.onPress !== null) 
        ? <TouchableOpacity onPress={props.onPress}>
            <View style={styles.action}>
                <Text style={styles.actionText}>{props.actionText}</Text>
                <Image style={styles.actionImage} source={images.iconArrowheadBlue} />
            </View>
        </TouchableOpacity>
        : null

    const copy = (props.children.length !== 0) 
        ? props.children
        : <P style={[styles.copy, props.copyStyles]}>{props.copy}</P>

    return (
        <View style={styles.card}>
            <View style={[styles.body, { backgroundColor: props.backgroundColor }, props.bodyStyles]}>
                <View style={[styles.header, props.headerStyles]}>
                    { props.headerIcon && <Image style={[styles.image, props.iconStyles]} source={props.headerIcon} /> }
                    <H4 style={styles.headerCopy}>{props.headerCopy.toUpperCase()}</H4>
                </View>
                { copy }
            </View>
            { action }
        </View>
    )
}

//headerIcon - image include evaluates to a number
ActionCard.propTypes = {
    onPress: PropTypes.func,
    headerCopy: PropTypes.string.isRequired,
    headerIcon: PropTypes.number, 
    copy: PropTypes.string,
    copyStyles: PropTypes.any,
    iconStyles: PropTypes.any,
    actionText: PropTypes.string,
    backgroundColor: PropTypes.string,
}

ActionCard.defaultProps = {
    onPress: null,
    headerIcon: null,
    copy: '',
    copyStyles: {},
    iconStyles: {},
    actionText: '',
    backgroundColor: Colors.white,
    children: [],
}