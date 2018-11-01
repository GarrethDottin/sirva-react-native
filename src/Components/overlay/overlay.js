import React, { Component, PureComponent } from 'react';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';

import * as overlayComponents from './components';

import * as fromModal from '../../Redux/Modules/Modal';

const verticalAligmentMapping = {
    'default': 'center',
    'top': 'flex-start',
    'center': 'center',
    'bottom': 'flex-end'
}

class BlockingOverlay extends PureComponent {
    render() {
        const { verticalAlignement } = this.props
        return (
            <Modal animationType='fade' transparent={true} visible={this.props.visible} onRequestClose={ ()=> this.props.close() }>
                <TouchableWithoutFeedback onPress={ ()=> this.props.close() }>
                    <View style={ { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, justifyContent: verticalAlignement } }>
                        <TouchableWithoutFeedback>
                            { this.props.children }
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

class NonBlockingOverlay extends PureComponent {
    render() {
        const { verticalAlignement } = this.props
        return (
            <View style={ { justifyContent: verticalAlignement } }>
                { this.props.children }
            </View>
        )
    }
}

class Overlay extends PureComponent {
    componentDidUpdate() {
        const { overlayConfig } = this.props;
        if (overlayConfig.dismissTimeout) {
            setTimeout(()=> {
                this.props.close();
            }, overlayConfig.dismissTimeout)
        }
    }

    overlayWrapper() {
        const { overlayConfig } = this.props;
        const isOverlayBlocking = overlayConfig.isOverlayBlocking || false;
        if (isOverlayBlocking) {
            return BlockingOverlay;
        } else {
            return NonBlockingOverlay;
        }
    }

    render() {
        
        const { ComponentClass, overlayConfig, componentProps } = this.props
        const verticalAlignement = verticalAligmentMapping[overlayConfig.verticalAlignment || 'default'];

        if (!ComponentClass) {
            return null;
        }
        const OverlayWrapper = this.overlayWrapper();
        return (
            <OverlayWrapper {...this.props} verticalAlignement={verticalAlignement}>
                    <TouchableWithoutFeedback>
                        <ComponentClass {...this.props.componentProps} closeModal={()=> { this.props.close() } } />
                    </TouchableWithoutFeedback>
            </OverlayWrapper>
        )
    }
}


const mapStateToProps = (state) => {
    const activeModalConfig = fromModal.getActiveModal(state);

    const activeModalId = activeModalConfig ? activeModalConfig.modalId : null;
    const overlayConfig = activeModalConfig ? activeModalConfig.overlayConfig : {};
    const componentProps = activeModalConfig ? activeModalConfig.componentProps : {};

    const ActiveModalComponent = overlayComponents[activeModalId];
    overlayConfig.visible = ActiveModalComponent ? true : false;

    return {
        overlayConfig,
        componentProps,
        ComponentClass: ActiveModalComponent
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        close: ()=> {
            dispatch(fromModal.closeModal())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
