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
import dateFormat from 'dateformat'
import { H1, H3, P, ScreenWrapper, ListItemCard } from "../../../Components/index";
import { __ } from '../../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../../Redux/Modules/Localization'

import images from "../../../Theme/Images";
import { styles } from './Styles/PackingMaterialsDetailScreenStyles';

import { DataListItem } from '../../../Components/index';
import S from '../../../StyleUtils/index';

import * as fromPacking from '../../../Redux/Modules/Packing';
import { ScreenHOC } from "../../Screen";

export class PackingMaterialsOrderDetailScreen extends Component {
    
    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    render() {
        const { order } = this.props;
        return (
            <ScreenWrapper
                source={images.texture03} watermark={images.movingWatermark} containerStyles={{ height: '100%' }}>
                <ScrollView>
                    <View style={[styles.scrollContainer, { minHeight: 200, justifyContent: 'flex-end' }]}>
                        <Image source={order.supply.images !== null ? { uri: order.supply.images[0] } : null} style={styles.image} />
                        <H1 style={styles.header}>{this.props.order.supply.name}</H1>
                    </View>
                    <View style={{ padding: 37 }}>
                        <DataListItem label={this.__('yourpricelabel')} value={`$${order.price}`} />
                        <DataListItem label={this.__('taxlabel')} value={`$${order.taxPrice}`} />
                        <DataListItem label={this.__('ordertotallabel')} value={`$${order.totalPrice}`} />
                        <DataListItem label={this.__('ordernumberlabel')} value={`${order.id}`} />
                        <DataListItem label={this.__('orderdatelabel')} value={dateFormat(order.orderedAt, 'mmmm d, yyyy', true)} />
                    </View>
                </ScrollView>
            </ScreenWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        order: fromPacking.getSelectedOrder(state),
        screenLanguage: getLanguageDataSelector(state, 'PackingMaterialsOrderDetailScreen'),
    }
}

const mapDispatchToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(
    ScreenHOC(PackingMaterialsOrderDetailScreen)
);
    