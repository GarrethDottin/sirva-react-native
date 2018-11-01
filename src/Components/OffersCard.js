import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { H2, P } from './'
import { styles } from './Styles/OffersCardStyles'
import { Colors } from '../Theme'

export default class OffersCard extends Component {
  render() {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.headerImage}>
          {this.props.headerImage ? <Image source={{ uri: this.props.headerImage }} style={{ width: 140, height: 55}}/> : null}
        </View>
        <View style={styles.overheadSection}>
          <View style={styles.overheadLabel}>
            <P style={{ color: Colors.white, fontSize: 12 }}>{this.props.label}</P>
          </View>
        </View>
        <View style={styles.descriptionText}>
          <P style={{ textAlign: "center" }}>
            {this.props.info}
          </P>
        </View>
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={styles.action}>
            <Text style={styles.actionText}>{this.props.buttonLabel}</Text>
            <Image source={images.iconArrowheadRightWhite} style={{ width: 11, height: 21 }}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
