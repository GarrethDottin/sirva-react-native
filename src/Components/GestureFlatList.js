import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, PanResponder } from 'react-native';
import { styles } from './Styles/GestureFlatListStyles';

const swipeDirections = {
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT'
};

const swipeConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};

function isValidSwipe(velocity, velocityThreshold, directionalOffset, directionalOffsetThreshold) {
  return Math.abs(velocity) > velocityThreshold && Math.abs(directionalOffset) < directionalOffsetThreshold;
}

export default class GestureFlatList extends Component {

  constructor(props, context) {
    super(props, context);
    this.swipeConfig = Object.assign(swipeConfig, props.config);
  }

  componentWillReceiveProps(props) {
    this.swipeConfig = Object.assign(swipeConfig, props.config);
  }

  componentWillMount() {
    const responderEnd = this._handlePanResponderEnd.bind(this);
    const shouldSetResponder = this._handleShouldSetPanResponder.bind(this);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: shouldSetResponder,
      onMoveShouldSetPanResponder: shouldSetResponder,
      onPanResponderRelease: responderEnd,
      onPanResponderTerminate: responderEnd
    });
  }

  _handleShouldSetPanResponder(evt, gestureState) {
    return evt.nativeEvent.touches.length === 1 && !this._gestureIsClick(gestureState) && this._isValidHorizontalSwipe(gestureState);
  }

  _gestureIsClick(gestureState) {
    return Math.abs(gestureState.dx) < 5  && Math.abs(gestureState.dy) < 5;
  }

  _handlePanResponderEnd(evt, gestureState) {
    const swipeDirection = this._getSwipeDirection(gestureState);
    this._triggerSwipeHandlers(swipeDirection, gestureState);
  }

  _triggerSwipeHandlers(swipeDirection, gestureState) {
    const { onSwipeLeft, onSwipeRight } = this.props;
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

    switch (swipeDirection) {
      case SWIPE_LEFT:
        onSwipeLeft && onSwipeLeft(gestureState);
        break;
      case SWIPE_RIGHT:
        onSwipeRight && onSwipeRight(gestureState);
        break;
    }
  }

  _getSwipeDirection(gestureState) {
    const {SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN} = swipeDirections;
    const {dx, dy} = gestureState;
    if (this._isValidHorizontalSwipe(gestureState)) {
      return (dx > 0)
        ? SWIPE_RIGHT
        : SWIPE_LEFT;
    }
    return null;
  }

  _isValidHorizontalSwipe(gestureState) {
    const {vx, dy} = gestureState;
    const {velocityThreshold, directionalOffsetThreshold} = this.swipeConfig;
    return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold);
  }

  renderList() {
    return this.props.data.map((item, index) => {
      return (
        <View key={`${this.props._keyExtractor(item, index)}GestureFlatListItem`}>
          {this.props._renderItem({ item, index })}
        </View>
      )
    })
  }
  render() {
    return (
      <View style={[styles.container, this.props.style]} {...this._panResponder.panHandlers}>
        {this.renderList()}
      </View>
    );
  }
}

GestureFlatList.propTypes = {
  data: PropTypes.array.isRequired,
  _renderItem: PropTypes.func.isRequired,
  _keyExtractor: PropTypes.func,
  style: PropTypes.object,
  onSwipeLeft: PropTypes.func,
  onSwipeRight: PropTypes.func,
  gestureConfig: PropTypes.object
}

GestureFlatList.defaultProps = {
  data: [],
  _keyExtractor: (item, index) => item.id,
  _renderItem: (item) => null,
  style: {},
  onSwipeLeft: () => null,
  onSwipeRight: () => null,
  gestureConfig: {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  }
}