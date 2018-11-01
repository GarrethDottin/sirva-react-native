import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ScrollView, View, Image, TouchableOpacity } from 'react-native'
import dateFormat from 'dateformat'
import { getOrderDetails, asyncPurchseDone } from '../../Redux/Modules/Labor'
import { formatCurrencyFromString, formatAddressFromObject } from '../../Utils/ReactHelpers'
import { ScreenWrapper, H2, P, DataListItem, Link, Button } from '../../Components'
import { Images, Colors, Layout } from '../../Theme'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { checkForFeedback, setFeedbackLocationText } from '../../Redux/Modules/Feedback'
import styles from './Styles/LaborSuccessScreenStyles'
import { navigate } from '../../Redux/Modules/Routing';
import { ScreenHOC } from '../Screen';

class LaborSuccessScreen extends Component {
    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount = () => {
        if (!this.props.orderDetails) {
            this.props.gotoScreen('LaborLanding')
            return
        }
    }

    isScreenReady = () => {
        return this.props.orderDetails !== null
    }

    render() {
        const details = this.props.orderDetails

        return ( 
            <ScreenWrapper backgroundImage={Images.texture05} watermark={Images.movingWatermark}>
                {this.isScreenReady() &&
                    <ScrollView contentContainerStyle={Layout.bottomSpacer}>
                        <View style={styles.wrapper}>                  
                            <H2 style={styles.introTitle}>{this.__('title')}</H2>
                            <View style={styles.detailsDatalist}>
                                <DataListItem label={this.__('ordertotal')}>
                                    <P style={styles.total}>{formatCurrencyFromString(details.fullPrice)}</P>
                                    <P style={styles.note}>{this.__('paymentnote')}</P>
                                </DataListItem> 
                                <DataListItem label={this.__('ordernumber')} value={details.noyoOrderId} />
                                <DataListItem label={this.__('companyhired')} value={details.supplierName} />
                            </View>

                            <Link style={styles.detailsLink} onPress={() => this.props.gotoDetail(details.noyoOrderId)}>FULL DETAILS</Link>

                            <Button label={this.__('button')} style={styles.button} onPress={() => {
                                this.props.purchaseDone()
                                this.props.feedbackCheck()
                                this.props.feedbackText(
                                    this.__("moodTrackerTitle"),
                                    this.__("moodTrackerText")
                                )
                            }} />

                        </View>
                    </ScrollView>
                }
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orderDetails: getOrderDetails(state),
        screenLanguage: getLanguageDataSelector(state, 'LaborSuccessScreen')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen) => {
            dispatch(navigate({ routeName: screen }));
        },
        gotoDetail: (id) => {
            dispatch(navigate({ routeName: 'LaborOrderDetail', params: { orderId: id } }));
        },
        purchaseDone: ()=> { 
            dispatch(asyncPurchseDone()) 
        },
        feedbackCheck: () => {
            dispatch(checkForFeedback('moodTrackerLabor'))
        },
        feedbackText: (title, text) => {
            dispatch(setFeedbackLocationText(title, text))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(LaborSuccessScreen))