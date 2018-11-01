import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { ScreenWrapper, H1, P, Button } from '../../Components';

import images from '../../Theme/Images';
import { resetError } from '../../Redux/Modules/Errors';

export class NoConnectionScreen extends Component {
  render() {
    return (
      <ScreenWrapper>      
        <View style={ { flex: 1, padding: 20, justifyContent: 'space-between', alignItems: 'center' } }>
          <View style={ { alignItems: 'center' } }>
            <View style={ { paddingVertical: 60 } }>
              <Image style={ {  width: 300, height: 188 } } resizeMode="contain" source={ images.noConnectionError }/>
            </View>
            <H1 style={ { width: 200, textAlign: 'center' } }>
              No Internet Connection
            </H1>
            <P style={ { width: 220, textAlign: 'center' } }>
              Check that you're connected to the internet.
            </P>
          </View>
          <View>
            <Button label='Try Again' style={{ width: '100%',textAlign:'center'}} onPress={ ()=> this.props.tryAgain() } />
          </View>
        </View>
      </ScreenWrapper>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tryAgain: ()=> { dispatch(resetError()) }
  }
}

export default connect(null, mapDispatchToProps)(NoConnectionScreen);