import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { dismissMessage  } from '../Redux/Modules/SystemMessaging'
import { H2, P, Link, AppModal } from './'

import { styles } from './Styles/SystemMessagingStyles'

class SystemMessaging extends Component {
    
    static propTypes =  {
        visible: PropTypes.bool,
        message: PropTypes.string,
        isSuccess: PropTypes.bool,
        nonModal: PropTypes.bool,
        showDismissLink: PropTypes.bool
    }

    static defaultProps = {
        visible: false,
        message: '',
        isSuccess: false,
        nonModal: false,
        showDismissLink: true
    }

    onToggle = () => {
        this.props.dismissMessage()
    }

    render = ()  => {
        const nonModal = this.props.nonModal
        const isSuccess = this.props.isSuccess

        const renderer = nonModal ? (
            this.props.visible && (
                <View style={styles.wrapper}>
                    <View style={[
                        styles.modal,
                        styles.nonModal, 
                        isSuccess ? styles.successModal : null
                    ]}>
                        <P style={[styles.copy,isSuccess ? styles.successCopy : null]}>
                            {this.props.message}
                        </P>
                        {this.props.showDismissLink &&
                            <Link style={styles.modalLink} textStyle={isSuccess ? styles.modalLinkTextSuccess :  styles.modalLinkTextError} onPress={this.onToggle}>Got it!</Link> 
                        }
                    </View>
                </View>
            )
        ) : (
            <AppModal wrapperStyle={styles.wrapper} modalStyle={[styles.modal, isSuccess ? styles.successModal : null]} visible={this.props.visible} onToggle={this.onToggle}>
                <P style={[styles.copy,isSuccess ? styles.successCopy : null]}>
                    {this.props.message}
                </P>
                {this.props.showDismissLink &&
                    <Link style={styles.modalLink} textStyle={isSuccess ? styles.modalLinkTextSuccess :  styles.modalLinkTextError} onPress={this.onToggle}>Got it!</Link> 
                }            
            </AppModal>
        )
        return (
            renderer
        )
    }
}  

const mapStateToProps = ({ systemMessaging }) => {
    return {
        message: systemMessaging.message,
        visible: systemMessaging.visible,
        isSuccess: systemMessaging.isSuccess,
        nonModal: systemMessaging.nonModal,
        showDismissLink: systemMessaging.showDismissLink
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dismissMessage: () => {
            dispatch(dismissMessage())
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SystemMessaging)
