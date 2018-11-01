import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScrollView, Image, ImageBackground, View, Modal, TouchableWithoutFeedback } from 'react-native'
import { AppModal } from '../Components'
import { Images } from '../Theme'
import { closeModal, getActiveModalId } from '../Redux/Modules/Modal'
import styles from './Styles/AppModalFullScreenStyles'
import {ModalAnimation} from './Animations'
class AppModalFullScreen extends Component {

    static propTypes = {
        visible: PropTypes.bool,
        onToggle: PropTypes.func,
        wrapperStyle: PropTypes.any,
        modalStyle: PropTypes.any,
    }

    static defaultProps = {
        visible: false,
        onToggle: null,
        wrapperStyle: {},
        modalStyle: {},
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const previousVisibleValue = prevProps.visible

        if (previousVisibleValue != this.props.visible) {
            //Parent is updating visibility
            this.setState({ visible: this.props.visible})
        }
    }

    closeModal = () => {
        this.props.closeModal()
    }

    renderWhiteModal = (props) => {
        return (
            <ModalAnimation>
                <View style={[styles.modal, this.props.modalStyle]}>
                    <View style={[styles.wrapper, this.props.wrapperStyle]}>
                        <TouchableWithoutFeedback onPress={() => this.closeModal()}>
                            <Image source={Images.iconXGray} style={[styles.close, styles.closeWhite]} />
                        </TouchableWithoutFeedback>
                        <ScrollView contentContainerStyle={styles.whiteContainer}>
                            {props.children}
                        </ScrollView>
                    </View>
                </View>
            </ModalAnimation>
        )
    }

    renderGrayModal = (props) => {
        return (
            <ModalAnimation>
                <View style={[styles.modal, this.props.modalStyle]}>
                    <ImageBackground style={[styles.wrapper, styles.grayWrapper, this.props.wrapperStyle]} source={Images.textureGray03} >
                        <TouchableWithoutFeedback onPress={() => this.closeModal()}>
                            <Image source={Images.iconXWhite} style={styles.close} />
                        </TouchableWithoutFeedback>
                        <ScrollView style={styles.grayContainer} contentContainerStyle={styles.container}>
                            {props.children}
                        </ScrollView>
                    </ImageBackground>
                </View>
            </ModalAnimation>
        )
    }

    renderBlueModal = (props) => {
        return (
            <View style={[styles.modal, this.props.modalStyle]}>
                <ImageBackground style={[styles.wrapper, styles.grayWrapper, this.props.wrapperStyle]} source={Images.texture03Blue} >
                    <TouchableWithoutFeedback onPress={() => this.closeModal()}>
                        <Image source={Images.iconXWhite} style={styles.close} />
                    </TouchableWithoutFeedback>
                    <ScrollView style={styles.grayContainer} contentContainerStyle={styles.container}>
                        {props.children}
                    </ScrollView>
                </ImageBackground>
            </View>
        )
    }

    render = () => {
        const props = this.props

        let content = null
        if (this.props.type === 'blue') content = this.renderBlueModal(props)
        else if (this.props.type === 'gray') content = this.renderGrayModal(props)
        else content = this.renderWhiteModal(props)

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.activeModal === this.props.modalKey}>
                    {content}
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    activeModal: getActiveModalId(state)
})

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => {
            dispatch(closeModal())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppModalFullScreen)
