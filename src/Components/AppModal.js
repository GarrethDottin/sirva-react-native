import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, Modal, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
import styles from './Styles/AppModalStyles'

export default AppModal = (props) => {
    return (
          <Modal
              animationType="fade"
              transparent={true}

              visible={props.visible}>
              <TouchableHighlight style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={() => props.onToggle()}>
                <View>
                    <View style={[styles.wrapper, props.wrapperStyle]}>
                        <TouchableWithoutFeedback onPress={() => null}>
                            <View style={[styles.modal, props.modalStyle]}>
                                <ScrollView>{props.children}</ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
              </TouchableHighlight>
          </Modal>
    )
}

AppModal.propTypes = {
    visible: PropTypes.bool,
    onToggle: PropTypes.func,
    wrapperStyle: PropTypes.any,
    modalStyle: PropTypes.any,
}

AppModal.defaultProps = {
    visible: false,
    onToggle: null,
    wrapperStyle: {},
    modalStyle: {},
}
