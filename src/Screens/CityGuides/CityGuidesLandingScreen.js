import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, View, Text, Image } from 'react-native';
//import { Dropdown } from 'react-native-material-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { ScreenWrapper, H2, H3, H4, InfoCard, DoubleDisplayCard, DropdownAlt } from '../../Components';
import { Images, Colors } from '../../Theme';
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from './Styles/CityGuidesLandingScreenStyles';
import { getOriginAddressSelector, getDestinationAddressSelector, getCounselorSelector } from '../../Redux/Modules/Relocation';
import { loadCityGuideInfo, asyncGetDestinationCity, getOriginCitySelector, getDestinationCitySelector, getDestinationNeighbourhoodSelector, headersSelectors, getLoadingSelector, getLoadedSelector } from '../../Redux/Modules/CityGuides'
import { getCityNeighbourhoods, getCityInfo } from '../../Api/CityGuides'
import S from '../../StyleUtils/';
import CityGuidesNoData from '../ErrorPages/CityGuidesNoData';
import CityGuidesNoCity from '../ErrorPages/CityGuidesNoCity';
import { ScreenHOC } from '../Screen';
import {CityGuidesAnimation} from '../../Components/Animations';

const SingleElmSubCard = (props) => {
    return (
        <View style={styles.child}>
            <H4 style={[S.mbXs,styles.titleStyle]}>{props.title}</H4>
            <H2 style={[S.mbXxs, { color: Colors.lightBlue }]}>{props.percentage}</H2>
            <H4 style={styles.titleStyle}>{props.subtitle}</H4>
        </View>
    );
}

