

import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import { Animated } from 'react-native'
import { weatherData} from './Data'

class WeatherAnimation extends Component {

  state = {
    source: weatherData[`icon${this.props.icon}`],
    progress: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 1200
    }).start()
  }

  render() {
    return (
      <LottieView
        progress={this.state.progress}
        source={this.state.source}
        style={{
          height:32,
          width:64,
          marginTop: -8,
          marginLeft:-15
        }}
      />
    );
  }
}



export default WeatherAnimation;
