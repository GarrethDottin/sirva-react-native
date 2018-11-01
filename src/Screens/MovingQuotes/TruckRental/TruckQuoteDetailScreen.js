import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Linking, ScrollView, View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native'
import call from 'react-native-phone-call'
import dateFormat from 'dateformat'
import { Images, Layout} from '../../../Theme'
import { Button, H2, P, OriginDestMarker, ScreenWrapper, OfferInline, Faqs } from '../../../Components'
import { __, formatCurrencyFromString, formatPhone, isValidPhone } from '../../../Utils/ReactHelpers'
import { getLanguageDataSelector, getInlineOffersDataSelector } from '../../../Redux/Modules/Localization'
import styles from './Styles/TruckQuoteDetailScreenStyles'
import { getTruckQuoteDetailSelector } from '../../../Redux/Modules/Moving'
import { asyncFetchRelocationData, getOriginAddressSelector, getDestinationAddressSelector, getMoveDateSelector,
    getBedroomCountSelector, getResidenceTypeSelector  } from '../../../Redux/Modules/Relocation'
import S from '../../../StyleUtils'

class TruckQuoteDetailScreen extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount = () => {
        if (this.props.originAddress == null) {
            this.props.refreshData()
        }
    }

    openLink = (url) => {
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
        const hasData = this.props.originAddress != null && this.props.quote != null
        const company = quote.company == 'uhaul' ? 'U-Haul' : quote.company

        const faq = [1, 2].map((questionNumber)=> {
            return { question: this.__(`question${questionNumber}`), answer: this.__(`answer${questionNumber}`) }
        })

        return (
            <ScreenWrapper
                backgroundImage={Images.texture05}
                watermark={Images.movingWatermark}>

                <ScrollView>
                    <View style={[styles.summary, Layout.innerContainerNarrowed]}>
                        <View  style={styles.summaryColumn}>
                            <Image style={styles.brandLogo} resizeMode='contain' source={{ uri: quote.companyInfo.logo }} />
                            <H2 style={styles.name}>{company}</H2>
                            {/*<P style={styles.subname}>Professional Movers</P>*/}
                        </View>
                        <View style={styles.summaryColumn}>
                            <Text style={styles.price}>{formatCurrencyFromString(quote.quote)}</Text>
                        </View>
                    </View>
                    <View style={[styles.details, Layout.innerContainerNarrowed]}>
                        <OriginDestMarker
                            originCity={props.originAddress.city}
                            originState={props.originAddress.state}
                            destCity={props.destinationAddress.city}
                            destState={props.destinationAddress.state}
                        />

                        <View style={styles.meta}>
                            <Text style={styles.label}>{this.__('trucksizelabel')}</Text>
                            <P>{quote.size} {this.__('truck')}</P>
                        </View>
                        <View style={styles.meta}>
                            <Text style={styles.label}>{this.__('pickuplabel')}</Text>
                            <P>{quote.pickUp}</P>
                        </View>
                        <View style={styles.meta}>
                            <Text style={styles.label}>{this.__('dropofflabel')}</Text>
                            <P>{quote.dropOff}</P>
                        </View>
                        <View style={styles.meta}>
                            <Text style={styles.label}>{this.__('movedatelabel')}</Text>
                            <P>{dateFormat(props.moveDate, 'mmm d, yyyy', true)}</P>
                        </View>

                        {this.props.offersLanguage[quote.company] &&
                            <OfferInline style={styles.offer} copy={this.props.offersLanguage[quote.company]} />
                        }

                        <Button onPress={() => this.openLink(quote.companyInfo.website)} style={styles.button} label="Book Online" />

                        <View style={styles.section}>
                            <H3 style={styles.sectionHeader}>{this.__('services')}</H3>

                            <View style={styles.include}>
                                <Image source={images.iconCheckmark} style={styles.checkmark} />
                                <P style={styles.label}>{this.__('provided')}</P>
                            </View>
                            {quote.companyInfo.services.map((service, i) => {
                                    return (<Li key={i}>{service}</Li>)
                            })}
                            {/*
                            <View style={[styles.include, styles.notincluded]}>
                                <Image source={images.iconXOrange} style={styles.xmark} />
                                <P style={styles.label}>NOT PROVIDED</P>
                            </View>
                            <Li>Loading/Unloading</Li>
                            <Li>Provide Cost Estimates</Li>
                            <Li>Scheduling</Li>
                            <Li>Packing/Unpacking</Li>
                            <Li>Transport</Li>
                            <Li>Create and Follow Checklists</Li>
                            <Li>Packing Materials</Li>
                            */}
                        </View>
                        <View style={styles.section}>
                            <H3 style={styles.sectionHeader}>{this.__('contact')}</H3>
                            <TouchableOpacity style={styles.contactAction} onPress={() => this.openLink(quote.companyInfo.website)} activeOpacity={0.5}>
                                <P style={styles.contactActionCopy}>{quote.companyInfo.website.replace('http://', '').replace('https://', '')}</P>
                                <Image style={styles.externalLink} source={images.iconExternalLink} />
                            </TouchableOpacity>

                            {isValidPhone(quote.companyInfo.phone) &&
                            <TouchableOpacity style={styles.contactAction} onPress={() => this.makePhoneCall(quote.companyInfo.phone)} activeOpacity={0.5}>
                                <P style={styles.contactActionCopy}>{formatPhone(quote.companyInfo.phone)}</P>
                                <Image style={styles.phone} source={images.iconPhone} />
                            </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.section}>
                            <H3 style={styles.sectionHeader}>{this.__('about')}</H3>
                            <P>
                                {quote.companyInfo.about}
                            </P>
                        </View>
                        {/*
                        <View>
                            <Text style={styles.notice}>Last quote requested 3 days ago</Text>
                        </View>
                        */}
                    </View>
                    <Faqs data={faq} containerStyles={[S.mt, {marginTop: 30}]} />
                </ScrollView>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        quote: getTruckQuoteDetailSelector(state),
        originAddress: getOriginAddressSelector(state),
        destinationAddress: getDestinationAddressSelector(state),
        moveDate: getMoveDateSelector(state),
        screenLanguage: getLanguageDataSelector(state, 'TruckQuoteDetailScreen'),
        offersLanguage: getInlineOffersDataSelector(state, 'rentaltrucks')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        refreshData: () => {
            dispatch(asyncFetchRelocationData());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TruckQuoteDetailScreen)
