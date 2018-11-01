import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, TextInput, ScrollView, ImageBackground } from 'react-native'
import { asyncSetPassword } from '../../Redux/Modules/Authentication'
import { H2, Button, Label, HelpAndSupportLink, PasswordStrengthChecker } from '../../Components'
import { Images, Layout, Colors, Forms } from '../../Theme'
import { passwordData } from '../../Config/Constants'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from './Styles/SetPasswordScreenStyles'
import { ScreenHOC } from '../Screen';

class SetPasswordScreen extends Component {

    state = {
        password: '',
        hasPasswordError: false,
        isValid: false
    }

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    onSubmit = () => {
        const password = this.state.password

        if (this.state.isValid) {
            this.props.setPassword(password)            
        } else {
            this.setState({ hasPasswordError: true })
        }
    }

    render() {
        return (            
            <ImageBackground style={Layout.screenWrapper} source={Images.texture02} >
                <View style={[Layout.outerContainer]}>
                    <HelpAndSupportLink  />      
                    <ScrollView style={{width:'100%'}}>
                        <Image style={styles.logo} source={Images.logoIcon} />
                        
                        <H2 style={styles.title}>{this.__('title')}</H2>

                        <View>
                            <PasswordStrengthChecker
                                languageData={this.props.screenLanguage.strengthchecker}
                                ruleNames="symbols|words"
                                strengthLevels={passwordData.strengthLevels}
                                tooShort={passwordData.tooShortData}
                                minLength={8}
                                minLevel={0}
                                ruleNames='lowerCase|upperCase'
                                showBarOnEmpty={true}
                                hasError={this.state.hasPasswordError}
                                value={this.state.password}
                                onChangeText={(text, isValid) => {
                                    this.setState({ password: text, isValid: isValid })
                            }} />

                            <Button label="Next" style={styles.button} onPress={this.onSubmit} />
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        screenLanguage: getLanguageDataSelector(state, 'SetPasswordScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPassword: (password) => {
            dispatch(asyncSetPassword(password))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(SetPasswordScreen))
