import React, { Component } from "react";
import { View } from "react-native";

import { connect } from 'react-redux';
import NoConnectionScreen from './Errors/NoConnectionScreen';
import ServerErrorScreen from './Errors/ServerErrorScreen';
import { hasServerError, hasConnectionError } from "../Redux/Modules/Errors";


export function ScreenHOC(ScreenComponent) {
  class Screen extends Component {

    render() {
      if (this.props.hasConnectionError) {
        return <NoConnectionScreen />
      }
      if (this.props.hasServerError) {
        return <ServerErrorScreen />
      }
      return <ScreenComponent {...this.props}/>
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      hasServerError:  hasServerError(state),
      hasConnectionError: hasConnectionError(state)
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
    }
  }
  
  return connect(mapStateToProps, mapDispatchToProps)(Screen);
}
