import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native'
import { ScreenWrapper, IntroCard, H2, H3, P, ProTip , Touchable, AppModalFullScreen,
    AddressAutocompleteModal, TopNavHeader, OfferFlag, OfferInline, Faqs } from '../../Components'
import { Dropdown } from 'react-native-material-dropdown';
import { Images, Layout, Variables } from '../../Theme'
import styles from './Styles/AgentListScreenStyles'
import { getProtipDismissedSelector, protipIdentifiers } from '../../Redux/Modules/AppState'
import { asyncGetAgents, setCurrentAgent, getRealEstateLocationSelector,
    getLocationStateSelector, setLocationState, updateLocationAndAgents, getFetchingAgents } from '../../Redux/Modules/Housing'
import { fetchNeighbourhoodForCity, getDestinationNeighbourhoodSelector, getOriginCitySelector, getDestinationCitySelector, isDestinationNeighborhoodLoadedSelector } from '../../Redux/Modules/CityGuides'
import { getDestinationAddressSelector } from '../../Redux/Modules/Relocation'
import { openModal } from '../../Redux/Modules/Modal'
import { protipModalStyles } from '../../Components/Styles/ProTipStyles'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { navigate } from '../../Redux/Modules/Routing';
import S from '../../StyleUtils/';
import AgentCityNoData from '../ErrorPages/AgentCityNoData'
import AgentNoData from '../ErrorPages/AgentNoData'
class AgentListScreen extends Component {
    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage);
    }

    componentDidMount = () => {
        this.props.getAgents()

        if (!this.props.isSellState && !this.props.isDestinationNeighborhoodLoaded) {
            this.props.getDestinationNeighbourhood(
                this.props.location.city,
                this.props.location.state
            )
        }
    }

    setCurrentAgent = (index) => {
        const agent = this.props.agents[index]

        this.props.setCurrentAgent(agent)
        this.props.gotoScreen('AgentDetail')
    }

    onChangeDestination(value, index){
        const values = value.split(', ');
        const neighborhood = this.props.destinationCityNeighbourhood[index]
        const address = { city: values[0], state: values[1]}
        const lat = neighborhood.lat
        const lng = neighborhood.lng

        this.setState({
            destinationAddress: address
        }, () => {
            this.props.updateLocation(address.city, address.state, lat, lng);
        })
    }

    handleHeaderSelection = (index) => {
        if (index === 1 && this.props.isSellState) {
            this.props.setRealEstateLocationState(false)
            this.props.getAgents()
        } else if (index === 0 && !this.props.isSellState) {
            this.props.setRealEstateLocationState(true)
            this.props.getAgents()
        }
    }

    proTip() {
        return (
            <ProTip
              copy={this.__('protiptext')}
              copyLines={2}
              backgroundImage={Images.textureGray01}
              helpActionCopy={this.__('protipmodalprompt')}
              identifier={protipIdentifiers.AgentListScreen}
              showDismissLink={!this.props.protipDismissed}
              dismissLinkText={this.__('protipdismiss')}
          >
              <P style={ protipModalStyles.p }>
                  {this.__('protipmodaltext')}
              </P>
          </ProTip>
        )
    }

    agentsDisplay(){
        return (
            this.props.agents.map((agent, index) => (
                <TouchableOpacity
                    style={styles.agentCard}
                    key={index}
                    onPress={() => this.setCurrentAgent(index)}>
                    <View style={styles.agentInfo}>
                        <View>
                            <H3 style={styles.agentName}>{agent.attributes.agentName}</H3>
                            {agent.attributes.yearsOfExperience &&
                                <P style={styles.agentExperience}>{agent.attributes.yearsOfExperience} {this.__('experience')}</P>
                            }
                            {
                                agent.attributes.isPreferred ? <OfferFlag style={styles.offerFlag} /> : null
                            }
                        </View>
                        <Image style={styles.avatar} source={{ uri: agent.attributes.images.profile }} />
                    </View>
                    {agent.attributes.cities &&
                        <P style={styles.agentCities}>
                            {
                                agent.attributes.cities.reduce((accumulator, currentValue, currentIndex, array) => {

                                if (currentIndex == 1) {
                                    accumulator = accumulator.split(',')[0] + ", "
                                }

                                let cities =`${accumulator} ${currentValue.split(',')[0]}`

                                if (currentIndex <  array.length - 1) {
                                    cities += ","
                                }

                                return cities
                            })}
                        </P>
                    }
                </TouchableOpacity>
            ))
        )
    }

    mainDisplay(dropDownData, destinationCity, protip) {
        const faq = [1, 2, 3, 4].map((questionNumber)=> {
            return { question: this.__(`question${questionNumber}`), answer: this.__(`answer${questionNumber}`) }
        })

        return (
            <ScreenWrapper
                backgroundStyles={styles.backgroundStyles}
                backgroundImage={Images.texture05}
                watermark={Images.housingWatermark}>

                {!this.props.loading && this.props.loaded &&
                    <ScrollView >
                        <TopNavHeader
                            data={[this.__('tabnavsell'), this.__('tabnavbuy')]}
                            selectedId={this.props.isSellState ? 0 : 1}
                            onPress={(index) => this.handleHeaderSelection(index)}
                            style={styles.tabNav}
                        />
                        <IntroCard styles={styles.introCard}>
                            <View style={{ paddingHorizontal: Variables.smallGutter }}>
                                <H2 style={styles.header}>{this.__('searchheader')}</H2>

                                    {this.props.isSellState || dropDownData.length == 0 ?
                                        <View style={styles.originWrapper}>
                                            <View style={styles.address}>
                                                <Text style={styles.selectedAddress}>
                                                    {this.props.location.city}, {this.props.location.state}
                                                </Text>
                                            </View>
                                        </View>
                                        :
                                        <View style={styles.formWrapper}>
                                            <Dropdown data={dropDownData}
                                                value={this.props.location.city + ", " + this.props.location.state}
                                                fontSize={16}
                                                baseColor={'rgba(255, 255, 255, 1)'}
                                                textColor={'rgba(255, 255, 255, 0.6)'}
                                                itemColor={'rgba(0, 0, 0, 1)'}
                                                selectedItemColor={'rgba(0, 0, 0, 1)'}
                                                onChangeText={(value, index) => this.onChangeDestination(value, index)} />
                                        </View>
                                    }
                            </View>
                            {!this.props.protipDismissed &&
                                <View style={styles.protipWrapper}>{protip}</View>
                            }
                        </IntroCard>
                        <View style={styles.agentsWrapper}>
                            <View style={styles.agentList}>
                                <Touchable onPress={ ()=> this.props.openModal({ modalId: 'agentlistDeal' }) } highlight={true}>
                                    <OfferInline style={ [S.mt0] } copy={this.__('discountpromo')} />
                                </Touchable>
                                {this.agentsDisplay()}
                            </View>
                        </View>
                        <Faqs data={faq} containerStyles={S.mt}/>
                    </ScrollView>
                }
                <AppModalFullScreen modalKey={'agentlistDeal'} type="white">
                    <View>
                        <Text>{this.__('discountdetail')}</Text>
                    </View>
                    <Image style={protipModalStyles.icon} source={images.iconProtipIllustration} />
                </AppModalFullScreen>
            </ScreenWrapper>
        )
    }

    noAgentsDisplay(dropDownData, destinationCity) {
        return (
            <AgentCityNoData { ...this.props }
                onChangeDestination={this.onChangeDestination.bind(this)}
                handleHeaderSelection={this.handleHeaderSelection.bind(this)}
                destinationCity={destinationCity}
                dropDownData={dropDownData} />
        )
    }

    render() {
        const protip = this.proTip();

        let renderer
        let dropDownData = this.props.destinationCityNeighbourhood;
        let destinationCity = this.props.destinationCityInfo;

        if (this.props.isSellState && this.props.agents.length === 0)
            renderer = <AgentNoData city={this.props.location.city} isSellState={this.props.isSellState} handleHeaderSelection={this.handleHeaderSelection.bind(this)} />
        else if(!this.props.isSellState && this.props.agents.length === 0 && dropDownData !== null && dropDownData.length > 0)
            renderer = this.noAgentsDisplay(dropDownData, destinationCity)
        else
            renderer = this.mainDisplay(dropDownData, destinationCity, protip)

        return renderer
    }
}


