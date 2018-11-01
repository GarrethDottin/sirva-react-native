import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import { Images } from '../Theme'
import { P } from './'
import { styles } from './Styles/OfferFlagStyles';

export default OfferFlag = ({style, copy, copyStyle, iconSrc, iconStyle}) => {    

    return (
        <View style={[styles.flag, style]}>
            <Image style={[styles.icon, iconStyle]} source={iconSrc} />
            <P style={[styles.copy, copyStyle]}>{copy}</P>
        </View>
    );
};

OfferFlag.propTypes = {
    style: PropTypes.object,
    copy: PropTypes.string,
    copyStyle: PropTypes.object,
    iconSrc: PropTypes.number,
    iconStyle: PropTypes.object
}
  
OfferFlag.defaultProps = {
    copy: 'iMOVE Discount',
    iconSrc: Images.iconOfferInline
}