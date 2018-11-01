
import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import { Animated } from 'react-native'
import { cityGuidesData } from './Data'

class CityGuidesAnimation extends Component {

  state = {
    progress: new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 2000
    }).start()

  }

  render() {
    return (
      <LottieView
        style={{
          width:375,
          height: 223,
        }}
        loop={false}
        progress={this.state.progress}
        source={cityGuidesData[this.props.time]}
      />
    );
  }
}



export default CityGuidesAnimation;
