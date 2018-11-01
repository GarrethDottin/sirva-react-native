import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ScrollView, View, Image, TouchableOpacity } from 'react-native'
import { getOrderHistory, asyncGetOrderHistory } from '../../Redux/Modules/Labor'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import dateFormat from 'dateformat'
import { formatCurrencyFromString, formatAddressFromObject } from '../../Utils/ReactHelpers'
import { ScreenWrapper, H2, P, DataListItem } from '../../Components'
import { Images, Colors, Layout } from '../../Theme'
import styles from './Styles/LaborOrderDetailScreenStyles'
import { navigate } from '../../Redux/Modules/Routing';
import { ScreenHOC } from '../Screen';

class LaborOrderDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount = () => {
        if (this.props.orderHistory === null) {
            this.props.getHistory()
        }
    }

    render() {
        let renderer = <View></View>

        if (this.props.orderHistory !== null) {
            const orderId = this.props.navigation.state.params.orderId
            
            const orders = this.props.orderHistory.filter((item) => {
                return item.noyoOrderId == orderId
            })
            
            if (orders.length === 1) {
                const order = orders[0]
                const serviceTime = new Date(order.datetime)
                const isComplete = (serviceTime < new Date())


                let completeMessage = null
                let paymentMessage = null
                let cancelmessage = null
                if (isComplete) {
                    completeMessage = <P style={styles.completeMessage}>{this.__('completednote', dateFormat(order.createdAt, 'mmmm d, yyyy')).toUpperCase()}</P>
                } else {
                    paymentMessage = <P style={styles.totalNote}>{this.__('paymentnote')}</P>
                    cancelmessage = 
                        <P style={styles.note}>
                            {this.__('cancelnote')}
                        </P>
                }

                renderer = 
                    <ScreenWrapper backgroundImage={Images.texture05} watermark={Images.movingWatermark}>
                        <ScrollView contentContainerStyle={{ paddingBottom: 130 }}>
                            {completeMessage}
                            <View style={styles.wrapper}>                  
                                <H2 style={styles.introTitle}>{this.__('ordersummary', [order.helpers, order.hours])}</H2>
                                <View style={styles.datalist}>
                                    <DataListItem label={this.__('ordertotallabel')}>
                                        <P style={styles.total}>{formatCurrencyFromString(order.fullPrice, true)}</P>
                                        {paymentMessage}
                                    </DataListItem>
                                    <DataListItem label={this.__('ordernumberlabel')} value={order.noyoOrderId} />
                                    <DataListItem style={styles.dataListLastItem} label={this.__('orderdatelabel')} value={dateFormat(order.createdAt, 'mmmm d, yyyy')} />
                                </View>
                            </View>

                            <View style={styles.sectionHeaderWrapper}>   
                                <P style={styles.sectionHeader}>{this.__('detailsheader')}</P>
                            </View>

                            <View style={styles.wrapper}>
                                <View style={styles.datalist}>
                                    <DataListItem label={this.__('laborlabel')} value={this.__('laborvalue', order.helpers)}  />
                                    <DataListItem label={this.__('durationlabel')} value={this.__('durationvalue', order.hours)} />
                                    <DataListItem label={this.__('detailsaddresslabel')} value={formatAddressFromObject(order.billingAddressData.data, true)} />
                                    <DataListItem label={this.__('detailsdatelabel')} value={dateFormat(serviceTime, 'mmmm d, yyyy')} />
                                    <DataListItem style={styles.dataListLastItem} label={this.__('detailstimelabel')} value={dateFormat(serviceTime, 'h:MM TT')} />
                                </View>
                            </View>
                            
                            <View style={styles.sectionHeaderWrapper}>   
                                <P style={styles.sectionHeader}>{this.__('companyheader')}</P>
                            </View>

                            <View style={styles.wrapper}>
                                <View style={styles.datalist}>
                                    <DataListItem label={this.__('companylabel')} value={order.supplierName} />
                                    { order.supplierPhone && <DataListItem label={this.__('phonelabel')} value={order.supplierPhone} /> } 
                                    <DataListItem style={styles.dataListLastItem} label={this.__('emaillabel')} value={"awesomemovers@gmail.com"} />
                                </View>
                            </View>

                            {cancelmessage}
                        </ScrollView>
                    </ScreenWrapper>
            }
        }

        return (
            renderer
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        orderHistory: getOrderHistory(state),
        screenLanguage: getLanguageDataSelector(state, 'LaborOrderDetailScreen')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen) => {
            dispatch(navigate({ routeName: screen }));
        },
        getHistory: () => {
            dispatch(asyncGetOrderHistory())
        }, 
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(LaborOrderDetailScreen))