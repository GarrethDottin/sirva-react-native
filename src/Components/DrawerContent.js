import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import call from 'react-native-phone-call'
import { showBell } from '../Redux/Modules/Concierge'
import { Layout, Images, Colors, Variables } from '../Theme'
import { H3, H4, P } from '../Components'
import { WeatherAnimation } from './Animations'
import { asyncLogOff } from '../Redux/Modules/Authentication'
import { __ } from '../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../Redux/Modules/Localization'
import { setDrawerState, getDrawerState } from '../Redux/Modules/Drawer'
import { asyncFetchRelocationData, asyncFetchDestWeather, getDestinationAddressSelector, getCompanyAddressSelector,
    getDestinationWeatherSelector, getTransfereeSelector, getCounselorSelector } from '../Redux/Modules/Relocation'
import { asyncTrackCallConciergeEvent } from '../Redux/Modules/Analytics'
import { closeDrawer, navigate } from '../Redux/Modules/Routing';

import S from '../StyleUtils';

const VISIBLE_ITEMS = ['Home', 'Offers', 'Claim Your Lump Sum', 'City Guides', 'Contacts', 'Profile', 'About']

const drawerStyles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: '100%',
        minHeight: Dimensions.get('window').height,
        position: 'absolute'
    },
    innerPadding: {
        paddingHorizontal: 20
    },
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
    },
    heading: {
        borderBottomColor: Colors.yetAnotherGray,
        borderBottomWidth: 1,
        minHeight: 144,
        paddingTop: 22,
        paddingBottom: 32
    },
    innerHeading: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 20
    },
    weather: {
        flexDirection: 'row',
        position:'relative',
        height:35,

    },
    temperature: {
        fontSize: 18,
        color: Colors.white

    },
    weatherIcon: {

    },
    back: {
        width: 11,
        height: 20,
        marginLeft: 15
    },
    destDetails: {

    },
    h3: {
        color: Colors.white
    },
    h4: {
        color: Colors.offwhite,
        marginTop: 5
    },
    items: {
        marginTop: 10
    },
    footer: {
        height: 180,
    },
    callWrapper: {
        backgroundColor: Colors.lightBlue,
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    call: {
        height: 90
    },
    avatar: {
        marginHorizontal: 20,
    },
    iconChatSmall: {
        width: 16,
        height: 16,
        position: 'absolute',
        right: -7,
        top: 7,
        zIndex: 9
    },

    iconChatSmallNoPic: {
        width: 16,
        height: 16,
        right: -7,
        zIndex: 9
    },
    avatarPic: {
        width: 63,
        height: 63,
        borderRadius: 31.5
    },
    callText: {
        color: Colors.white
    },
    footerActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 90
    },
    footerAction: {
        color: Colors.white,
        fontWeight: Variables.weightBold,
        lineHeight: 90
    }
})

class DrawerContent extends Component {

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount = () => {
        if (this.props.destinationAddress == null) {
            this.props.refreshRelocationData()
        }

        if (this.props.destinationWeather == null) {
            this.props.refreshWeatherData()
        }
    }

    gotoScreen = (screen, params) => {
        this.props.gotoScreen(screen, params)
    }

    closeDrawer = () => {
        this.props.closeDrawer()
    }

    logOff = () => {
        this.props.logOff()
    }

    makePhoneCall = (number) => {
        this.props.trackConciergeCalledEvent();

        const params = {
            number,
            prompt: false
        }
        call(params).catch(err => console.log('An error occurred', err));
    }

    get visibleItems() {
        return this.props.items.filter((item)=> {
            return VISIBLE_ITEMS.includes(item.key);
        })
    }

