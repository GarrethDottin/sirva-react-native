import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { Layout, Images } from '../../Theme';
import { H1, H2, P, Link, ScreenWrapper, AppModalFullScreen, HtmlView } from '../../Components';
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { styles } from './Styles/OfferDetailsScreenStyles';
import { ScreenHOC } from '../Screen';
import * as fromModal from '../../Redux/Modules/Modal';

import S from '../../StyleUtils';

class OfferDetailsScreen extends Component {

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    render() {
        const { offer } = this.props.navigation.state.params
        return (
            <ScreenWrapper backgroundStyles={{ flex: 1 }} backgroundImage={Images.texture01}>
                <ScrollView style={{ height: "100%" }}>
                    <View style={styles.container}>
                        <View style={styles.logoContainer}>
                            {offer.logo ? <Image source={{ uri: offer.logo }} style={{ width: 140, height: 55 }} /> : null}
                        </View>
                        <H1 style={styles.header}>{offer.name}</H1>
                        <View style={styles.descriptionBox}>
                            <View style={styles.descriptionContainer}>
                                <View style={styles.labelContainer}>
                                    <View style={styles.label}>
                                        <P style={styles.labelText}>
                                            {offer.text}
                                        </P>
                                    </View>
                                </View>
                                <View style={styles.text}>
                                    <P style={{ textAlign: "center" }}>
                                        {offer.description}
                                    </P>
                                </View>
                                <TouchableOpacity onPress={() => offer.link ? Linking.openURL(offer.link) : null}>
                                    <View style={styles.action}>
                                        <Text style={styles.actionText}>{this.__('button')}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        { offer.fine_print && <View style={styles.finePrintContainer}>
                            <P style={styles.finePrintText}>
                                {offer.fine_print}
                            </P>
                        </View>}
                        <View style={ [S.flexRow, S.justifyCenter] }>
                            <Link onPress={()=> this.props.openModal('detail-offer-legal')}>
                                iMOVE Notices & Disclaimers
                            </Link>
                        </View>
                    </View>

                    <AppModalFullScreen modalKey={"detail-offer-legal"} type="gray">
                        <View style={ [S.flex1] }>
                            <View style={ { height: '100%' } }>
                                <HtmlView source={ { html: `<style> html { font-family: 'Nunito Sans'; color: white; padding-top: 16 }</style>${this.__('services_legal_text')}` } } ></HtmlView>
                            </View>
                        </View>
                    </AppModalFullScreen>
                </ScrollView>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        screenLanguage: getLanguageDataSelector(state, 'OfferDetailsScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (modalId) => {
            dispatch(fromModal.openModalById(modalId))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenHOC(OfferDetailsScreen));
