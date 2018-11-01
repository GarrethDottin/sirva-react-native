import React, { Component, PureComponent } from 'react';
import { View, ScrollView, Modal, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { BlurView, VibrancyView } from 'react-native-blur';
import { Colors, Variables } from '../Theme'
import { getIsVisibleSelector, getMessageSelector } from '../Redux/Modules/SystemWorking'
import { BlurredModal } from './'
import  { AsyncWorker } from './Animations'
import styles from './Styles/AsyncOverlayStyles'

class AsyncOverlay extends PureComponent {
    static propTypes =  {
        visible: PropTypes.bool,
        message: PropTypes.string,
    }

    static defaultProps = {
        visible: false,
        message: '',
    }

    render() {
        //const { message } = this.props

        return (
                <BlurView style={[styles.blur, !this.props.visible ? { display: 'none' } : null]}
                    blurType="light"
                    blurAmount={5}>

                    <View style={styles.modal}>
                        <ScrollView><AsyncWorker animate={this.props.visible} /></ScrollView>
                    </View>
                </BlurView>
            )
    }
}


const mapStateToProps = (state) => {
    return {
        visible: getIsVisibleSelector(state),
        message: getMessageSelector(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AsyncOverlay);
