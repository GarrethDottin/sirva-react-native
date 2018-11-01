

import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import { Animated } from 'react-native'
import {IntroData} from './Data'

class IntroAnimation extends Component {

  state = {
    source: IntroData,
    progress: new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: .5,
      duration: 1250
    }).start()
    setTimeout(() => {
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: 1250
      }).start()
    }, 1250)
  }

  render() {
    return (
      <LottieView
        style={{
          width: 375,
          marginTop: 60,
          height: 350,
        }}
        loop={false}
        progress={this.state.progress}
        source={this.state.source}
      />
    );
  }
}



export default IntroAnimation;
