import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, TextInput, ScrollView, ImageBackground } from 'react-native'
import { asyncVerifyAccount } from '../../Redux/Modules/Authentication'
import { Button, Label, FloatingLabelTextField, HelpAndSupportLink } from '../../Components'
import { Images, Layout, Colors, Forms } from '../../Theme'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from './Styles/RegisterScreenStyles'
import { ScreenHOC } from '../Screen';

class RegisterScreen extends Component {

    state = {
        phone: '',
        phoneFormatted: ''
    }
    email = '';
    password = '';

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    onSubmit = () => {
        const phone = this.state.phone.replace(/\s/g, "").replace(/-/g, "").replace("(", "").replace(")", "").replace(/^1/, '')
        this.props.verifyAccount(this.email, this.password, phone)
    }

    componentDidMount = () => {
        const { params } = this.props.navigation.state
        this.email = params ? params.email : ''
        this.password = params ? params.password : ''
    }

    render = () => {

        return (
            <ImageBackground style={Layout.screenWrapper} source={Images.texture02} >
                <View style={[Layout.outerContainer]}>
                    <HelpAndSupportLink  />      
                    <ScrollView style={{width:'100%'}}>
                        <View style={[Layout.contentContainer]}>
                            <Image style={styles.logo} source={Images.logoIcon} />
                            
                            <H2 style={styles.title}>{this.__('title')}</H2>

                            <P style={styles.copy}>{this.__('subtitle')}</P>

                            <FloatingLabelTextField 
                                placeholder={this.__('label')}
                                autoCapitalize={'none'}
                                onChangeText={(value) => this.setState({phone: value})}
                                hasMask={true}
                                maskType='custom'
                                maskOptions={{
                                    mask: '1 (999) 999-9999',
                                }}
                                maxLength={16}
                                value={this.state.phone}
                            />
                            <Button
                                label={this.__('button')}
                                style={styles.button}
                                onPress={this.onSubmit} 
                            />
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        screenLanguage: getLanguageDataSelector(state, 'RegisterScreen'),
     }
}

const mapDispatchToProps = (dispatch) => {
    return {
        verifyAccount: (email, password, phone) => {
            dispatch(asyncVerifyAccount(email, password, phone));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(RegisterScreen))
