import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AsyncStorage, ScrollView, View, Text, TouchableOpacity, Image, ImageBackground, TextInput, KeyboardAvoidingView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { ScreenWrapper, IntroCard, H2, H3, H4, P, ProTip , AddressAutocompleteModal, Button, DatePicker, DivisionCounter } from '../../Components'
import { getDestinationAddressSelector } from '../../Redux/Modules/Relocation'
import { Layout, Images, Colors, Variables, Forms} from '../../Theme';
import { getTempHousingIntroScreenView, tempHousingIntroScreenView } from '../../Redux/Modules/AppState'
import styles from './Styles/TempHousingRequestScreenStyles'
import S from '../../StyleUtils/'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { showBell } from '../../Redux/Modules/Concierge'
import { requestTempHousing } from '../../Api/Housing'
import { dsKeyAuthToken } from '../../Config/Constants'
import { navigate, pop } from '../../Redux/Modules/Routing';
import { openModalById } from '../../Redux/Modules/Modal'
import * as fromTempHousing from '../../Redux/Modules/TempHousing';
import TempHousingBadRequest from '../ErrorPages/TempHousingBadRequest'
import moment from 'moment'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'

class TempHousingRequestScreen extends Component {

    constructor(props) {
        super(props);
        this.dateFormat = require('dateformat');
        this.state = {
            multiSliderValue: [0, 700],
            extraComments: '',
            startDate: '',
            endDate: '',
            features: {},
            comutes: {},
            time: '',
            bedrooms: 1,
            bathrooms: 1,
            startDateError: false,
            endDateError: false,
            address: {}
          }
        this.__ = __(this.props.screenLanguage)
    }

    componentWillUnmount() {
        this.props.showConciergeBell()
    }

    componentDidMount() {
        if (this.props.destinationAddress) {
            this.setState({
                address: this.props.destinationAddress
            })
        }
    }

    gotoScreen(screen, params = {}) {
        this.props.gotoScreen(screen, params);
    }
    multiSliderValuesChange(values) {
        this.setState({ multiSliderValue: values });
    }

    get averagePrice() {
        const [value1, value2] = this.state.multiSliderValue;
        return (value2 + value1) / 2;
    }

    startDate(value) {
        this.setState({
            startDate: value,
            startDateError: false
        }, () =>  {
            this.props.pop();
            if(this.state.endDate === ''){
                this.gotoScreen( 'TempHousingCalendar', { date: this.state.endDate, title: 'End Date', dateFunc: this.endDate.bind(this), initialDate: this.state.startDate })
            } else {
                if(moment(this.state.endDate).diff(this.state.startDate, 'days') <= 1) {
                    this.setState({
                        endDate: '',
                        endDateError: true
                    })
                    this.gotoScreen( 'TempHousingCalendar', { date: this.state.endDate, title: 'End Date', dateFunc: this.endDate.bind(this), initialDate: this.state.startDate })
                }
            }
        })
    }

    endDate(value) {
        if (moment(value).diff(this.state.startDate, 'days') >= 1 || this.state.startDate === '') {
            this.setState({
                endDate: value,
                endDateError: false
            })
            this.props.pop();
        }
    }

    returnData(features, comutes, time) {
        this.setState({ features: features, comutes: comutes, time: time });
    }

    setBedrooms(value) {
        this.setState({ bedrooms: value })
    }

    setBathrooms(value) {
        this.setState({ bathrooms: value })
    }

    formatCheckboxData(hash) {
        return Object.keys(hash).filter((key)=> {
            const elem = hash[key]
            return elem.checked
        })
    }

    async onSubmit() {
        if(this.state.startDate !== '' && this.state.endDate !== ''){

            this.setState({
                startDateError: false,
                endDateError: false
            })

            let housingParams = {
                city: this.state.address.city,
                state: this.state.address.state,
                zipCode: this.state.address.zipCode,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                bedrooms: this.state.bedrooms,
                bathrooms: this.state.bathrooms,
                averageDaily: [value1, value2] = this.state.multiSliderValue,
                extraComments: this.state.extraComments,
                comutes: this.formatCheckboxData(this.state.comutes),
                features: this.formatCheckboxData(this.state.features)
            }

            this.props.request(housingParams);

        } else if (this.state.startDate !== '' && this.state.endDate === ''){
            this.setState({
                endDateError: true,
                startDateError: false
            })
        } else if (this.state.startDate === '' && this.state.endDate !== '') {
            this.setState({
                startDateError: true,
                endDateError: false
            })
        } else {
            this.setState({
                startDateError: true,
                endDateError: true
            })
        }
    }

    saveAddress(address) {
        this.setState({
            address: address
        })
    }

