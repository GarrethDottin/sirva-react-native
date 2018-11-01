import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ScrollView, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { P, AppModalFullScreen } from '../Components'
import { dismissProtip } from '../Redux/Modules/AppState'
import { openModalById, getActiveModalId } from '../Redux/Modules/Modal'
import images from '../Theme/Images'
import styles, { protipModalStyles } from './Styles/ProTipStyles'

class ProTip extends Component {

    static propTypes =  {
        backgroundImage: PropTypes.number,
        copyLines: PropTypes.number,
        copy: PropTypes.string,
        helpActionCopy: PropTypes.string,
        showDismissLink: PropTypes.bool,
        dismissLinkText: PropTypes.string,
        identifier: PropTypes.string.isRequired
    }

    static defaultProps = {
        backgroundImage: images.textureGray01,
        copyLines: 2,
        copy: '',
        helpActionCopy: '',
        showDismissLink: true,
        dismissLinkText: 'Got it!',
        identifier: ''
    }

    onPressHideAction = (identifier) => {
        this.props.dismissProtip(identifier)
    }

    openModal = () => {
        this.props.openModal(this.props.identifier)
    }

    render = () => {
        const props = this.props
        const bgStyle = this.props.copyLines === 2 ? styles.proTipBg : styles.proTipBg3Lines
        

        return (
            <View style={[styles.proTip, props.styles]}>
                <ImageBackground source={props.backgroundImage} style={bgStyle} resizeMode='stretch'>
                    { props.copy !== "" && <P style={styles.copy}>
                        {props.copy}
                    </P>}
                    <View style={styles.actions}>
                        <Image source={images.iconBell} style={styles.bell} />
                        <TouchableOpacity onPress={() => this.openModal()}>
                            <Text style={styles.actionItem}>{props.helpActionCopy}</Text>
                        </TouchableOpacity>

                        {props.showDismissLink && 
                            <TouchableOpacity style={styles.hideAction} onPress={() => this.onPressHideAction(props.identifier)}>
                                <Text style={styles.actionItem}>{props.dismissLinkText}</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </ImageBackground>
                <AppModalFullScreen modalKey={props.identifier} type="gray">
                    <ScrollView style={protipModalStyles.modal} contentContainerStyle={protipModalStyles.modalContainer}>
                        {props.children}
                    </ScrollView>
                    <Image style={protipModalStyles.icon} source={images.iconProtipIllustration} />
                </AppModalFullScreen>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dismissProtip: (identifier) => {
            dispatch(dismissProtip(identifier))
        },
        openModal: (identifier) => {
            dispatch(openModalById(identifier))
        },
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(ProTip)