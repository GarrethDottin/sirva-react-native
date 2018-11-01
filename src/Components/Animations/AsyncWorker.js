import React, { Component } from 'react';
import PropTypes from 'prop-types'
import LottieView from 'lottie-react-native';
import { Animated } from 'react-native'
import { Loader } from './Data'

class AsyncWorker extends Component {

    static propTypes = {
        animate: PropTypes.bool
    }
    
    static defaultProps = {
        animate: false,
    }

    state = {
        source: Loader,
        progress: new Animated.Value(0)
    }

    componentDidUpdate() {
        this.props.animate ? this.animation.play() : this.animation.reset()
    }

    render() {
        return (
            <LottieView
                ref={animation => {
                    this.animation = animation;
                }}
                style={{
                    width: 60,
                    height: 60
                }}
                loop={true}
                progress={this.state.progress}
                source={this.state.source}
            />
        );
    }
}



export default AsyncWorker;