    render = () => {
        let city = ''
        if (this.props.destinationAddress) {
            city = this.props.destinationAddress.city
        } else if (this.props.companyAddress) {
            city = this.props.companyAddress.city
        }

        return (
            <ScrollView style={Layout.fullHeight}>
                <View style={ { width: '100%' } }>
                <Image source={Images.textureDrawer} style={drawerStyles.imageBackground} />
                <SafeAreaView style={[Layout.fullHeight, drawerStyles.container]} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <View style={drawerStyles.body}>
                        <View style={drawerStyles.heading}>
                            <TouchableOpacity onPress={() => this.closeDrawer()} activeOpacity={0.5}>
                                <Image style={drawerStyles.back} source={Images.iconArrowheadLeftWhite} />
                            </TouchableOpacity>
                            <View style={[drawerStyles.innerPadding, drawerStyles.innerHeading]}>
                                <View style={drawerStyles.locationDetails}>
                                    <View style={[drawerStyles.innerPadding, drawerStyles.destDetails]}>
                                        <View style={drawerStyles.destCopy}>
                                            <H3 style={drawerStyles.h3}>{city}</H3>
                                            {this.props.transferee != null &&
                                                <H4 style={drawerStyles.h4}>{this.props.transferee.email}</H4>
                                            }
                                        </View>
                                    </View>
                                </View>
                                {this.props.destinationWeather != null && Object.keys(this.props.destinationWeather).length > 0 &&
                                    <View style={drawerStyles.weather}>
                                        <P style={drawerStyles.temperature}>
                                            {Math.round(this.props.destinationWeather.temperature)}°
                                        </P>
                                    {this.props.getDrawerState == true &&
                                        <WeatherAnimation
                                        style={drawerStyles.weatherIcon}
                                        icon={this.props.destinationWeather.icon}
                                        />
                                    }

                                    </View>
                                }
                            </View>
                        </View>
                        <View style={[drawerStyles.items, drawerStyles.innerPadding]}>
                            <DrawerItems
                                {...this.props}
                                items={this.visibleItems}
                                onItemPress={ (route) => {
                                   this.props.onItemPress(route);
                                   this.closeDrawer();
                                }}/>
                        </View>
                    </View>
                    <View style={drawerStyles.footer}>
                        { this.props.counselor != null && (
                                <TouchableOpacity
                                    onPress={() => this.makePhoneCall(this.props.counselor.workPhoneNumber)} activeOpacity={0.5}
                                    style={[drawerStyles.innerPadding, drawerStyles.callWrapper, S.pv3]}>

                                    <View style={drawerStyles.avatar}>

                                        {this.props.counselor.photo ?
                                            (<View>
                                                <Image style={drawerStyles.iconChatSmall} source={Images.iconChatSmall} />
                                                <Image resizeMode='contain' style={drawerStyles.avatarPic} source={{ uri: this.props.counselor.photo }} />
                                            </View>)
                                        :
                                          (<View>
                                              <Image style={drawerStyles.iconChatSmallNoPic} source={Images.iconChatSmall} />
                                          </View>)
                                      }
                                    </View>
                                    { !this.props.counselor.isRoundRobin && (
                                            <H3 style={drawerStyles.callText}>{this.__('callimove', this.props.counselor.firstName)}</H3>
                                        )
                                    }
                                    { this.props.counselor.isRoundRobin && (
                                            <H3 style={drawerStyles.callText}>{this.__('callimoveRoundRobin')}</H3>
                                        )
                                    }
                                </TouchableOpacity>
                            )
                        }
                        <View style={[drawerStyles.innerPadding, drawerStyles.footerActions]}>
                            <TouchableOpacity onPress={() => this.logOff()} activeOpacity={0.5}>
                                <P style={drawerStyles.footerAction}>{this.__('logoff')}</P>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.gotoScreen('Feedback')} activeOpacity={0.5}>
                                <P style={drawerStyles.footerAction}>{this.__('feedback')}</P>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        destinationAddress: getDestinationAddressSelector(state),
        destinationWeather: getDestinationWeatherSelector(state),
        transferee: getTransfereeSelector(state),
        counselor: getCounselorSelector(state),
        screenLanguage: getLanguageDataSelector(state, 'DrawerContent'),
        companyAddress: getCompanyAddressSelector(state),
        getDrawerState: getDrawerState(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen, params) => {
            dispatch(navigate({ routeName: screen, params }));
        },
        closeDrawer: () => {
            dispatch(showBell());
            dispatch(setDrawerState(false))
            dispatch(closeDrawer());
        },
        logOff: () => {
            dispatch(asyncLogOff())
        },
        refreshRelocationData: () => {
            dispatch(asyncFetchRelocationData())
        },
        refreshWeatherData: () => {
            dispatch(asyncFetchDestWeather())
        },
        trackConciergeCalledEvent: () => {
            dispatch(asyncTrackCallConciergeEvent('Drawer Navigation'))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DrawerContent)
