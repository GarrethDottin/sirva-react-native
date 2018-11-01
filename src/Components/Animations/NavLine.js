import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Animated, Dimensions, TouchableNativeFeedbackBase } from 'react-native';
import { Colors } from '../../Theme'

class NavLine extends Component {

  static PropTypes = {
    index: PropTypes.number,
    width: PropTypes.number,
    selected:PropTypes.object, 
  }

  state = {
    width: new Animated.Value(this.props.selected.width),
    x: this.props.selected.x,
    index: this.props.index,
    prevX: this.props.selected.x,
    left: new Animated.Value(this.props.selected.x),
    prevW: this.props.selected.width,
    direction: 'right',
  }

  componentWillReceiveProps(e) {
    this.setState((prev) => {
      let direction;
      if (this.props.index >= prev.index) {
        direction = 'right'
      } else{
        direction = 'left'
      }
      return {
        x: e.selected.x,
        prevX: prev.x,
        prevW: prev.newWidth,
        direction,
        newWidth: this.props.selected.width,
        index: this.props.index
      }
    })
  }

  componentDidUpdate(e) {
    let width = this.props.selected.width;
    let rightX = this.props.selected.x;
    let newWidth = width + rightX - (this.state.prevX);
    if (this.state.direction == 'right') {
      Animated.sequence([
        Animated.timing(this.state.width, {
          toValue: newWidth, duration: 75
        }),
        Animated.parallel([
          Animated.timing(this.state.left, {
            toValue: rightX, duration: 75
          }),
          Animated.timing(this.state.width, {
            toValue: width, duration: 75
          })
        ])
      ]).start();
    }
    else {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.width, {
            toValue: (this.state.prevX + this.state.prevW) - this.props.selected.x, duration: 75
          }),
          Animated.timing(this.state.left, {
            toValue: rightX, duration: 75 
          })
        ]),
        Animated.timing(this.state.width, {
          toValue: width, duration: 75
        })
      ]).start();
    }
  }

  render() {
    let style = {
      height: 2,
      width: '100%',
      left: this.state.left,
      right: this.state.right,
      maxWidth: this.state.width,
      backgroundColor: Colors.offwhite,
      zIndex: 10,
      position: 'absolute',
      top: 24,

    }
    return (
      <Animated.Text
        style={style}>
        {this.props.children}
      </Animated.Text>
    );
  }
}



export default NavLine;
