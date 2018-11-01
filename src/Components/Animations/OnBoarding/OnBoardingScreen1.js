import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { OnBoardingDataScreen1 } from '../Data'

class OnBoardingScreen1 extends Component {

  state = {
    source: OnBoardingDataScreen1,
    transition: this.props.transition,
    duration: this.props.duration
  }

 


  componentWillReceiveProps(e) {
    let progress;
    if (e.transition == 'Out') {
      this.progress = new Animated.Value(.5)
      Animated.timing(this.progress, {
        toValue: 1,
        duration: this.state.duration
      }).start()
    }
    if(e.transition == 'Reverse'){
      this.progress = new Animated.Value(.5)
      Animated.timing(this.progress, {
        toValue: 0,
        duration: this.state.duration
      }).start()  
    }
    if (e.transition == 'In') {
      this.progress = new Animated.Value(0)
      setTimeout(() => {
        Animated.timing(this.progress, {
          toValue: .5,
          duration: this.state.duration
        }).start()
      }, this.state.duration)
    }
  }
  render() {
    return (
      <LottieView
        style={{
          width: 375,
          height: 300,
          marginTop: 30,
        }}
        loop={false}
        progress={this.progress}
        source={this.state.source}
      />
    );
  }
}

export default OnBoardingScreen1;

