import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Images } from '../Theme'
import styles from './Styles/NavDotsStyles';

export default NavDots = ({pages, activePage}) => {    

    let dots = [];
    for (let i = 0; i < pages; i++) {
        dots.push(<Image key={i} style={styles.image} source={(i === (activePage - 1)) ? Images.iconRadioOn : Images.iconRadioOff} />);
    }

    return (
        <View style={styles.container}>
            {dots}
        </View>
    );
};

NavDots.propTypes = {
    pages: PropTypes.number.isRequired,
    activePage: PropTypes.number.isRequired
}
  
NavDots.defaultProps = {
    pages: 0,
    activePage: 0
}