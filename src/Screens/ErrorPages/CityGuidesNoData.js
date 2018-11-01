import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, View, Text, Image } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { ScreenWrapper, H3, H4, InfoCard, DoubleDisplayCard } from '../../Components';
import { Images, Colors } from '../../Theme';
import { __, formatPhone, isValidPhone } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from './Styles/CityGuidesNoDataStyles';
import { getCounselorSelector } from '../../Redux/Modules/Relocation';
import S from '../../StyleUtils/';
import call from 'react-native-phone-call'
import { navigate } from '../../Redux/Modules/Routing'

class CityGuidesNoData extends Component {
    constructor(props){
      super(props);
      this.__ = __(this.props.screenLanguage)
    }

    makePhoneCall = (number) => {
        const params = {
            number,
            prompt: false
        }
        call(params).catch(err => console.log('An error occurred', err));
    }

    render() {
        let originCity = this.props.originCity;
        let destinationCity = this.props.destinationCity;
        let dropDownData = this.props.dropDownData;

        return (
          <ScreenWrapper backgroundImage={Images.texture01}>
              <ScrollView>
                  <View style={ { flex: 1, justifyContent: 'space-between' } }>
                       <View style={{ backgroundColor: '#3b73e6'}}>
                           <View style={styles.introView}>
                               <View style={styles.introCard}>
                                   <H3 style={[S.white, S.mb]}>{this.__('title')}</H3>
                                   <P style={[S.white, S.mb]}>{this.__('subtitle', destinationCity.city)}</P>
                                   <View>
                                       <H4 style={[S.orange2, {marginBottom: -30}]}>{this.__('dropDownLabel', originCity.city)}</H4>
                                       <Dropdown data={dropDownData}
                                          value={destinationCity.city + ", " + destinationCity.stateCode}
                                          baseColor={'rgba(255, 166, 66, 1)'}
                                          textColor={'rgba(255, 255, 255, 1)'}
                                          itemColor={'rgba(0, 0, 0, 1)'}
                                          selectedItemColor={'rgba(0, 0, 0, 1)'}
                                          onChangeText={(value) => this.props.onChangeDestination(value)} />
                                   </View>
                               </View>
                           </View>
                           <View style={S.pb}>
                               <Image source={Images.cactus} style={styles.cactusImage} />
                           </View>
                       </View>
                       {this.props.counselor && isValidPhone(this.props.counselor.workPhoneNumber) &&
                          <View style={[{ padding: 10 }, styles.secondContainer]}>
                              <P style={styles.infoText}>{this.__('subtitle2')}</P>
                              <Button style={[styles.button, styles.callButton]}
                                  label={this.__('callbutton', this.props.counselor.firstName)}
                                  type="secondary"
                                  labelStyle={styles.callButtonText}
                                  onPress={() => this.makePhoneCall(this.props.counselor.workPhoneNumber)} />
                          </View>
                       }
                       <View style={[{ padding: 10 }, styles.secondContainer]}>
                           <Button
                               label={this.__('takeMeHome')}
                               style={[styles.button, ((this.props.counselor && isValidPhone(this.props.counselor.workPhoneNumber)) ? styles.homeButton :  styles.callButton)]}
                               labelStyle={((this.props.counselor && isValidPhone(this.props.counselor.workPhoneNumber)) ? styles.homeButtonText : styles.callButtonText)}
                               type="seconday"
                               onPress={ () => { this.props.gotoScreen('Home') }} />
                       </View>
                   </View>
               </ScrollView>
         </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        screenLanguage: getLanguageDataSelector(state, 'CityGuidesNoData'),
        counselor: getCounselorSelector(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      gotoScreen: (screen) => {
          dispatch(navigate({ routeName: screen }));
      },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CityGuidesNoData)
