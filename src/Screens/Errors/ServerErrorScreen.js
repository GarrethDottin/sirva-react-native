import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, H1, P, ScreenWrapper } from '../../Components';
import { resetError } from '../../Redux/Modules/Errors';
import * as fromLocalization from '../../Redux/Modules/Localization';
import * as fromRelocation from '../../Redux/Modules/Relocation';
import images from '../../Theme/Images';
import { __ } from '../../Utils/ReactHelpers';
import S from '../../StyleUtils';

export class ServerErrorScreen extends Component {
  constructor(props) {
    super(props);
    this.__ = __(this.props.componentLanguage);
  }

  conciergeSection() {
    return (
      <View style={ { alignItems: 'center', width: '100%' } }>
        <P style={ { marginBottom: 10, width: 250, textAlign: 'center' } }>
                  You can contact your concierge for assistance on your move.
        </P>
        {!this.props.counselor.isRoundRobin && (
            <Button style={ { width: '100%' } }
                    label={this.__('callConciergeButton', this.props.counselor.firstName)}
                    onPress={ ()=> this.props.tryAgain() } />
          )
        }
        {this.props.counselor.isRoundRobin && (
            <Button style={ { width: '100%' } }
                    label={this.__('callConciergeButtonRoundRobin')}
                    onPress={ ()=> this.props.tryAgain() } />
          )
        }
      </View>
    )
  }

  tryAgainSection() {
    return (
      <View>
        <Button label='Try Again' style={{ width: '100%', textAlign: 'center' }} onPress={ ()=> this.props.tryAgain() } />
      </View>
    )
  }

  render() {
    return (
      <ScreenWrapper>
        <View style={ { flex: 1, padding: 20, justifyContent: 'space-between', alignItems: 'center' } }>
          <View style={ { alignItems: 'center' } }>
            <View style={ { paddingVertical: 50 } }>
              <Image style={ { width: 316, height: 188 } }  resizeMode="contain"  source={ images.serverError }/>
            </View>
            <H1 style={ { marginTop: 0, width: 200, textAlign: 'center' } }>
              Server Error
            </H1>
            <P style={ { width: 220, textAlign: 'center' } }>
              We're sorry, there seems to be a problem on our end. Please try again in a few minutes.
            </P>
          </View>
          {
            this.props.counselor ?
              this.conciergeSection() :
              this.tryAgainSection()
          }
        </View>
      </ScreenWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tryAgain: ()=> { dispatch(resetError()) }
  }
}


const mapStateToProps = (state) => {
  return {
    counselor: fromRelocation.getCounselorSelector(state),
    componentLanguage: fromLocalization.getLanguageDataSelector(state, 'Concierge'),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerErrorScreen);
