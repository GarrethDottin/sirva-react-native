import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Linking } from 'react-native'
import call from 'react-native-phone-call'
import dateFormat from 'dateformat'
import images from '../../../Theme/Images'
import layout from '../../../Theme/Layout'
import { Button, Link, H2, H3, P, LI, DataListItem, OriginDestMarker, ScreenWrapper, OfferInline, Faqs, AppModalFullScreen, HtmlView } from '../../../Components'
import styles from './Styles/FsQuoteDetailScreenStyles'
import { getMovingQuoteDetailSelector } from '../../../Redux/Modules/Moving'
import { asyncFetchRelocationData, getOriginAddressSelector, getDestinationAddressSelector, getMoveDateSelector,
    getBedroomCountSelector, getResidenceTypeSelector  } from '../../../Redux/Modules/Relocation'
import { __, formatCurrencyFromString, formatPhone, isValidPhone } from '../../../Utils/ReactHelpers'
import { getLanguageDataSelector, getInlineOffersDataSelector } from '../../../Redux/Modules/Localization'
import EstimateBanner from  './EstimateBanner'
import { navigate } from '../../../Redux/Modules/Routing';
import { ScreenHOC } from '../../Screen';
import S from '../../../StyleUtils';
import { openModalById } from '../../../Redux/Modules/Modal';

class FsQuoteDetailScreen extends Component {


    static propTypes = {}


    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }


    gotoScreen = (screen) => {
        this.props.gotoScreen(screen)
    }


    openLink = (url) => {
        //@TODO - Link
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }


    makePhoneCall = (number) => {
        const params = {
            number,
            prompt: false
        }
        call(params).catch(err => console.error('An error occurred', err));
    }


    render() {
        const props = this.props
        const quote = props.quote

        const faq = [1, 2, 3, 4].map((questionNumber)=> {
            return { question: this.__(`question${questionNumber}`), answer: this.__(`answer${questionNumber}`) }
        })

        return (
            <ScreenWrapper
                backgroundImage={images.texture05}
                watermark={images.movingWatermark}>


                <ScrollView contentContainerStyle={layout.bottomSpacer}>
                    <EstimateBanner
                        quote={quote}
                        label={this.__('bannerlabel')}
                    />


                    <View style={[styles.details, layout.innerContainerNarrowed]}>
                        <OriginDestMarker
                            originCity={props.originAddress.city}
                            originState={props.originAddress.state}
                            destCity={props.destinationAddress.city}
                            destState={props.destinationAddress.state}
                        />


                        <DataListItem label={this.__('residencelabel')} value={this.__('housedescription', [props.bedroomCount, props.residenceType])} />
                        <DataListItem label={this.__('movedatelabel')} value={dateFormat(props.moveDate, 'mmm d, yyyy', true)} />


                        {this.props.offersLanguage[quote.supplierData.data.name.replace(/ /g, '')] &&
                            <OfferInline style={styles.offer} copy={this.props.offersLanguage[quote.supplierData.data.name.replace(/ /g, '')]} />
                        }


                        <Button onPress={() => this.gotoScreen('FsQuoteConfirm')} style={styles.button} label={this.__('requestquotebutton')} />
                        {/*
                        <View>
                            <Text style={styles.notice}>Last quote requested 3 days ago</Text>
                        </View>
                        */}
                        <View style={styles.section}>
                            <H3 style={styles.sectionHeader}>{this.__('services')}</H3>

                            <View style={styles.include}>
                                <Image source={images.iconCheckmark} style={styles.checkmark} />
                                <P style={styles.label}>{this.__('provided')}</P>
                            </View>


                            {quote.supplierData.data.services.map((service, i) => {
                                return (<Li key={i}>{service}</Li>)
                            })}


                        </View>
                        <View style={styles.section}>
                            <H3 style={styles.sectionHeader}>{this.__('contact')}</H3>
                            <TouchableOpacity style={styles.contactAction} onPress={() => this.openLink(quote.supplierData.data.website)} activeOpacity={0.5}>
                                <P style={styles.contactActionCopy}>{quote.supplierData.data.website.replace('http://', '').replace('https://', '')}</P>
                                <Image style={styles.externalLink} source={images.iconExternalLink} />
                            </TouchableOpacity>
                            { isValidPhone(quote.supplierData.data.phone) &&
                                <TouchableOpacity style={styles.contactAction} onPress={() => this.makePhoneCall(quote.supplierData.data.phone)} activeOpacity={0.5}>
                                    <P style={styles.contactActionCopy}>{formatPhone(quote.supplierData.data.phone)}</P>
                                    <Image style={styles.phone} source={images.iconPhone} />
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.section}>
                            <H3 style={styles.sectionHeader}>{this.__('about')}</H3>
                            <P>
                                {quote.supplierData.data.about}
                            </P>
                        </View>
                        <View style={ [S.flexRow, S.justifyCenter] }>
                            <Link onPress={()=> this.props.openModal('detail-fsquote-legal')}>
                                iMOVE Notices & Disclaimers
                            </Link>
                        </View>

                    </View>
                    <Faqs data={faq} containerStyles={S.mt} />

                    <AppModalFullScreen modalKey={"detail-fsquote-legal"} type="gray">
                        <View style={ [S.flex1] }>
                            <View style={ { height: '100%' } }>
                                <HtmlView source={ { html: `<style> html { font-family: 'Nunito Sans'; color: white; padding-top: 16 }</style>${this.__('moving_legal_text')}` } } ></HtmlView>
                            </View>
                        </View>
                    </AppModalFullScreen>
                </ScrollView>
            </ScreenWrapper>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        quote: getMovingQuoteDetailSelector(state),
        originAddress: getOriginAddressSelector(state),
        destinationAddress: getDestinationAddressSelector(state),
        moveDate: getMoveDateSelector(state),
        bedroomCount: getBedroomCountSelector(state),
        residenceType: getResidenceTypeSelector(state),
        screenLanguage: getLanguageDataSelector(state, 'FsQuoteDetailScreen'),
        offersLanguage: getInlineOffersDataSelector(state, 'movingquotes')
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen) => {
            dispatch(navigate({ routeName: screen }));
        },
        openModal: (modalId) => {
            dispatch(openModalById(modalId))
        }
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(FsQuoteDetailScreen))

