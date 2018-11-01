import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import call from 'react-native-phone-call'
import { asyncSubmitEmail  } from '../Redux/Modules/Concierge'
import { Images } from '../Theme'
import { openModalById, getActiveModalId } from '../Redux/Modules/Modal'
import { conciergeClicked, getConciergeClicked } from '../Redux/Modules/AppState'
import { getCounselorSelector } from '../Redux/Modules/Relocation'
import { asyncTrackCallConciergeEvent } from '../Redux/Modules/Analytics'
import { __ } from '../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../Redux/Modules/Localization'
import { H2, P, Link, AppModalFullScreen } from './'
import styles from './Styles/ConciergeStyles'

class Concierge extends Component {

    static propTypes =  {
        visible: PropTypes.bool,
        modalOpen: PropTypes.bool,
        working: PropTypes.bool
    }

    static defaultProps = {
        visible: false,
        modalOpen: false,
        working: false
    }

    state = {
        emailText: ''
    }

    inputText = null

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.componentLanguage) {
            this.__ = __(nextProps.componentLanguage)
        }
    }

    openModal = () => {
        this.props.setClickedBefore()
        this.props.openModal()
    }

    submitEmail = () => {
        if (this.state.emailText.length !== 0) {
            this.setState({ working: true });
            this.props.submitEmail(this.state.emailText)
            this.inputText.clear()
        }
    }

    makePhoneCall = (number) => {
        this.props.trackConciergeCalledEvent();

        const params = {
            number,
            prompt: false
        }
        call(params).catch(err => console.log('An error occurred', err));
    }

    render = ()  => {
        const doRender = this.props.visible && this.props.counselor != null && this.props.componentLanguage != null

        const renderer = doRender && (
            <View style={styles.wrapper}>
                <View style={styles.concierge}>
                    <TouchableOpacity
                        onPress={() => this.openModal()} activeOpacity={0.5}>

                        {!this.props.clickedBefore && false && <View style={styles.orangeDot}></View>}

                        <Image source={Images.iconBellGray} style={{width: 86, height: 85}} />

                    </TouchableOpacity>
                </View>
                <AppModalFullScreen modalKey={'concierge'} type="gray">
                    <ScrollView style={styles.modal} contentContainerStyle={styles.modalContainer}>
                        <H4>{this.__('title')}</H4>
                        {this.props.counselor.photo &&
                            <View style={styles.avatar}>
                                <Image resizeMode='contain' style={styles.avatarPic} source={{ uri: this.props.counselor.photo }} />
                                <Image style={styles.iconChatSmall} source={Images.iconBell2} />
                            </View>
                        }
                        <H1 style={styles.helpText}>
                            { !this.props.counselor.isRoundRobin && this.__('subtitle', this.props.counselor.firstName)}
                            { this.props.counselor.isRoundRobin && this.__('subtitleRoundRobin')}
                        </H1>
                        <View style={styles.inputArea}>
                            <TextInput ref={child => {
                                this.inputText = child
                            }}
                                multiline={true}
                                maxLength={50000}
                                style={styles.inputAreaText}
                                onChangeText={(text) => this.setState({ emailText: text })}
                                placeholder={this.__('placeholder')}
                                underlineColorAndroid={"transparent"} />
                        </View>

                        { !this.props.counselor.isRoundRobin && (
                                <Button working={this.props.working}
                                style={styles.button}
                                label={this.__('emailbutton', this.props.counselor.firstName)}
                                onPress={() => this.submitEmail()} />
                            )
                        }
                        { this.props.counselor.isRoundRobin && (
                                <Button working={this.props.working}
                                    style={styles.button}
                                    label={this.__('emailbuttonRoundRobin',)}
                                    onPress={() => this.submitEmail()} />
                            )
                        }

                        { !this.props.counselor.isRoundRobin && (
                                <Button style={[styles.button, styles.callButton]}
                                    label={this.__('callbutton', this.props.counselor.firstName)}
                                    type="secondary"
                                    labelStyle={styles.callButtonText}
                                    onPress={() => this.makePhoneCall(this.props.counselor.workPhoneNumber)} />
                            )
                        }
                        { this.props.counselor.isRoundRobin && (
                                <Button style={[styles.button, styles.callButton]}
                                    label={this.__('callbuttonRoundRobin', this.props.counselor.firstName)}
                                    type="secondary"
                                    labelStyle={styles.callButtonText}
                                    onPress={() => this.makePhoneCall(this.props.counselor.workPhoneNumber)} />
                            )
                        }
                    </ScrollView>
                </AppModalFullScreen>
            </View>
        )

        return (
            renderer
        )
    }
}

const mapStateToProps = (state) => {
    const { concierge } = state

    return {
        visible: concierge.visible,
        working: concierge.working,
        clickedBefore: getConciergeClicked(state),
        counselor: getCounselorSelector(state),
        componentLanguage: getLanguageDataSelector(state, 'Concierge'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setClickedBefore: () => {
            dispatch(conciergeClicked())
        },
        openModal: () => {
            dispatch(openModalById('concierge'))
        },
        submitEmail: (emailText) => {
            dispatch(asyncSubmitEmail(emailText))
        },
        trackConciergeCalledEvent: () => {
            dispatch(asyncTrackCallConciergeEvent('Concierge Modal'))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Concierge)