    render() {
        const address = this.state.address;
        let renderer = null;

        if (this.props.getTempHousingError) {
           this.props.pop();
           this.props.gotoScreen('TempHousingBadRequest');
        } else {
          renderer = <ScreenWrapper
              backgroundImage={Images.texture03}
              watermark={Images.housingWatermark}>
                  <KeyboardAvoidingView style={{minHeight: '100%'}} behavior="padding" enabled>
                      <ScrollView style={[{ minHeight: '100%' }, styles.introCard]}>
                          <View style={styles.formWrapper}>
                              <TouchableOpacity onPress={() => this.props.openModal('edit-address')}>
                                  <H2 style={styles.header}>{this.__('title')}</H2>
                                  <View style={styles.horizontalAlign}>
                                      <Text style={styles.selectedAddress}>
                                          {address.city}, {address.zipCode}
                                      </Text>
                                  </View>
                              </TouchableOpacity>
                          </View>
                          <View style={styles.doubleElemContainer}>
                              <DatePicker hasError={this.state.startDateError} title={this.__('start')} screen={'TempHousingCalendar'} hasStyles={{width: '45%'}} initialDate={''} date={this.state.startDate} dateFunc={this.startDate.bind(this)} />
                              <DatePicker hasError={this.state.endDateError} title={this.__('end')} screen={'TempHousingCalendar'} hasStyles={{width: '45%'}} initialDate={this.state.startDate} date={this.state.endDate} dateFunc={this.endDate.bind(this)} />
                          </View>
                          <View style={styles.doubleElemContainer}>
                              <DivisionCounter initialValue={this.state.bedrooms} hasStyles={{ marginTop: 15, width: '45%'}} icon={Images.iconBed} setCount={this.setBedrooms.bind(this)} />
                              <DivisionCounter initialValue={this.state.bathrooms} hasStyles={{ marginTop: 15, width: '45%'}} icon={Images.iconShower} setCount={this.setBathrooms.bind(this)} />
                          </View>
                          <View style={styles.sliderContainer}>
                              <Text style={[S.mb, S.offwhite, S.textBase]}>${this.state.multiSliderValue[0]} - ${this.state.multiSliderValue[1]}</Text>
                              <MultiSlider
                                  values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
                                  containerStyle={{ height: 20 }}
                                  selectedStyle={{ backgroundColor: 'white' }}
                                  unselectedStyle={{ backgroundColor: '#A6BFFF' }}
                                  trackStyle={{ height: 3, backgroundColor: '#A6BFFF'}}
                                  markerStyle={{ width: 25, height: 25, borderRadius: 20 }}
                                  sliderLength={320}
                                  min={0}
                                  max={700}
                                  onValuesChange={ (values) => { this.multiSliderValuesChange(values) } } />
                              <Text style={[S.white, S.textXs]}>{this.__('average', this.averagePrice)}</Text>
                          </View>
                          <View style={[styles.formWrapper, S.mt]}>
                              <TextInput style={{ height: 40, color: '#A6BFFF' }} onChangeText={(extraComments) => this.setState({extraComments})} placeholder={this.__('extraComments')} placeholderTextColor={'#A6BFFF'} />
                          </View>
                          <TouchableOpacity style={[styles.horizontalAlign, styles.comuteContainer]} onPress={() => this.gotoScreen('TempHousingComute', {returnData: this.returnData.bind(this), comutes: this.state.comutes, features: this.state.features, time: this.state.time })}>
                              <Image source={Images.iconCommute} style={styles.houseIcon2} />
                              <H3 style={[S.white, S.textBase]}>{this.__('commuteTitle')}</H3>
                          </TouchableOpacity>
                          <View style={styles.sliderContainer}>
                              <Button label={this.__('buttonLabel')} type="secondary" style={ [styles.primaryButton, S.mb] } onPress={() => { this.onSubmit()} }/>
                          </View>
                      </ScrollView>
                  </KeyboardAvoidingView>
                  <AddressAutocompleteModal addressObj={address} modalKey={'edit-address'} onSubmit={ (address)=> this.saveAddress(address) }/>
              </ScreenWrapper>
        }

        return renderer
    }
}

const mapStateToProps = (state) => {
    const destinationAddress = getDestinationAddressSelector(state);
    return {
        destinationAddress: destinationAddress,
        screenLanguage: getLanguageDataSelector(state, 'TemporaryRequestScreen'),
        getTempHousingState: fromTempHousing.getTempHousingValue(state),
        getTempHousingError: fromTempHousing.getTempHousingErrorSelector(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen, params = {}) => {
            dispatch(navigate({ routeName: screen, params }));
        },
        pop: () => {
            dispatch(pop())
        },
        openModal: (key) => {
            dispatch(openModalById(key))
        },
        showConciergeBell: () => {
            dispatch(showBell())
        },
        request: (params) => {
            dispatch(fromTempHousing.asyncRequestTempHousing(params));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TempHousingRequestScreen)
