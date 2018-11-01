import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './Styles/OriginDestMarkerStyles';
import P from './P'
import { Colors } from '../Theme'

export default OriginDestMarker = (props) => {
    
    return (
        <View style={[styles.locations, props.styles]}>
            <View style={styles.locationGraphic}>
                <Image style={styles.marker} source={props.locationMarker} />
                <View style={[styles.connector, props.lineStyles]} />
                <Image style={styles.arrow} source={props.arrow} />
                <View  style={[styles.connector, props.lineStyles]} />
                <Image style={styles.marker} source={props.locationMarker} />
            </View>
            <View style={styles.locationNames}>
                <View>
                    <P style={props.textStyles}>{props.originCity}</P>
                    <Text style={[styles.label, props.textStyles]}>{props.originState}</Text>
                </View>
                <View>
                    <P style={props.textStyles}>{props.destCity}</P>
                    <Text style={[styles.label, styles.alignRight, props.textStyles]}>{props.destState}</Text>
                </View>
            </View>
        </View>
    )
}

OriginDestMarker.propTypes =  {
    originCity: PropTypes.string.isRequired,
    originState: PropTypes.string.isRequired,
    destCity: PropTypes.string.isRequired,
    destState: PropTypes.string.isRequired,
    locationMarker: PropTypes.number,
    arrow: PropTypes.number,
    styles: PropTypes.object,
    lineStyles: PropTypes.object,
    textStyles: PropTypes.object
}

OriginDestMarker.defaultProps = {
    locationMarker: images.fsLocationMarker,
    arrow: images.fsDetailArrow,
    styles: { },
    lineStyles: { },
    textStyles: { }
}