import React, { Component } from "react";
import { connect } from 'react-redux';
import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    Image,
    TouchableHighlight,
} from "react-native";
import { H1, H3, P, ScreenWrapper, ListItemCard } from "../../../Components/index";
import { __ } from '../../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../../Redux/Modules/Localization'
import S from '../../../StyleUtils/index';

import * as fromPacking from '../../../Redux/Modules/Packing';
import { navigate } from "../../../Redux/Modules/Routing";

export class PackingMaterialsOrdersScreen extends Component {
    
    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount() {
        this.props.loadOrders();
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, marginBottom: 20 }}>
                <View style={{ paddingHorizontal: 10 }}>
                    {this.props.orders.length ? (
                        this.props.orders.map((order, index) => (
                            <ListItemCard
                                cardStyles={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, paddingBottom: 20 }}
                                key={index}
                                onPress={() => this.props.goToOrder(order)}>
                                <Text style={[S.lightBlue, S.textBase, { width: '50%' }]}>
                                    {order.supply.name}
                                </Text>
                                <Text style={[S.textLg, { width: '50%', textAlign: 'right', paddingRight: 25 }]}>
                                    ${order.totalPrice}
                                </Text>
                            </ListItemCard>
                            ))
                        )   :  (
                            <View style={{ paddingHorizontal: 20 }}>
                                <H2 style={{ marginBottom: 5 }}>{this.__('noorders')}</H2>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        orders: fromPacking.getOrders(state),
        screenLanguage: getLanguageDataSelector(state, 'PackingMaterialsOrdersScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadOrders: () => { dispatch(fromPacking.loadOrders()) },
        goToOrder: (order) => {
            dispatch(fromPacking.selectOrder(order));
            dispatch(navigate({ routeName: 'PackingMaterialsOrderDetailScreen' }));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackingMaterialsOrdersScreen);
