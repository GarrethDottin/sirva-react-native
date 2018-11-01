import React, { Component } from 'react'
import { View, ImageBackground } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import { Images, Layout } from '../../Theme'
import {IntroAnimation} from '../../Components/Animations'

export default BootUp = (props) => {
    return (
        <ImageBackground style={Layout.screenWrapper} source={Images.texture01} >
            <View style={[Layout.outerContainer]}>
                <IntroAnimation />
            </View>
        </ImageBackground>
    )
}