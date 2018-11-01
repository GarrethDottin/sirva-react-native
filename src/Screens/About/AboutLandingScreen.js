import React, { Component } from "react";
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { ScreenWrapper, P, H2, H3, Link } from '../../Components';
import { ScreenHOC } from '../Screen';

import * as fromRouting from '../../Redux/Modules/Routing';

import S from '../../StyleUtils';

const PolicyLineItem = ({ onPress = null, children }) => {
    return (
        <View style={ [S.pv6, S.borderbHair, S.xLightGrayBorderb ] }>
            <Link onPress={onPress} style={ [S.m0, S.pt0, S.pb0] } textStyle={ S.fontNormal }>
                {children}
            </Link>
        </View>
    )
}

class AboutLandingScreen extends Component {
    render() {
        return (
            <ScreenWrapper>
                <View style={ S.flex1 }>
                    <ScrollView contentContainerStyle={ [S.p8] }>
                        <P style={ S.mb8 }>
                            iMOVE is an application created by SIRVA to help assist with relocation.
                        </P>

                        <H3 style={ [S.black, S.fontSemiBold] }>
                            Help & Policies
                        </H3>

                        <View>
                            <PolicyLineItem onPress={()=> this.props.navigateToHelp('help') }>Help & Support</PolicyLineItem>
                            <PolicyLineItem onPress={()=> this.props.navigateToHelp('terms') }>Terms & Conditions</PolicyLineItem>
                            <PolicyLineItem onPress={()=> this.props.navigateToHelp('privacy') }>Privacy Policy</PolicyLineItem>
                            <PolicyLineItem onPress={()=> this.props.navigateToHelp('noticies') }>Noticies & Disclaimers</PolicyLineItem>
                            <PolicyLineItem onPress={()=> this.props.navigateToHelp('copyright') }>Copyright</PolicyLineItem>
                            <PolicyLineItem onPress={()=> this.props.navigateToHelp('opensource') }>Open Source Licenses</PolicyLineItem>
                        </View>
                    </ScrollView>
                </View>
            </ScreenWrapper>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigateToHelp: (helpScreen)=> {
            dispatch(fromRouting.navigate({ routeName: 'Detail', params: { screen: helpScreen } }))
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(ScreenHOC(AboutLandingScreen))