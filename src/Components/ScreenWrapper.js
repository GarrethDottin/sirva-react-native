import React, { Component } from 'react';
import { NativeMethodsMixin, ImageBackground, Image, View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Theme'
import { navHeaderHeight } from '../Config/Constants'
import styles from './Styles/ScreenWrapperStyles'

class ScreenWrapper extends Component {

    static deviceHeight = Dimensions.get('window').height

    constructor(props) {
        super(props);
        this.state = {
            topOffset: navHeaderHeight,
            offsetSet: false
        }


    }

    //iphoneX adjustment
    setScreenTopOffset = (height) => {
        const diff = ScreenWrapper.deviceHeight - height;
        const offset = navHeaderHeight + diff
        
        this.setState({ topOffset: offset, offsetSet: true })
    }

    render = () => {
        const props = this.props

        const backgroundImage = props.backgroundImage ? props.backgroundImage : Images.texture05
        const watermark = props.watermark ? props.watermark : false

        return (
            <ImageBackground ref='wrapper' style={[{ marginTop: -this.state.topOffset }, styles.background, props.backgroundStyles]} source={backgroundImage}
                onLayout={(event) => {
                    !this.state.offsetSet && this.setScreenTopOffset(event.nativeEvent.layout.height)
                }}
            >
                {watermark &&
                    <Image source={watermark} style={[styles.watermark, props.watermarkStyles]} />
                }

                <View style={[{ minHeight: '100%', paddingTop: this.state.topOffset }, props.containerStyles]}>
                    {props.children}
                </View>
            </ImageBackground>
        )
    }
}

export default ScreenWrapper