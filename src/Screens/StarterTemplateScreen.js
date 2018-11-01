import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { View, Text } from 'react-native'

class StarterTemplateScreen extends Component {

  static propTypes = {}
  render () {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>RepaymentAgreementScreen Screen</Text>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StarterTemplateScreen)