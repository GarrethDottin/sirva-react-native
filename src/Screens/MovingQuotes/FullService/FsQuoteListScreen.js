import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Protip, ScrollView, View, Text, StyleSheet, ImageBackground, Image, TouchableHighlight } from 'react-native'
import layout from '../../../Theme/Layout'
import images from '../../../Theme/Images'
import { Button, H2, IntroCard, ProTip, OfferInline, ListItemCard, ScreenWrapper, OfferFlag, Faqs } from '../../../Components'
import styles from './Styles/FsQuoteListScreenStyles'
import { getBedroomCountSelector, asyncFetchRelocationData } from '../../../Redux/Modules/Relocation'
import { getItemCountSelector, asyncFetchInventoryData } from '../../../Redux/Modules/Inventory'
import { asyncFetchMovingQuoteData, setActiveMovingQuote, getMovingQuotesSelector } from '../../../Redux/Modules/Moving'
import { formatCurrencyFromString } from '../../../Utils/ReactHelpers'
import { getProtipDismissedSelector, protipIdentifiers } from '../../../Redux/Modules/AppState'
import { __ } from '../../../Utils/ReactHelpers'
import { getLanguageDataSelector, getInlineOffersDataSelector } from '../../../Redux/Modules/Localization'
import { protipModalStyles } from '../../../Components/Styles/ProTipStyles'
import { navigate } from '../../../Redux/Modules/Routing';
import { ScreenHOC } from '../../Screen';
import S from '../../../StyleUtils';

import NoQuotesScreen from '../NoQuotesScreen';

class FsQuoteListScreen extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount = () => {
        if (this.props.movingQuotes == null) {
            this.props.refreshQuoteData()
        }

        if (this.props.inventoryItemCount == null) {
            this.props.refreshInventoryData()
        }
    }

    gotoScreen = (screen) => {
        this.props.gotoScreen(screen)
    }

    gotoDetailScreen = (id) => {
        this.props.activeMovingQuoteId = id
        this.props.setActiveQuote(id)
        this.gotoScreen('FsQuoteDetail')
    }

    isScreenReady = () => {
        return this.props.movingQuotes != null || this.props.noMovingQuotesAvailable
    }

    render = () => {
        const relocationDataLoaded = this.props.inventoryItemCount != null
        const quoteDataLoaded = this.props.movingQuotes != null;
        let renderer = null

        const protip = <ProTip
            copy={this.__('protiptext')}
            copyLines={2}
            backgroundImage={images.textureGray01}
            helpActionCopy={this.__('protipmodalprompt')}
            identifier={protipIdentifiers.FsQuoteListScreen}
            showDismissLink={!this.props.protipDismissed}
            dismissLinkText={this.__('protipdismiss')}
        >
            <P style={ protipModalStyles.p }>
                    {this.__('protipmodaltext')}
            </P>
        </ProTip>

        const faq = [1, 2, 3, 4].map((questionNumber)=> {
            return { question: this.__(`question${questionNumber}`), answer: this.__(`answer${questionNumber}`) }
        })

        renderer = (
            <ScrollView contentContainerStyle={layout.fullHeight}>
                {(!this.props.protipDismissed || !this.props.inventoryItemCount) &&
                    <IntroCard>
                        {!this.props.inventoryItemCount &&
                            (<View style={styles.introWrapper}>
                                <Text style={styles.introCopy}>{this.__('introcardtext')}</Text>
                                <Button
                                    style={styles.introButton}
                                    label={this.__('introcardbutton')}
                                    onPress={() => this.gotoScreen('MqInventoryStart')} />
                            </View>)
                        }
                        {!this.props.protipDismissed && protip}
                    </IntroCard>
                }
                <View style={layout.outerContainerAlt}>
                    {this.props.movingQuotes != null ? (
                            <View>
                                <H2 style={styles.h2}>{this.__('listtitle')}</H2>

                                {this.props.inventoryItemCount ? (

                                    <P>{this.__('inventorymessage', this.props.inventoryItemCount)}</P>
                                ) : (
                                    <P>{this.__('bedroomcountmessage', this.props.bedroomCount)}</P>
                                )}

                                {this.props.movingQuotes.map((quote, i) => {
                                    return (
                                        <ListItemCard
                                            cardStyles={styles.listCard}
                                            key={quote.jsonapi_identifier}
                                            onPress={() => this.gotoDetailScreen(quote.jsonapi_identifier)}>

                                            {quote.supplierData &&
                                                <Image style={styles.brandLogo}
                                                    resizeMode='contain'
                                                    source={{ uri: quote.supplierData.data.logo}} />
                                            }

                                            <View style={styles.pricing}>
                                                <Text style={styles.listItemCopy}>{formatCurrencyFromString(quote.avgPrice)}</Text>

                                                {this.props.offersLanguage[quote.supplierData.data.name.replace(/ /g, '')] &&
                                                    <OfferFlag style={styles.offerFlag} />
                                                }
                                            </View>
                                        </ListItemCard>
                                    )
                                })}
                            </View>
                        ) : (
                            <View style={[Layout.innerContainerNarrowed, { marginTop: 50}]}>
                                <H2 style={{ textAlign: 'center', marginBottom: 20}}>{this.__('notreadytitle')}</H2>
                                <P style={{ textAlign: 'center', marginBottom: 20}}>{this.__('notreadytext')}</P>
                            </View>
                        )
                    }
                </View>
                {this.props.protipDismissed && protip}
                <Faqs data={faq} containerStyles={S.mt} />
            </ScrollView>
        )

        return (
            <ScreenWrapper
                backgroundImage={images.texture05}
                watermark={images.movingWatermark}>
                {
                    this.props.noMovingQuotesAvailable ?
                    <NoQuotesScreen onRetry={ this.props.refreshQuoteData }/> :
                    renderer
                }
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        noMovingQuotesAvailable: state.moving.noMovingQuotesAvailable,
        movingQuotes: state.moving.movingQuotes,
        inventoryItemCount: getItemCountSelector(state),
        bedroomCount: getBedroomCountSelector(state),
        protipDismissed: getProtipDismissedSelector(protipIdentifiers.FsQuoteListScreen, state),
        screenLanguage: getLanguageDataSelector(state, 'FsQuoteListScreen'),
        offersLanguage: getInlineOffersDataSelector(state, 'movingquotes')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen) => {
            dispatch(navigate({ routeName: screen }));
        },
        refreshQuoteData: () => {
            dispatch(asyncFetchMovingQuoteData());
        },
        refreshInventoryData: () => {
            dispatch(asyncFetchInventoryData());
        },
        setActiveQuote: (id) => {
            dispatch(setActiveMovingQuote(id));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(FsQuoteListScreen))
