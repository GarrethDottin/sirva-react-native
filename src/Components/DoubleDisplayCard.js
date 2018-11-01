import React, { Component } from 'react';
import { View } from 'react-native';
import { H2, H4 } from './';
import { Colors } from '../Theme'
import styles from './Styles/DoubleDisplayCardStyles';

export default class DoubleDisplayCard extends Component {

    constructor(props) {
      super(props);
    }

    render() {
        return (
            <View style={[styles.mainContainer, this.props.border ? styles.mainContainerBorder : null]}>
                {this.props.title ? <H4 style={styles.titleStyle}>{this.props.title}</H4> : null}
                <View style={styles.innerContainer}>
                    <View style={[styles.subCard, styles.cardBorder]}>
                            <H2 style={{color: Colors.lightBlue }}>{this.props.info1}</H2>
                            <H4 style={styles.subStyle}>{this.props.info1sub}</H4>
                    </View>
                    <View style={styles.subCard}>
                            <H2 style={{color: Colors.teal }}>{this.props.info2}</H2>
                            <H4 style={styles.subStyle}>{this.props.info2sub}</H4>
                    </View>
                </View>
            </View>
        )
    }
}
