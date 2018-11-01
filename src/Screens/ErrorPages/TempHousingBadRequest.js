import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, View, Text, Image } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { ScreenWrapper, H2, H3, H4, InfoCard, DoubleDisplayCard, Button } from '../../Components';
import { Images, Colors } from '../../Theme';
import { __, formatPhone, isValidPhone } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from '../ErrorPages/Styles/TempHousingBadRequestStyles';
import { getCounselorSelector } from '../../Redux/Modules/Relocation';
import S from '../../StyleUtils/';
import call from 'react-native-phone-call'
import { navigate } from '../../Redux/Modules/Routing'

class TempHousingBadRequest extends Component {
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
        return (
          <ScreenWrapper backgroundImage={Images.texture01}>
            <View style={ { flex: 1, justifyContent: 'space-between' } }>
                 <View style={[S.mtXxl]}>
                     <View style={[S.pb, S.mb, S.mtXxxl]}>
                         <Image source={Images.tempHousingError} style={styles.pic} />
                     </View>
                     <H2 style={[{textAlign: 'center'}, S.pb]}>{this.__('title')}</H2>
                     <P style={{textAlign: 'center', width: '90%', alignSelf: 'center'}}>{this.__('subtitle')}</P>
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
                          onPress={ () => { this.props.gotoScreen('Home') } } />
                  </View>
             </View>
         </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        screenLanguage: getLanguageDataSelector(state, 'TempHousingBadRequest'),
        counselor: getCounselorSelector(state),
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
)(TempHousingBadRequest)
