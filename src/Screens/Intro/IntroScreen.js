import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Animated, Easing, View, Image, ImageBackground } from 'react-native'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'
import { introCompleted } from '../../Redux/Modules/AppState'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { NavDots, H1, P, Button } from '../../Components'
import { __ } from '../../Utils/ReactHelpers'
import { Images, Layout } from '../../Theme'
import styles from './Styles/IntroScreenStyles'

import { OnBoardingScreen0, OnBoardingScreen1, OnBoardingScreen2, OnBoardingScreen3} from '../../Components/Animations/OnBoarding'
import { navigate } from '../../Redux/Modules/Routing';
import { ScreenHOC } from '../Screen';

class Intro1Screen extends Component {
    state = {
        slideNdx: 0,
    }
    screen = {
        0:{
            transition:'In',
            duration:1750
        },
        1: {
            transition: null,
            duration:1500
        },
        2: {
            transition: null,
            duration:1500
        },
        3: {
            transition: null,
            duration:1500
        },
        4: {
            transition: null,
            duration: 1500
        }
    }
    leftValue = new Animated.Value(0)
    interpolateLeft = this.leftValue.interpolate({
        inputRange: [0, 1, 2, 3],
        outputRange: ['0%', '-100%', '-200%', '-300%']
    })
    gestureConfig = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    }

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    onSwipeLeft(gestureState) {
        if (this.state.slideNdx <= 3) {
            const newNdx = (this.state.slideNdx + 1)    
            this.animate(newNdx)
            this.transitionHelper(this.state.slideNdx, newNdx)
            this.setState({
                slideNdx: newNdx,
            }) 
        } else{
            console.log(this.state.slideNdx)
        }

    }
    onSwipeRight(gestureState) {
        if (this.state.slideNdx > 0) {
            const newNdx = (this.state.slideNdx - 1)
            this.animate(newNdx)
            this.setState({
                slideNdx: newNdx,
            }) 
            this.transitionHelper(this.state.slideNdx, newNdx)
        }
    }
    transitionHelper(prev,to){
        if(prev == 3 && to ==4){
            
            this.screen[prev]['transition'] = 'Out';
            setTimeout(()=>{
                this.props.gotoNextPage();
            },1400)
        } else  if (prev > to) {
            this.screen[prev]['transition'] = 'Reverse';
            this.screen[to]['transition'] = 'In'
        } else {
            this.screen[prev]['transition'] = 'Out';
            this.screen[to]['transition'] = 'In'
        }
    }
    animate(to) {
        this.setState((prev)=>{
            setTimeout(() => {
                Animated.timing(this.leftValue, {
                    toValue: to,
                    duration: 300,
                    easing: Easing.ease,
                }).start((()=>{
                }))
            }, 1400)
        })

    }
    render() {
        return (
            <ImageBackground style={Layout.screenWrapper} source={Images.texture09} >
                <GestureRecognizer
                    onSwipeLeft={(state) => this.onSwipeLeft(state)}
                    //onSwipeRight={(state) => this.onSwipeRight(state)}
                    config={this.gestureConfig}
                    style={styles.outerContainer}>
                    <View style={styles.sliderContainer}>
                        <Animated.View style={[styles.sliderInner, { left: this.interpolateLeft }]}>
                            <View style={styles.slide}>
                                <View style={Layout.contentContainer}>
                                    <OnBoardingScreen0 
                                        duration={this.screen[0].duration} 
                                        transition={this.screen[0].transition} />
                                    <H1 style={styles.title}>
                                        {this.__('screen1.title')}
                                    </H1>
                                    <P style={styles.swipeCopy}>
                                        {this.__('swipertext')}
                                    </P>
                                </View>
                            </View>
                            <View style={styles.slide}>
                                <View style={Layout.contentContainer}>
                                    <OnBoardingScreen1 
                                        duration={this.screen[1].duration}
                                        transition={this.screen[1].transition} />
                                    <H1 style={styles.title}>
                                        {this.__('screen2.title')}
                                    </H1>

                                    <P style={styles.copy}>
                                        {this.__('screen2.subtitle')}
                                    </P>
                                </View>
                            </View>
                            <View style={styles.slide}>
                                <View style={Layout.contentContainer}>
                                    <OnBoardingScreen2
                                        duration={this.screen[2].duration}
                                        transition={this.screen[2].transition} />
                                    <H1 style={styles.title}>
                                        {this.__('screen3.title')}
                                    </H1>
                                    <P style={styles.copy}>
                                        {this.__('screen3.subtitle')}
                                    </P>
                                </View>
                            </View>
                            <View style={styles.slide}>
                                <View style={Layout.contentContainer}>
                                    <OnBoardingScreen3
                                        duration={this.screen[3].duration}
                                        transition={this.screen[3].transition} />
                                    <H1 style={styles.title}>
                                        {this.__('screen4.title')}
                                    </H1>

                                    <P style={styles.copy}>
                                        {this.__('screen4.subtitle')}
                                    </P>
                                </View>
                            </View>
                        </Animated.View>
                    </View>

                    <View style={styles.bottomWrapper}>
                        <NavDots pages={4} activePage={(this.state.slideNdx + 1)} />
                        <Button style={styles.button} onPress={() => this.onSwipeLeft(this.state)} type={"secondary"} label={this.__('buttonnext')} />
                    </View>
                </GestureRecognizer>
            </ImageBackground>
        )
    }
}


const mapStateToProps = (state, props) => {
    return { 
        screenLanguage: getLanguageDataSelector(state, 'IntroScreen')
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoNextPage: () => {
            dispatch(introCompleted())
            dispatch(navigate({ routeName: 'Login' }));
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(Intro1Screen))
