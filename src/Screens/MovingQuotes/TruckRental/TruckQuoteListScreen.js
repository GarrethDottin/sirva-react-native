import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet, ImageBackground, Image, TouchableHighlight } from 'react-native'
//import { Dropdown } from 'react-native-material-dropdown';
import { Layout, Colors, Images } from '../../../Theme'
import { ScreenWrapper, Button, H2, P, IntroCard, ProTip, ListItemCard, DropdownAlt, TopNavHeader, OfferFlag, Faqs } from '../../../Components'
import { asyncFetchTruckQuoteData, setTruckSize, getActiveTruckSizeSelector, setActiveTruckQuote, getTruckQuotesBySizeSelector } from '../../../Redux/Modules/Moving'
import { setBedroomSizeNoPersist, getBedroomCountSelector, asyncFetchRelocationData, getResidenceTypeSelector } from '../../../Redux/Modules/Relocation'
import { formatCurrencyFromString } from '../../../Utils/ReactHelpers'
import { __ } from '../../../Utils/ReactHelpers'
import { getLanguageDataSelector, getInlineOffersDataSelector } from '../../../Redux/Modules/Localization'
import styles from './Styles/TruckQuoteListScreenStyles'
import { getProtipDismissedSelector, protipIdentifiers } from '../../../Redux/Modules/AppState'
import { protipModalStyles } from '../../../Components/Styles/ProTipStyles'
import { navigate } from '../../../Redux/Modules/Routing';
import NoQuotesScreen from '../NoQuotesScreen';
import S from '../../../StyleUtils';