const mapStateToProps = (state) => {
    return {
        protipDismissed: getProtipDismissedSelector(protipIdentifiers.AgentListScreen, state),
        destinationAddress: getDestinationAddressSelector(state),
        agents: state.housing.agents,
        location: getRealEstateLocationSelector(state),
        destinationCityNeighbourhood: getDestinationNeighbourhoodSelector(state),
        isDestinationNeighborhoodLoaded: isDestinationNeighborhoodLoadedSelector(state),
        isSellState: getLocationStateSelector(state),
        screenLanguage: getLanguageDataSelector(state, 'AgentListScreen'),
        originCityInfo: getOriginCitySelector(state),
        destinationCityInfo: getDestinationCitySelector(state),
        loading: state.housing.loading,
        loaded: state.housing.loaded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen) => {
            dispatch(navigate({ routeName: screen }));
        },
        setRealEstateLocationState: (isSellState) => {
            dispatch(setLocationState(isSellState))
        },
        getAgents: () => {
            dispatch(asyncGetAgents())
        },
        setCurrentAgent: (agent) => {
            dispatch(setCurrentAgent(agent))
        },
        updateLocation: (city, state, lat, lng) => {
            dispatch(updateLocationAndAgents(city, state, lat, lng))
        },
        getDestinationNeighbourhood: (city, stateCode) =>{
            dispatch(fetchNeighbourhoodForCity(city, stateCode))
        },
        openModal: (modalConfig) => {
            dispatch(openModal(modalConfig))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AgentListScreen)
