import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import { Images, Colors } from '../Theme'
import { Dropdown } from './'
import styles from './Styles/DropdownAltStyles';

export default DropdownAlt = ({value, data, onChangeText, fontSize=18}) => {    

    return (
        <Dropdown
            value={value}
            data={data}
            fontSize={fontSize}
            baseColor={Colors.white}
            textColor={Colors.white}
            itemColor={Colors.darkGray}
            selectedItemColor={Colors.darkGray}
            dropdownPosition={0}
            overlayStyle={{ marginTop: 50 }}
            rippleInsets={{ top: 36, bottom: 14 }}
            renderAccessory={() => {
                return (
                    <View style={styles.accessory}>
                        <View style={styles.triangleContainer}>
                            <Image style={styles.triangle} source={Images.iconPulldownWhite} />
                        </View>
                    </View>
                )
            }}
            onChangeText={(index) => onChangeText(index)}
        />
    )
}

DropdownAlt.propTypes = {
    data: PropTypes.any,
    selectedValue: PropTypes.number,
    onPress: PropTypes.func
}