import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Images } from '../Theme';

export default ScreenCloseButton = (props) => {
    const closeIcon = props.closeIcon ? props.closeIcon : Images.iconClose
    
    return (
        <TouchableOpacity style={[{padding: 15}, props.style]} onPress={() => props.onPress()} activeOpacity={0.5}>
            <Image style={{ width: 17, height: 18 }} source={props.closeIcon ? props.closeIcon : Images.iconXGray} />
        </TouchableOpacity>
    )
}