import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, View, Text, Image } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { ScreenWrapper, H3, H4, InfoCard, P, TopNavHeader, Button, H2, IntroCard } from '../../Components';
import { Images, Colors, Variables } from '../../Theme';
import { __, formatPhone, isValidPhone } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from './Styles/AgentCityNoDataStyles';
import { getCounselorSelector } from '../../Redux/Modules/Relocation';
import S from '../../StyleUtils/';
import call from 'react-native-phone-call'
import { navigate } from '../../Redux/Modules/Routing'

class AgentCityNoData extends Component {
    constructor(props){
      super(props);
      this.__ = __(this.props.screenLanguage);
		this.props = undefined;
    }

    makePhoneCall = (number) => {
        const params = {
            number,
            prompt: false
        }
        call(params).catch(err => console.log('An error occurred', err));
    }

    render() {
        let dropDownData = this.props.dropDownData;

        return (
            <ScreenWrapper
                backgroundImage={Images.texture05}
                watermark={Images.housingWatermark}>
                <ScrollView>

                <TopNavHeader
                    data={['Sell MY HOME', 'BUY A HOME']}
                    selectedId={this.props.isSellState ? 0 : 1}
                    onPress={(index) => this.props.handleHeaderSelection(index)}
                    style={styles.tabNav}
                />
                    <IntroCard styles={styles.introCard}>
                         <View style={{ paddingHorizontal: Variables.smallGutter }}>
                             <H2 style={{color: Colors.orange2}}>{this.__('title')}</H2>
                             <View style={styles.formWrapper}>
                                 <Dropdown data={dropDownData}
                                     value={this.props.location.city + ", " + this.props.location.state}
                                     fontSize={16}
                                     baseColor={Colors.orange2}
                                     textColor={'rgba(255, 255, 255, 0.6)'}
                                     itemColor={'rgba(0, 0, 0, 1)'}
                                     selectedItemColor={'rgba(0, 0, 0, 1)'}
                                     onChangeText={(value, index) => this.props.onChangeDestination(value, index)} />
                                </View>
                             <P style={{color: Colors.orange2}}>{this.__('subtitle', this.props.location.city)}</P>
                         </View>
                         <View style={S.pb}>
                             <Image source={Images.cactus} style={styles.cactusImage} />
                         </View>
                     </IntroCard>
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
                 </ScrollView>
             </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        screenLanguage: getLanguageDataSelector(state, 'AgentNoCityData'),
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
)(AgentCityNoData)
