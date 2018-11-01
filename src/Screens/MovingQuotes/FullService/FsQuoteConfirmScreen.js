import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Linking } from 'react-native'
import call from 'react-native-phone-call'
import dateFormat from 'dateformat'
import images from '../../../Theme/Images'
import layout from '../../../Theme/Layout'
import { Button, H2, H3, P, LI, DataListItem, OriginDestMarker, ScreenWrapper } from '../../../Components'
import styles from './Styles/FsQuoteConfirmScreenStyles'
import { getMovingQuoteDetailSelector, asyncSubmitQuoteRequest } from '../../../Redux/Modules/Moving'
import { asyncFetchRelocationData, getOriginAddressSelector, getDestinationAddressSelector, getMoveDateSelector,
    getBedroomCountSelector, getResidenceTypeSelector, getCompanySelector,
    getTransfereeSelector, getInventoryItemCountSelector  } from '../../../Redux/Modules/Relocation'
import { __, formatPhone, isValidPhone } from '../../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../../Redux/Modules/Localization'
import { checkForFeedback, setFeedbackLocationText } from '../../../Redux/Modules/Feedback'
import { formatCurrencyFromString } from '../../../Utils/ReactHelpers'
import EstimateBanner from  './EstimateBanner'
import { navigate } from '../../../Redux/Modules/Routing'
import { ScreenHOC } from '../../Screen';


class FsQuoteConfirmScreen extends Component {


    static propTypes = {}


    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }
    
    gotoScreen = (screen) => {
        this.props.gotoScreen(screen)
    }


    submitQuote = () => {
        const supplierId = this.props.quote.noyoSupplierId
        console.log('supplierId', supplierId)
        this.props.submitQuoteRequest(supplierId)
    }


    openLink = (url) => {
        //@TODO - Link
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }


    makePhoneCall = (number) => {
        //@TODO - Link
        const params = {
            number,
            prompt: false
        }
        call(params).catch(err => console.error('An error occurred', err));
    }


    render() {
        const props = this.props
        const quote = props.quote


        return (
            <ScreenWrapper
                backgroundImage={images.texture05}
                watermark={images.movingWatermark}>


                <ScrollView>
                    <EstimateBanner
                        quote={quote}
                        label={this.__('bannerlabel')}
                    />


                        <View style={[styles.details, layout.innerContainerNarrowed]}>
                            <P>
                                {this.__('note', quote.supplierData.data.name)}
                            </P>


                            <DataListItem label={this.__('estimatelabel')} value={formatCurrencyFromString(quote.avgPrice)} />
                            <DataListItem label={this.__('namelabel')} value={`${props.transferee.firstName} ${props.transferee.lastName}`} />
                            <DataListItem label={this.__('emaillabel')} value={props.transferee.email} />
                            { isValidPhone(props.transferee.mobilePhoneNumber) &&
                                <DataListItem label={this.__('phonelabel')} value={formatPhone(props.transferee.mobilePhoneNumber)} />
                            }
                            <DataListItem label={this.__('employerlabel')} value={props.company.name} />
                            <DataListItem label={this.__('residencelabel')} value={this.__('housedescription', [props.bedroomCount, props.residenceType])} />
                            <DataListItem label={this.__('originlabel')} value={`${props.originAddress.city} , ${props.originAddress.state}`} />
                            <DataListItem label={this.__('destinationlabel')} value={`${props.destinationAddress.city} , ${props.destinationAddress.state}`} />
                            <DataListItem label={this.__('movedatelabel')} value={dateFormat(props.moveDate, 'mmm d, yyyy', true)} />


                            {props.inventoryItemCount > 0 &&
                                <DataListItem label="INVENTORY" value={this.__('inventorynote')} />
                            }


                        <Button onPress={() => {
                            this.submitQuote()
                            this.props.feedbackCheck()
                            this.props.feedbackText(
                                this.__("moodTrackerTitle"),
                                this.__("moodTrackerText")
                            )
                        }} style={styles.button} label={this.__('button')} />
                    </View>
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
        company: getCompanySelector(state),
        transferee: getTransfereeSelector(state),
        inventoryItemCount: getInventoryItemCountSelector(state),
        screenLanguage: getLanguageDataSelector(state, 'FsQuoteConfirmScreen'),
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen) => {
            dispatch(navigate({ routeName: screen }));
        },
        submitQuoteRequest: (supplierId) => {
            dispatch(asyncSubmitQuoteRequest(supplierId))
        },
        feedbackCheck: () => {
            dispatch(checkForFeedback('moodTrackerMoverQuote'))
        },
        feedbackText: (title, text) => {
            dispatch(setFeedbackLocationText(title, text))
        }
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(FsQuoteConfirmScreen))

