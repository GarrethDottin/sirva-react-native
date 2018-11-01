import React, { Component, createRef } from 'react';
import { Linking, WebView } from 'react-native';

export class HtmlView extends Component {
    constructor(props) {
        super(props);
        this.webViewRef = createRef();
    }

    onNavigationChange(event) {
        this.webViewRef.current.stopLoading();
        Linking.openURL(event.url);
    }

    render() {
        return (
            <WebView
                dataDetectorTypes={ 'none' }
                ref={this.webViewRef}
                scalesPageToFit={false}
                style={ { backgroundColor: 'transparent' } }
                source={ this.props.source }
                onNavigationStateChange={ (event)=> this.onNavigationChange(event) }>
            </WebView>
        )
    }
}
