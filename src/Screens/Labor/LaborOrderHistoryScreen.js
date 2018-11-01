import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ScrollView, View, Image, TouchableOpacity } from 'react-native'
import { getOrderHistory, asyncGetOrderHistory } from '../../Redux/Modules/Labor'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { ScreenWrapper, H2, H4, P, TopNavHeader } from '../../Components'
import { formatCurrencyFromString, formatAddressFromObject } from '../../Utils/ReactHelpers'
import { Images } from '../../Theme'
import styles from './Styles/LaborOrderHistoryScreenStyles'
import { navigate } from '../../Redux/Modules/Routing';
import { ScreenHOC } from '../Screen';

class LaborOrderHistoryScreen extends Component {  

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount = () => {
        if (this.props.orderHistory === null) {
            this.props.getHistory()
        }
    }

    handleHeaderSelection = (index) => {
        if (index === 0) this.props.gotoScreen('LaborLanding')
    }

    isScreenReady = () => {
        return this.props.orderHistory !== null
    }

    render() {
        let listItems = <H2 style={styles.emptyMessage}>{this.__('noorders')}</H2>
        
        if (this.props.orderHistory && this.props.orderHistory.length !== 0) {
            listItems = this.props.orderHistory.map((item) => {
                return (
                    <TouchableOpacity key={item.noyoOrderId} onPress={() => { this.props.gotoDetail(item.noyoOrderId) }}>
                        <View style={styles.card}>
                            <View style={styles.cardInfo}>
                                <P style={styles.cardWorkers}>{this.__('ordersummary', [item.helpers, item.hours])}</P>
                                <H4>{formatAddressFromObject(item.billingAddressData.data, true).toUpperCase()}</H4>
                            </View>
                            <H2 style={styles.cardTotal}>{formatCurrencyFromString(item.fullPrice, true)}</H2>
                            <Image source={Images.iconArrowheadBlue} style={styles.cardArrow} />
                        </View>
                    </TouchableOpacity>
                )
            })          
        }

        return (
            <ScreenWrapper backgroundImage={Images.texture05} watermark={Images.movingWatermark}>
                <ScrollView contentContainerStyle={{ paddingBottom: 130 }}>
                    <TopNavHeader 
                        data={[this.__('tabnavhelpers'), this.__('tabnavhistory')]}
                        selectedId={1}
                        onPress={(index) => this.handleHeaderSelection(index)} 
                    />                        
                    <View style={styles.wrapper}>
                        {listItems}
                    </View>
                </ScrollView>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        orderHistory: getOrderHistory(state),
        screenLanguage: getLanguageDataSelector(state, 'LaborOrderHistoryScreen')
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
        getHistory: () => {
            dispatch(asyncGetOrderHistory())
        },        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(LaborOrderHistoryScreen))
