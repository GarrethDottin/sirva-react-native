import React, { Component } from "react";

import {
    View, Text, ScrollView
} from "react-native";
import { connect } from "react-redux";
import {
    ScreenWrapper,
    TopNavHeader,
    Faqs
} from "../../../Components/index";

import S from '../../../StyleUtils/index';
import { __ } from '../../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../../Redux/Modules/Localization'
import PackingMaterialsScreen from './PackingMaterialsScreen';
import PackingMaterialsOrdersScreen from './PackingMaterialsOrdersScreen';
import { ScreenHOC } from "../../Screen";


class PackingMaterialsWrapper extends Component {
    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)

        this.state = {
            selectedMenuIndex: 0,
            menus: [this.__('topnavshop'), this.__('topnavorderhistory')]
        }
    }

    selectedMenu() {
        this.state.menus[this.state.selectedMenuIndex];
    }

    isShopSelected() {
        return this.state.selectedMenuIndex === 0;
    }

    isOrdersSelected() {
        return this.state.selectedMenuIndex === 1;
    }

    render() {
        const faq = [1, 2, 3, 4].map((questionNumber)=> {
            return { question: this.__(`question${questionNumber}`), answer: this.__(`answer${questionNumber}`) }
        })

        return (
            <ScreenWrapper
                backgroundImage={images.texture03}
                watermark={images.movingWatermark}>
                <View style={ S.flex1 }>
                    <View style={{ margin: 0 }}>
                        <TopNavHeader
                            data={this.state.menus}
                            onPress={(index) => {
                                this.setState({
                                    ...this.state,
                                    selectedMenuIndex: index
                                })
                            }}
                            selectedId={this.state.selectedMenuIndex}
                            style={{ paddingLeft: 10, paddingRight: 0, width: '100%', justifyContent: 'space-around', borderBottomColor: colors.xxLightGray, borderBottomWidth: 0.5 }}
                            linkStyles={[S.textXs, { fontWeight: 'bold' }]}
                        />
                    </View>
                    <ScrollView>
                        {this.isShopSelected() ? <PackingMaterialsScreen /> : <PackingMaterialsOrdersScreen />}
                        {this.isShopSelected() ? <Faqs data={faq} containerStyles={S.mt} /> : null }
                    </ScrollView>
                </View>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        screenLanguage: getLanguageDataSelector(state, 'PackingMaterialsWrapper'),
    }
}
export default connect(
    mapStateToProps,
    undefined
)(ScreenHOC(PackingMaterialsWrapper))
