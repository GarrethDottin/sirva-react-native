import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Animated} from 'react-native';

class FadeInDown extends Component {

  static PropTypes = {
    count: PropTypes.number,
    duration:PropTypes.number
  }
  static defaultProps = {
    count: 0,
    duration: 350,
  }
  state = {
    fadeAnim: new Animated.Value(0)
  }
  
  componentDidMount() {
      Animated.timing(                  
        this.state.fadeAnim,            
        {
          toValue: 1,                   
          // if children are passed add to  duration of animation to show stagger effect        
          duration: this.props.duration + (this.props.count * this.props.duration),        
        }
    ).start();                        
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 
        style={{
          ...this.props.style,
          transform: [{
            translateY: this.state.fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-25, 0]  
            }),
        }],
          opacity: fadeAnim,        
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}



export default FadeInDown;