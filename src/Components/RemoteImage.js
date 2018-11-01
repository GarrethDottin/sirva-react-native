import React, { Component } from "react";
import { Image } from 'react-native';

export class RemoteImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {}
        }
    }

    componentDidMount() {
        Image.getSize(this.props.source.uri, (width, height)=> {
            this.setState({
                imageWidth: width,
                imageHeight: height
            })
        }, ()=> {})
    }

    getImageDimensions() {
        let width = null, height = null;
        const { imageWidth, imageHeight } = this.state;
        const aspectRatio = imageWidth / imageHeight;

        if (!imageWidth || !imageHeight) { return {} }

        if (this.props.width) {
            width = this.props.width;
            height = width / aspectRatio;
        } else if(this.props.height) {
            height = this.props.height;
            width = height * aspectRatio;
        } else {
            width = imageWidth;
            height = imageHeight
        }

        return { width, height }
    }

    render() {
        return (
            <Image {...this.props} style={[ { resizeMode: 'contain' }, this.props.style, this.getImageDimensions() ]} />
        )
    }
}
