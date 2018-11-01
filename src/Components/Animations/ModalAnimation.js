

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Animated, Easing } from 'react-native';

class ModalAnimation extends Component {

  static PropTypes = {
    speed: PropTypes.number,
    bounciness: PropTypes.number
  }
  static defaultProps = {
    speed: 20,
    bounciness: 2
  }
  state = {
    opacity: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.spring(
      this.state.opacity,
      {
        toValue: 1,
        speed: this.props.speed,
        bounciness: this.props.bounciness,
        useNativeDriver: true
      }
    ).start();
  }

  render() {
    let { opacity } = this.state;
    let show = {
      translateY: this.state.opacity.interpolate({
        inputRange: [.9, 1],
        outputRange: [500, 0]
      }),

      translateX: this.state.opacity.interpolate({
        inputRange: [.5, 1],
        outputRange: [500, 0],
      }),
      scaleX: this.state.opacity.interpolate({
        inputRange: [0, .9, 1],
        outputRange: [0, .9, 1]
      }),

      scaleY: this.state.opacity.interpolate({
        inputRange: [0, .9, 1],
        outputRange: [0, .9, 1.02]
      })
    }

    return (
      <Animated.View
        style={{
          ...this.props.style,
          transform: [
            { translateY: show.translateY },
            { translateX: show.translateX },
            { scaleX: show.scaleX },
            { scaleY: show.scaleY }
          ],
          opacity
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}



export default ModalAnimation;
