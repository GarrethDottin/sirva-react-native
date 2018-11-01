import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Text } from 'react-native';
import PropTypes from 'prop-types';
import { P } from './'
import { styles } from './Styles/PackingCardStyles'

export default class PackingCard extends Component {
  render() {
    const label = this.props.label !== undefined ? (
                  <View style={styles.labelContainer}>
                    <View style={styles.label}>
                      <Text style={[styles.actionText, styles.labelText]}>{this.props.label}</Text>
                    </View>
                  </View>
                ) : null
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.card}>
          <View style={styles.body}>
            <View style={styles.header}>
              {this.props.logo ? (<Image style={styles.image} source={{uri: this.props.logo}} />) : <View style={{ height: 58}}/>}
            </View>
          </View>
          <View>
            <View style={styles.action}>
              <Text style={styles.actionText}>{this.props.text}</Text>
            </View>
            { label }
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
