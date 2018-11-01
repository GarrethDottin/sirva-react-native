import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import { P, Link } from '../../';

import { Colors, Variables } from '../../../Theme';

import * as fromSystemMessage from '../../../Redux/Modules/SystemMessaging';
import * as fromModal from '../../../Redux/Modules/Modal';

const wrapperStyle = {
    padding: 20,
    margin: Variables.smallGutter,
    backgroundColor: Colors.orange,
    borderRadius: 6,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: { height: 0, width: 0 },
}

const linkStyle = {
    alignSelf: 'flex-end',
    marginTop: 0,
    paddingBottom: 0
}

const linkTextError = {
    color: Colors.white
}

const linkTextSuccess = {
    color: Colors.darkGray
}

class Message extends PureComponent {
    render() {
        const { isSuccess } = this.props;
        const bgColor = isSuccess ? Colors.lightGreen : Colors.orange;
        const linkTextColor = isSuccess ? Colors.darkGray : Colors.white ;
        
        return <View style={ [wrapperStyle, { backgroundColor: bgColor }] }>
            <View style={ [{ alignItems: 'center' }] }>
                <P style={ linkTextError }>{this.props.message}</P>
                {this.props.showDismissLink &&
                    <Link style={linkStyle} textStyle={ { color: linkTextColor } } onPress={()=> this.props.closeModal()}>Got it!</Link> 
                }            
            </View>
        </View>
    }
}

const mapStateToProps = (state) => {
    return {
        message: fromSystemMessage.getMessage(state),
        showDismissLink: fromSystemMessage.shouldShowDismissLink(state),
        isSuccess: fromSystemMessage.isSuccess(state)
    }
}

const mapDispatchToProps = (_)=> {
    return {};
}

export const SystemMessage = connect(mapStateToProps, mapDispatchToProps)(Message);
