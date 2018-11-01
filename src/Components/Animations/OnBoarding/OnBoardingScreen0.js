import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { OnBoardingDataScreen0} from '../Data'
class OnBoardingScreen0 extends Component {

  state = {
    source: OnBoardingDataScreen0,
    transition: this.props.transition,
    duration: this.props.duration
  }

  progress = new Animated.Value(0);

  componentDidMount() {
    Animated.timing(this.progress, {
      toValue: .4,
      duration: this.state.duration
    }).start()
  }


  componentWillReceiveProps(e) {
    if (e.transition == 'Out') {
      Animated.timing(this.progress, {
        toValue: 1,
        duration: this.state.duration
      }).start()
    }

    if (e.transition == 'In') {
      this.progress = new Animated.Value(0)
      setTimeout(()=>{
        Animated.timing(this.progress, {
          toValue: .4,
          duration: this.state.duration
        }).start()
      },this.state.duration)
    }
  }
  render() {
    return (
      <LottieView
        style={{
          width: 375,
          height: 300,
        }}
        loop={false}
        progress={this.progress}
        source={this.state.source}
      />
    );
  }
}

export default OnBoardingScreen0;

