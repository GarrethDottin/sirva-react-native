import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, TextInput, ScrollView, ImageBackground, TouchableOpacity} from 'react-native'
import { asyncSetPassword } from '../../Redux/Modules/Authentication'
import { ScreenWrapper, H2, H4, P, Button, CheckBox, HelpAndSupportLink, AppModalFullScreen, HtmlView } from '../../Components'
import { Images, Layout, Colors, Forms } from '../../Theme'
import { __ } from '../../Utils/ReactHelpers'
import { getRelocationDataSelector, asyncSignTerms } from '../../Redux/Modules/Relocation'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from './Styles/TermsOfUseScreenStyles'
import { ScreenHOC } from '../Screen';
import S from '../../StyleUtils';
import { openModalById } from '../../Redux/Modules/Modal';
import { navigate } from '../../Redux/Modules/Routing';

class TermsOfUseScreen extends Component {
    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage);
        this.state = {
            isChecked: false
        }
    }

    onSubmit = () => {
        if (this.state.isChecked) {
            this.props.acceptTerms()
            this.props.gotoScreen()
        }
    }

    setIsChecked(isChecked) {
        this.setState({
            isChecked
        })
    }

    render() {
        return (
            <ScreenWrapper>
                <View style={[S.p8, S.flex1]}>
                    <View>
                      <View>
                        <HelpAndSupportLink text={'Help & Support'}></HelpAndSupportLink>
                      </View>
                      <Image style={styles.logo} source={Images.logoIcon} />
                      <H2 style={styles.title}>{this.__('title')}</H2>
                      <View style={ [S.flexRow, S.itemsCenter] }>
                        <View>
                            <CheckBox isChecked={this.state.isChecked} onChange={ (isChecked)=> this.setIsChecked(isChecked) }  containerStyles={ [S.mv0, S.mh0] }></CheckBox>
                        </View>
                        <View>
                            <P>{this.__('content')}</P>
                            <Text>
                                <Text style={{color: Colors.lightBlue}} onPress={() => this.props.openModal('detail-terms')}>{this.__('termsOfuse')} </Text>
                                <Text>{this.__('and')}</Text>
                                <Text style={{color: Colors.lightBlue}} onPress={() => this.props.openModal('detail-privacy')}> {this.__('privacyPolicy')}</Text>
                            </Text>
                        </View>
                      </View>
                    </View>
                    <View style={ [S.flex1, S.justifyCenter] }>
                      <Button disabled={!this.state.isChecked} label={this.__('termsButton')} style={[styles.button]} onPress={this.onSubmit} />
                    </View>
                </View>
                <AppModalFullScreen modalKey={"detail-terms"} type="gray">
                    <View style={ [S.flex1] }>
                        <View style={ { height: '100%' } }>
                            <HtmlView source={ { html: `<style> html { font-family: 'Nunito Sans'; color: white; padding-top: 16 }</style>${this.__('termsText')}` } } ></HtmlView>
                        </View>
                    </View>
                </AppModalFullScreen>
                <AppModalFullScreen modalKey={"detail-privacy"} type="gray">
                    <View style={ [S.flex1] }>
                        <View style={ { height: '100%' } }>
                            <HtmlView source={ { html: `<style> html { font-family: 'Nunito Sans'; color: white; padding-top: 16 }</style>${this.__('privacyText')}` } } ></HtmlView>
                        </View>
                    </View>
                </AppModalFullScreen>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        screenLanguage: getLanguageDataSelector(state, 'TermsOfUse'),
        relocationData: getRelocationDataSelector(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      gotoScreen: () => {
          dispatch(navigate({ routeName: 'SetPassword' }));
      },
      openModal: (modalId) => {
          dispatch(openModalById(modalId))
      },
      acceptTerms: () => {
          dispatch(asyncSignTerms());
      }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(TermsOfUseScreen))
