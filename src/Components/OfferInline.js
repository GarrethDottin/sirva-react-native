import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import { Images } from '../Theme'
import { P } from './'
import { styles } from './Styles/OfferInlineStyles';

import S from '../StyleUtils';

export default OfferInline = ({style, copy, copyStyle, iconSrc, iconStyle}) => {

    return (
        <View style={[styles.card, style]}>
            <Image style={[styles.icon, iconStyle]} source={iconSrc} />
            <P style={[styles.copy, copyStyle, S.flex1]}>{copy}</P>
        </View>
    );
};

OfferInline.propTypes = {
    style: PropTypes.any,
    copy: PropTypes.string.isRequired,
    copyStyle: PropTypes.object,
    iconSrc: PropTypes.number,
    iconStyle: PropTypes.object
}

OfferInline.defaultProps = {
    iconSrc: Images.iconOfferInline
}