class TruckQuoteListScreen extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)

        this.state = {
            selectedTruckSize: null,
            bedroomCount: null,
            sizeFilters: [
                '10-12ft',
                '15-16ft',
                '20-22ft',
                '26ft'
            ],
            sizeFiltersForDispatch: [
                '10-12',
                '15-16',
                '20-22',
                '26-26'
            ]
        };

    }

    componentDidMount = () => {
        if (this.props.truckQuotes == null) {
            this.props.refreshTruckData()
        }
        if (this.props.bedroomCount == null) {
            this.props.refreshRelocationData()
        }
        this.props.updateTruckSize(this.mapRoomSizeToTruckSize(this.props.bedroomCount))
    }

    componentDidUpdate = () => {
        //Was null
        if (this.state.bedroomCount != this.props.bedroomCount) {
            this.state.bedroomCount = this.props.bedroomCount
            this.props.updateTruckSize(this.mapRoomSizeToTruckSize())
        }
    }

    gotoScreen = (screen) => {
        this.props.gotoScreen(screen)
    }

    gotoDetailScreen = (id) => {
        this.props.activeTruckQuoteId = id
        this.props.setActiveQuote(id)
        this.gotoScreen('TruckQuoteDetail')
    }

    updateTruckQuoteSize = (index) => {
        const size = this.state.sizeFiltersForDispatch[index]
        this.props.updateTruckSize(size)
    }

    updateBedroomCount = (size) => {
        this.props.updateBedroomCount(size)
    }

    mapRoomSizeToTruckSize = (count) => {
        const bedroomCount = count ? count : this.props.bedroomCount
        const type = `${this.props.residenceType}-${bedroomCount}`

        switch (type) {
            case 'apartment-1':
                return '10-12'
            case 'apartment-2':
                return '15-16'
            case 'apartment-3':
                return '20-22'
            case 'house-1':
                return '15-16'
            case 'house-2':
                return '20-22'
            case 'house-3':
                return '26-26'
            case 'house-4':
                return '26-26'
            case null:
                return null
            default:
                return '26-26'
        }

    }
    render = () => {
        let dropdownData = []

        const faq = [1, 2].map((questionNumber) => {
            return {  question: this.__(`question${questionNumber}`), answer: this.__(`answer${questionNumber}`) }
        })

        if (this.props.residenceType != null) {
            if (this.props.residenceType == 'house') {
                dropdownData = [
                    { value: 1, label: this.__('housesizelabel1', 1) },
                    { value: 2, label: this.__('housesizelabel1', 2) },
                    { value: 3, label: this.__('housesizelabel1', 3) },
                    { value: 4, label: this.__('housesizelabel2', 4) },
                ]
            } else {
                dropdownData = [
                    { value: 1, label: this.__('housesizelabel1', 1) },
                    { value: 2, label: this.__('housesizelabel1', 2) },
                    { value: 3, label: this.__('housesizelabel2', 3) },
                ]
            }
        }

        let dropdownValue = this.props.bedroomCount ? this.props.bedroomCount : 1
        if (this.props.residenceType == 'house' && this.props.bedroomCount > 4) {
            dropdownValue = 4
        } else if (this.props.residenceType == 'apartment' && this.props.bedroomCount > 3) {
            dropdownValue = 3
        }

        const recommendedSize = this.mapRoomSizeToTruckSize()
        const recommendedSizeText = this.__('recommendedsize', recommendedSize)
        const selectedTruckSizeIndex = this.state.sizeFiltersForDispatch.indexOf(this.props.activeTruckSize)

        const protip = <ProTip
            copy={this.__('protiptext')}
            copyLines={3}
            backgroundImage={images.textureGray02}
            helpActionCopy={this.__('protipmodalprompt')}
            identifier={protipIdentifiers.TruckQuoteListScreen}
            showDismissLink={!this.props.protipDismissed}
            dismissLinkText={this.__('protipdismiss')}
            styles={{ marginLeft: 0, marginRight: 0 }}
        >
            <H2 style={protipModalStyles.h2}>{this.__('protipmodaltitle')}</H2>

            <P style={protipModalStyles.p}>
                {this.__('protipmodaltext')}
            </P>
        </ProTip>

        const componentContent = (
            <ScrollView contentContainerStyle={Layout.fullHeight}>
                <IntroCard>
                    <View style={[styles.introWrapper, Layout.outerContainerAlt]}>
                        <Text style={styles.introCopy}>
                            {recommendedSizeText}
                        </Text>

                        <DropdownAlt
                            value={dropdownValue}
                            data={dropdownData}
                            fontSize={24}
                            onChangeText={(value) => this.updateBedroomCount(value)}
                        />
                    </View>
                    {!this.props.protipDismissed && protip}
                </IntroCard>


                {this.props.truckQuotes != null ? (
                    <View style={Layout.outerContainerAlt}>

                        <View style={styles.sizeFilters}>
                            <Image style={styles.truck} source={Images.iconTruckGray} />
                            <TopNavHeader
                                data={this.state.sizeFilters}
                                onPress={(index) => this.updateTruckQuoteSize(index)}
                                selectedId={selectedTruckSizeIndex}
                                style={{ paddingLeft: 10, paddingRight: 0 }}
                                optionStyles={[styles.optionStyles]}
                                linkStyles={styles.sizeLinkText}
                            />
                        </View>


                        {this.props.truckQuotes.map((quote, i) => {
                            return (
                                <ListItemCard
                                    cardStyles={styles.listCard}
                                    key={quote.jsonapi_identifier}
                                    onPress={() => this.gotoDetailScreen(quote.jsonapi_identifier)}>

                                    <Image style={styles.brandLogo} resizeMode='contain' source={{ uri: quote.companyInfo.logo }} />

                                    <View style={styles.quoteInfo}>
                                        <Text style={styles.listItemLabel}>{quote.size.toUpperCase()} {this.__('truck')} </Text>
                                        <Text style={styles.listItemCopy}>{formatCurrencyFromString(quote.quote)}</Text>
                                        {this.props.offersLanguage[quote.company] &&
                                            <OfferFlag style={styles.offerFlag} />
                                        }
                                    </View>
                                </ListItemCard>
                            )
                        })}
                    </View>
                ) : (
                        <View style={[Layout.innerContainerNarrowed, { marginTop: 50 }]}>
                            <H2 style={{ textAlign: 'center', marginBottom: 20 }}>{this.__('notreadytitle')}</H2>
                            <P style={{ textAlign: 'center', marginBottom: 20 }}>{this.__('notreadytext')}</P>
                        </View>
                    )
                }
                {this.props.protipDismissed && protip}
                <Faqs data={faq} containerStyles={[S.mt, {marginTop: 30}]} />
            </ScrollView>
        )
        return (
            <ScreenWrapper
                backgroundImage={Images.texture05}
                watermark={Images.movingWatermark}>
                {
                    this.props.noTruckQuotesAvailable ?
                        <NoQuotesScreen truckOptions={true} onRetry={() => { this.props.refreshTruckData() }} /> :
                        componentContent

                }
            </ScreenWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        noTruckQuotesAvailable: state.moving.noTruckQuotesAvailable,
        truckQuotes: getTruckQuotesBySizeSelector(state),
        activeTruckSize: getActiveTruckSizeSelector(state),
        bedroomCount: getBedroomCountSelector(state),
        residenceType: getResidenceTypeSelector(state),
        protipDismissed: getProtipDismissedSelector(protipIdentifiers.TruckQuoteListScreen, state),
        screenLanguage: getLanguageDataSelector(state, 'TruckQuoteListScreen'),
        offersLanguage: getInlineOffersDataSelector(state, 'rentaltrucks')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen) => {
            dispatch(navigate({ routeName: screen }));
        },
        refreshTruckData: () => {
            dispatch(asyncFetchTruckQuoteData());
        },
        refreshRelocationData: () => {
            dispatch(asyncFetchRelocationData());
        },
        updateTruckSize: (size) => {
            dispatch(setTruckSize(size));
        },
        updateBedroomCount: (size) => {
            dispatch(setBedroomSizeNoPersist(size));
        },
        setActiveQuote: (id) => {
            dispatch(setActiveTruckQuote(id));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TruckQuoteListScreen)
