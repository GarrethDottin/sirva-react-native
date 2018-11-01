import React, { Component } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Images } from '../../Theme'

import { ScreenWrapper, IntroCard, H2, P, Button } from '../../Components';
import { TruckSizeOptions } from './TruckRental/TruckSizeOptions';

import S from '../../StyleUtils';

export default class NoQuotesScreen extends Component {
    render() {
            return (
                <View style={ [S.flex1] }>
                    <IntroCard >
                        <View style={ [S.p] }>
                            <H2 style={ [S.white, S.mb] }>
                                No quotes available
                            </H2>
                            <P style={ [S.white] }>
                                if you don't see quotes in X amount of time please contact your concierge
                            </P>
                        </View>
                    </IntroCard>
                    <View style={ [S.flex1, S.justifyBetween, S.ph, S.pb ] }>
                        <View>
                            {
                                this.props.truckOptions ?
                                <View style={ [S.ph] }>
                                    <TruckSizeOptions linkStyles={ [S.grey] }/>
                                </View> :
                                null
                            }
                            <View style={ [ this.props.truckOptions ? null : S.mt ] }>
                                {
                                [0, 1].map(() => (
                                    <View style={ [S.rounded, S.mb, S.whiteBg, S.cardShadow, S.ph8, S.pv6, S.flexRow, S.itemsCenter] }>
                                        <View style={ [{ width: 100, height: 40 }, S.rounded, S.xxLightGrayBg, S.mr6] }></View>
                                        <View style={ [ S.flexRow ] }>
                                            <Text style={ [S.xLightGray, S.textXl] }>$ 00.00 </Text>
                                        </View>
                                    </View>                            
                                ))
                                }
                            </View>
                        </View>
                        <View style={ [ S.flexRow, S.justifyCenter ] }>
                            <Button onPress={ this.props.onRetry } style={ { width: '100%' } } label="Try Again"></Button>
                        </View>
                    </View>
                </View>
            )
    }
}