class CityGuidesLandingScreen extends Component {
    constructor(props){
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount(){
        this.props.getCityGudidesInfo();
    }

    onChangeDestination(value) {
        let values = value.split(', ');
        let address = { city: values[0], state: values[1]}

        this.setState({
            destinationAddress: address
        }, () => {
            this.props.getDestinationCity(this.state.destinationAddress.city, this.state.destinationAddress.state);

        })
    }

    noCityData(destinationCity){
        if (destinationCity.city === '')
            return true;
        else
            return false
    }

    noCityInfoData(originCity, destinationCity, dropDownData, headers){
        if (originCity.info === '' || destinationCity.info === '' || dropDownData === [])
            return true;
        else
            return false;
    }

    render() {
        let hour = new Date().getHours();
        let day = (hour >= 8 && hour <= 20) ? true : false;
        let originCity = this.props.originCityInfo;
        let destinationCity = this.props.destinationCityInfo;
        let dropDownData = this.props.destinationCityNeighbourhood;
        let headers = this.props.headersInfo;



        let renderer = null;

        if (this.noCityData(destinationCity))
              renderer =  <CityGuidesNoCity originCity={originCity} destinationCity={destinationCity}/>
         else if (this.noCityInfoData(originCity, destinationCity, dropDownData) ) {
             renderer = <CityGuidesNoData originCity={originCity} destinationCity={destinationCity} onChangeDestination={this.onChangeDestination.bind(this)} dropDownData={dropDownData}/>
        } else {
            renderer = <ScreenWrapper backgroundStyles={{ flex: 1 }} backgroundImage={Images.texture01}>
                {!this.props.isLoading && this.props.isLoaded &&
                    <ScrollView style={{ minHeight: "100%" }}>
                    <LinearGradient colors={day ? ['#3b73e6', '#3b73e6'] : ['#3b73e6', '#3b73e6'] }>
                            <View style={styles.introView}>
                                <View style={styles.introCard}>
                                    <H3 style={[S.white, S.mb]}>{this.__('title')}</H3>
                                    <P style={[S.white, S.mb]}>{this.__('subtitle', [headers.averageJanuary[1], headers.averageJuly[1], "37"])}</P>
                                    {
                                        dropDownData.length ? <View>
                                            <H4 style={[S.white, ,{ marginBottom: -30 }]}>{this.__('dropDownLabel', originCity.city)}</H4>

                                            <DropdownAlt
                                                value={destinationCity.city + ", " + destinationCity.stateCode}
                                                data={dropDownData}
                                                onChangeText={(value) => this.onChangeDestination(value)} 
                                            />

                                        </View> : null
                                    }
                                </View>
                            </View>
                            <View>
                                <CityGuidesAnimation time={day ? 'day' : 'night'} />
                            </View>
                        </LinearGradient>
                        <View style={styles.secondContainer}>
                            <InfoCard headerIcon={Images.iconCostOfLiving} headerCopy={this.__('costLivingHeader')} screenName={this.__('costLivingScreenName')} visibleKey={'costOfLiving'}>
                                <SingleElmSubCard title={this.__('costLivingSubCardTitle')} percentage={headers.houseCostPercentage} subtitle={headers.houseCostUpDown ? this.__('costLivingSubCardInfo2SubTrue', destinationCity.city) : this.__('costLivingSubCardInfo2SubFalse', destinationCity.city)} />
                            </InfoCard>

                            <InfoCard headerIcon={Images.iconPopulation} headerCopy={this.__('demographicsHeader')} subtitle={this.__('demographicsSubtitle')} styleChild={styles.children} screenName={this.__('demographicsScreenName')} visibleKey={'demographic'}>
                                <DoubleDisplayCard info1={headers.oriPopulation} info1sub={this.__('demographicsSubCardInfo1Sub', originCity.city)} info2={headers.destPopulation} info2sub={this.__('demographicsSubCardInfo2Sub', destinationCity.city)} />
                            </InfoCard>

                            <InfoCard headerIcon={Images.iconCommuteTime} headerCopy={this.__('commuteHeader')} subtitle={this.__('commuteSubtitle')} styleChild={styles.children} screenName={this.__('commuteScreenName')} visibleKey={'commute'}>
                                <DoubleDisplayCard info1={headers.oriCommuteTime} info1sub={this.__('commuteSubCardInfo1Sub', originCity.city)} info2={headers.destCommuteTime} info2sub={this.__('commuteSubCardInfo2Sub', destinationCity.city)} />
                            </InfoCard>

                            <InfoCard headerIcon={Images.iconSafety} headerCopy={this.__('safetyHeader')} screenName={this.__('safetyScreenName')} visibleKey={'safety'}>
                                <SingleElmSubCard title={this.__('safetySubCardTitle')} percentage={headers.crimePercentage} subtitle={headers.crimeUpDown ? this.__('safetySubCardSubtitleTrue', destinationCity.city) :this.__('safetySubCardSubtitleFalse', destinationCity.city)} />
                            </InfoCard>

                            <InfoCard headerIcon={Images.iconWeather} headerCopy={this.__('weatherHeader')} styleChild={styles.children} screenName={this.__('weatherScreenName')} visibleKey={'weather'} >
                                <DoubleDisplayCard border={true} title={this.__('weatherDoubleDisplay1Title')} info1={headers.averageJuly[0]} info1sub={this.__('weatherDoubleDisplay1info1', originCity.city)} info2={headers.averageJuly[1]} info2sub={this.__('weatherDoubleDisplay1info2', destinationCity.city)} />
                                <DoubleDisplayCard title={this.__('weatherDoubleDisplay2Title')} info1={headers.averageJanuary[0]} info1sub={this.__('weatherDoubleDisplay2info1', originCity.city)} info2={headers.averageJanuary[1]} info2sub={this.__('weatherDoubleDisplay2info2', destinationCity.city)} />
                            </InfoCard>
                        </View>
                    </ScrollView>
                }
            </ScreenWrapper>
          }

          return renderer;
    }
}

const mapStateToProps = (state) => {
    return {
        originAddress: getOriginAddressSelector(state),
        destinationAddress: getDestinationAddressSelector(state),
        originCityInfo: getOriginCitySelector(state),
        destinationCityInfo: getDestinationCitySelector(state),
        destinationCityNeighbourhood: getDestinationNeighbourhoodSelector(state),
        headersInfo: headersSelectors(state),
        screenLanguage: getLanguageDataSelector(state, 'CityGuidesLandingScreen'),
        isLoading: getLoadingSelector(state),
        isLoaded: getLoadedSelector(state),
        counselor: getCounselorSelector(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDestinationCity: (city, stateCode) => {
            dispatch(asyncGetDestinationCity(city, stateCode))
       },
       getCityGudidesInfo: () => {
         dispatch(loadCityGuideInfo())
       }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(CityGuidesLandingScreen))
