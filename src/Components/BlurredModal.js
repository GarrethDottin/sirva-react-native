import React, { Component } from 'react';
import { ScrollView, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { BlurView, VibrancyView } from 'react-native-blur';

import styles from './Styles/AppModalStyles';

export const BlurredModal = (props) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible} >
            <TouchableWithoutFeedback onPress={() => props.onToggle()}>
                <BlurView style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, justifyContent: 'center' }}
                          blurType="light"
                          blurAmount={5}>
                <View style={[props.wrapperStyle]}>
                    <TouchableWithoutFeedback onPress={() => null}>
                        <View style={[styles.modal, props.modalStyle]}>
                            <ScrollView>{props.children}</ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </BlurView>
            </TouchableWithoutFeedback>
        </Modal>    
    )
}
