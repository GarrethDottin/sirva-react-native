import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ScrollView, View, Image, TouchableOpacity } from 'react-native'
import dateFormat from 'dateformat'
import { getAddress, getStartDateTime, getWorkers, getHours, getQuoteData, asyncGetQuote, startPurchase } from '../../Redux/Modules/Labor'
import { formatCurrencyFromString, formatAddressFromObject } from '../../Utils/ReactHelpers'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { ScreenWrapper, H2, P, DataListItem, OfferInline } from '../../Components'
import { Images, Colors } from '../../Theme'
import styles from './Styles/LaborReviewScreenStyles'
import { ScreenHOC } from '../Screen';

class LaborReviewScreen extends Component {

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount = () => {
        this.props.getQuote()
    }

    isScreenReady = () => {
        return this.props.quoteData !== null
    }
    
    render() {
        const quoteData = this.props.quoteData

        return (
            <ScreenWrapper backgroundImage={Images.texture05} watermark={Images.movingWatermark}>
                {this.isScreenReady() &&
                    <ScrollView>                      
                        <View style={styles.wrapper}>                  
                            <H2 style={styles.introTitle}>{this.__('title')}</H2>
                            <View style={styles.detailsDatalist}>
                                <DataListItem label={this.__('laborlabel')} value={this.__('laborvalue', this.props.workers)} />
                                <DataListItem label={this.__('durationlabel')} value={this.__('durationvalue', this.props.hours)} />
                                <DataListItem label={this.__('address')} value={formatAddressFromObject(this.props.address, true)} />
                                <DataListItem label={this.__('date')} value={dateFormat(this.props.laborStartDateTime, 'mmmm d, yyyy')} />
                                <DataListItem style={styles.dataListLastItem} label={this.__('starttime')} value={dateFormat(this.props.laborStartDateTime, 'h:MM TT')} />
                            </View>
                        </View>

                        <View style={[Layout.outerContainerAlt, styles.offer]}>
                            <OfferInline copy={this.__('discountpromo')} />
                        </View>

                        <View style={styles.totalsWrapper}>                  
                            <View style={styles.datalist}>
                                <DataListItem valueStyle={styles.price} label={this.__('pricelabel')} value={formatCurrencyFromString((quoteData.price * 1.15), true)} />
                                <DataListItem valueStyle={styles.yourPrice} label={this.__('yourpricelabel')} value={formatCurrencyFromString(quoteData.price, true)} />                    
                                <DataListItem 
                                    valueStyle={styles.total} 
                                    style={styles.dataListLastItem}
                                    label={this.__('totallabel')} value={formatCurrencyFromString(quoteData.fullPrice, true)} 
                                />
                            </View>

                            <P style={styles.paymentCopy}>{this.__('paymentnote')}</P>

                            <TouchableOpacity onPress={() => 
                                this.props.startPurchase(quoteData.supplierName, quoteData.price, quoteData.fullPrice)}
                            >
                                <Image source={Images.applePay} style={styles.payButton} />
                            </TouchableOpacity>

                            <P style={styles.noteCopy}>{this.__('cancelnote')}</P>
                        </View>
                    </ScrollView>
                }
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        address: getAddress(state), 
        laborStartDateTime: getStartDateTime(state),
        workers: getWorkers(state),
        hours: getHours(state),
        quoteData: getQuoteData(state),
        screenLanguage: getLanguageDataSelector(state, 'LaborReviewScreen')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getQuote: () => {
            dispatch(asyncGetQuote())
        },
        startPurchase: (name, price, total) => {
            dispatch(startPurchase(name, price, 0, total));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(LaborReviewScreen))
