import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { RepaymentAgreementScreen, SetPasswordScreen, TermsOfUseScreen } from '../Screens';
import { OnboardingNavigator } from '../Screens/Onboarding/OnboardingNavigator';
import { navigate } from '../Redux/Modules/Routing';
import * as fromRelocation from '../Redux/Modules/Relocation';
import { ScreenHOC } from "../Screens/Screen";

class SetupLoadingScreen extends Component {
  componentDidMount() {
      if (this.props.isRelocationLoaded) {
          this.navigate();
      } else  {
          this.props.loadRelocationData();
      }
  }

  componentDidUpdate() {
      if (!this.props.isRelocationLoaded) {
          return
      }
      this.navigate();
  }

  navigate() {
      if (!this.props.transferee.termsOfUseAcceptedAt){
          this.props.navigate({routeName: 'TermsOfUse' })
      } else if (this.props.transferee.termsOfUseAcceptedAt && this.props.transferee.isPasswordTemporary) {
          this.props.navigate({routeName: 'SetPassword'})
      } else if (!this.props.transferee.isPasswordTemporary && this.props.signed === null){
          this.props.navigate({ routeName: 'RepaymentAgreement' })
      } else {
          this.props.navigate({ routeName: 'Onboarding'})
      }
  }

  render() {
    return(
        <View style={{flex: 1}}></View>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      isRelocationLoaded: state.relocation.loaded,
      signed: state.relocation.relocationData.signedAgreementAt,
      transferee: fromRelocation.getTransfereeSelector(state),
      setupComplete: fromRelocation.getSetupCompleteSelector(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadRelocationData: ()=> {
            dispatch(fromRelocation.asyncFetchRelocationData())
        },
        navigate: (navigationConfig) => {
            dispatch(navigate(navigationConfig));
        }
    }
}

const ConnectedSetupLoadingScreen =  connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(SetupLoadingScreen))

export const SetupNavigator = createSwitchNavigator({
  SetupLoading: ConnectedSetupLoadingScreen,
  SetupScreens: createStackNavigator(
    {
      TermsOfUse: TermsOfUseScreen,
      SetPassword: SetPasswordScreen,
      RepaymentAgreement: RepaymentAgreementScreen,
      Onboarding: OnboardingNavigator,
    },
    {
      navigationOptions: { header: null }
    }
  )
})
