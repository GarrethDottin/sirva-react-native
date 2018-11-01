import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, ScrollView, TouchableOpacity, Linking } from 'react-native'
import call from 'react-native-phone-call'
import { asyncFetchRelocationData, getCounselorSelector, getHrContactSelector, getCompanySelector } from '../../Redux/Modules/Relocation'
import { asyncTrackCallConciergeEvent } from '../../Redux/Modules/Analytics'
//import { } from '../../Redux/Modules/Relocation'
import { ScreenWrapper, H4, H3, P, DataListItem, DrawerMenu } from '../../Components'
import { Images, Layout } from '../../Theme'
import { __, formatPhone, isValidPhone } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from './Styles/ContactsScreenStyles'
import { ScreenHOC } from '../Screen';

class ContactsScreen extends Component {

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    openEmailLink = (email) => {
        const url = `mailto:${email}?subject=iMOVE contact`
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    makePhoneCall = (number, whois) => {
        if (whois == 'concierge') {
            this.props.trackConciergeCalledEvent();
        }

        const params = {
            number,
            prompt: false
        }
        call(params).catch(err => console.error('An error occurred', err));
    }

    render = () => {
        const relocationData = this.props.relocationData
        const c = this.props.counselor
        const hr = this.props.hrContact
        const company = this.props.company



        const companyImage = (company.logo !== null)
            ? <Image style={styles.hrLogo} source={{ uri: company.logo }} />
            : ''
        const bgColor2Style = (company.brandColor2 !== null)
            ? { backgroundColor: company.brandColor2 }
            : { }

        const introTextColorStyle = (company.welcomeTextColor !== null)
            ? { color: company.welcomeTextColor }
            : { }

        return (
            <ScreenWrapper backgroundImage={Images.texture02}>
                <ScrollView contentContainerStyle={[
                    Layout.fullHeight,
                    Layout.outerContainerAlt,
                    styles.scrollWrapper
                ]}>
                    {c &&
                        <View style={styles.card}>
                            <View style={styles.cardHeaderContainer}>
                                <H4 style={styles.cardHeader}>{this.__('conciergecardtitle')}</H4>
                            </View>

                            {c.photo &&
                                <View style={styles.avatar}>
                                    <Image resizeMode='contain' style={styles.avatarPic} source={{ uri: c.photo }} />
                                </View>
                            }
                            <View style={styles.cardContent}>
                                {!c.isRoundRobin && <H3 style={styles.cardName}>{c.firstName} {c.lastName}</H3>}
                                {!c.isRoundRobin && c.title && <P style={styles.cardLocation}>{c.title}</P>}

                                {c.shortBio && <P style={styles.smallText}>{c.shortBio}</P>}
                            </View>
                            <View style={styles.contactActionContainer}>
                                <TouchableOpacity style={[styles.contactAction, styles.firstAction]} onPress={() => this.openEmailLink(c.email)} activeOpacity={0.5}>
                                    <P style={styles.contactActionCopy}>{c.email}</P>
                                    <Image style={[styles.contactActionIcon, styles.emailIcon]} source={images.iconEmail} />
                                </TouchableOpacity>
                                {isValidPhone(c.workPhoneNumber) &&
                                    <TouchableOpacity style={[styles.contactAction, styles.lastAction]} onPress={() => this.makePhoneCall(c.workPhoneNumber, 'concierge')} activeOpacity={0.5}>
                                        <P style={styles.contactActionCopy}>{formatPhone(c.workPhoneNumber)}</P>
                                        <Image style={[styles.contactActionIcon, styles.phoneIcon]} source={images.iconPhone} />
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    }
                    {hr &&
                        <View style={styles.card}>
                            <View style={[styles.cardHeaderContainer, bgColor2Style]}>
                                <H4 style={[styles.cardHeader, introTextColorStyle]}>{company.name}</H4>
                            </View>
                            <View style={[styles.cardContent, styles.hrCardContent]}>
                                <View style={styles.hrDetails}>
                                    <View>
                                        <H3 style={[styles.cardName, styles.hrCardName]}>{hr.firstName} {hr.lastName}</H3>
                                        <P style={[styles.cardLocation, styles.hrCardLocation]}>{hr.title}</P>
                                    </View>
                                    {companyImage}
                                </View>
                                <P style={[styles.smallText, styles.hrSmallText]}>{hr.shortBio}</P>
                            </View>
                            <View style={styles.contactActionContainer}>
                                <TouchableOpacity style={[styles.contactAction, styles.firstAction]} onPress={() => this.openEmailLink(hr.email)} activeOpacity={0.5}>
                                    <P style={styles.contactActionCopy}>{hr.email}</P>
                                    <Image style={[styles.contactActionIcon, styles.emailIcon]} source={images.iconEmail} />
                                </TouchableOpacity>
                                {isValidPhone(hr.workPhoneNumber) &&
                                    <TouchableOpacity style={[styles.contactAction, styles.lastAction]} onPress={() => this.makePhoneCall(hr.workPhoneNumber)} activeOpacity={0.5}>
                                        <P style={styles.contactActionCopy}>{formatPhone(hr.workPhoneNumber)}</P>
                                        <Image style={[styles.contactActionIcon, styles.phoneIcon]} source={images.iconPhone} />
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    }
                </ScrollView>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        relocationData: state.relocation.relocationData,
        counselor: getCounselorSelector(state),
        screenLanguage: getLanguageDataSelector(state, 'ContactsScreen'),
        company: getCompanySelector(state),
        hrContact: getHrContactSelector(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        trackConciergeCalledEvent: () => {
            dispatch(asyncTrackCallConciergeEvent('Contacts Screen'))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(ContactsScreen))
