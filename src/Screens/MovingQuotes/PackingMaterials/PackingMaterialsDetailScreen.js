import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, ImageBackground, Image, TouchableHighlight } from 'react-native';
import { H1, H3, P, ScreenWrapper, Faqs } from '../../../Components';
import {
    getCurrentSupplyInformation,
    getCurrentSupplyPricing,
    asyncPlaceSupplyOrder,
    startBuy
} from '../../../Redux/Modules/Packing';
import { __ } from '../../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../../Redux/Modules/Localization'
import images from '../../../Theme/Images';
import layout from '../../../Theme/Layout';
import colors from '../../../Theme/Colors';
import S from '../../../StyleUtils/index';
import { styles } from './Styles/PackingMaterialsDetailScreenStyles';
import { ScreenHOC } from '../../Screen';

const subItemSlugIconMapping = {
    'Box': images.boxIcon,
    'Bubble Wrap': images.bubbleWrapIcon,
    'Stretch Wrap': images.stretchWrapIcon,
    'Packing Paper': images.packingPaperIcon,
    'none': null
}

class PackingMaterialsDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    hasDimensions(child) {
        return !child.height && !child.length && !child.width
    }

    isGroupSupply(supply) {
        return supply.supplyType === 'grouped'
    }

    renderChildren(children) {
        if (!children && children.length === 0) {
            return null
        }

        return (
            <View style={S.phXxl}>
                <H3 style={styles.detailHeader}>{this.__('included')}</H3>
                {children.map((item) => {
                    const itemIcon = subItemSlugIconMapping[item.category]
                    return (
                        <View key={`${item.product_id + "packingChild"}`} style={[styles.detailItem]}>
                            <View style={[S.flexRow, S.itemsCenter, S.contentStart]}>
                                {itemIcon ? <Image style={[{ width: 12, height: 12 }, S.mrXs]} source={itemIcon} /> : null}
                                <P style={styles.itemDescription}>{item.quantity > 1 ? item.quantity + " x " + item.name : item.name}</P>
                            </View>
                            {item.size ? <P style={styles.itemDimension}>{item.size}</P> : null}
                        </View>
                    )
                })}
            </View>
        )
    }

    renderPricing(supply, pricing) {
        return (
            <View style={[{ width: "100%", flexDirection: "column", borderTopWidth: 1, borderTopColor: colors.xxLightGray }, S.phXxl]}>
                {
                    pricing.price !== pricing.fullPrice ?
                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#D8D8D8", paddingVertical: 19 }}>
                            <P style={{ fontSize: 12 }}>{this.__('price')}</P>
                            <P style={{ color: "#ED6834", textDecorationLine: "line-through" }}>{`$${pricing.fullPrice}`}</P>
                        </View> :
                        null
                }
                <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#D8D8D8", paddingVertical: 19 }}>
                    <P style={{ fontSize: 12 }}>{this.__('yourprice')}</P>
                    <P>{`$${pricing.price.toFixed(2)}`}</P>
                </View>
                <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#D8D8D8", paddingVertical: 19 }}>
                    <P style={{ fontSize: 12 }}>{this.__('tax')}</P>
                    <P>{pricing.taxPrice ? `$${pricing.taxPrice.toFixed(2)}` : 'N/A'}</P>
                </View>
                {/* <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#D8D8D8", paddingVertical: 19 }}>
          <P style={{ fontSize: 12 }}>SHIPPING</P>
          <P>{pricing.shippingCost}</P>
        </View> */
                }
                <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 19 }}>
                    <P style={{ fontSize: 12 }}>{this.__('total')}</P>
                    <P>{`$${pricing.totalPrice.toFixed(2)}`}</P>
                </View>
                <View style={{ width: "100%", alignItems: "center", justifyContent: "center", paddingVertical: 20 }}>
                    <TouchableHighlight onPress={() => this.props.startPurchase(supply.name, pricing.price, pricing.taxPrice, pricing.totalPrice)}>
                        <Image source={images.applePay} style={{ width: 180, height: 45 }} />
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

    render() {
        const { currentSupply } = this.props.supplyInfo
        const children = this.renderChildren(currentSupply.subitems)
        const pricing = this.props.supplyPricing ? this.renderPricing(currentSupply, this.props.supplyPricing) : null

        const faq = [1, 2, 3, 4].map((questionNumber)=> {
            return { question: this.__(`question${questionNumber}`), answer: this.__(`answer${questionNumber}`) }
        })

        return (
            <ScreenWrapper source={images.texture03} watermark={images.movingWatermark}>
                <ScrollView>
                    <View style={styles.scrollContainer}>
                        <Image source={currentSupply.images !== null ? { uri: currentSupply.images[0] } : null} style={styles.image} />
                        <H1 style={[styles.header]}>{currentSupply.name}</H1>
                    </View>
                    <View style={styles.childContainer}>
                        {
                            (!this.isGroupSupply(currentSupply)) ?
                                <P style={styles.description}>{currentSupply.description}</P> : null
                        }
                        <View style={styles.description}>
                            {children}
                        </View>
                    </View>
                    {pricing}
                    <Faqs data={faq} />
                </ScrollView>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        supplyInfo: getCurrentSupplyInformation(state),
        supplyPricing: getCurrentSupplyPricing(state),
        screenLanguage: getLanguageDataSelector(state, 'PackingMaterialsDetailScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        orderSupply: (sku, paymentToken) => {
            dispatch(asyncPlaceSupplyOrder(sku, paymentToken));
        },
        startPurchase: (name, price, tax, total) => {
            dispatch(startBuy(name, price, tax, total));
        }
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenHOC(PackingMaterialsDetailScreen));
