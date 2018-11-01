import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Images } from '../Theme';
import { H4 } from '../Components';
import styles from './Styles/CheckBoxStyles'

export default class CheckBox extends Component {

    checked(isChecked) {
        this.props.onChange(isChecked)
    }

    render() {
        const label = this.props.label
        const renderer = this.props.isChecked ? (
            <TouchableOpacity style={[styles.elementsContainer, this.props.containerStyles]} onPress={() => this.checked(false) }>
                <Image source={Images.checkboxChecked} style={styles.checked}/>
                <H4 style={styles.textStyles}>{label}</H4>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity style={[styles.elementsContainer, this.props.containerStyles]} onPress={() => this.checked(true)}>
            <Image source={Images.checkboxUnchecked} style={styles.unchecked}/>
                <H4 style={styles.textStyles}>{label}</H4>
            </TouchableOpacity>
        )

        return renderer
    }
}
