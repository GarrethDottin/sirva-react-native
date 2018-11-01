import React, { Component } from 'react';
import { ScrollView, View, Text, Image} from 'react-native';
import { connect } from 'react-redux';
import { __ } from '../../../Utils/ReactHelpers'
import { ScreenWrapper, H2, P } from '../../../Components';
import layout from '../../../Theme/Layout'
import images from '../../../Theme/Images'
import { showBell, hideBell } from '../../../Redux/Modules/Concierge'

import styles from './Styles/FsQuoteListScreenStyles'
import {  pop } from '../../../Redux/Modules/Routing';
import * as fromLocalization from '../../../Redux/Modules/Localization'
import * as fromRouting from '../../../Redux/Modules/Routing';

class FsQuoteLandingScreen extends Component {
    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)

        this.state = {
            skippedInventory: false
        }
    }

    componentDidMount(){
      this.props.hideConciergeBell();
    }

    componentWillUnmount(){
      this.props.showConciergeBell();
    }

    render() {
        return (
            <ScreenWrapper backgroundImage={images.texture05}>

                <View style={{alignSelf: 'flex-start'}}>
                    <ScrollView contentContainerStyle={styles.mainContent}>
                        <View style={layout.innerContainerNarrowed}>
                            <H2 style={styles.header}>
                                {this.__('prompttitle')}
                            </H2>
                            <P>
                                {this.__('promptcopy')}
                            </P>

                            <View style={styles.iconListItem}>
                                <Image source={images.fsInterrupterCalculator} />
                                <P style={styles.listItemText}>{this.__('promptbullet1')}</P>
                            </View>
                            <View style={styles.iconListItem}>
                                <Image source={images.fsInterrupterPiggy} />
                                <P style={styles.listItemText}>{this.__('promptbullet2')}</P>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={[layout.outerContainerAlt, forms.buttonSet, styles.buttonSet]}>
                        <Button
                            type="secondary"
                            label={this.__('promptestimatesbutton')}
                            onPress={() => this.props.navigateToFsQuoteList() } />

                        <Button
                            label={this.__('promptinventorybutton')}
                            onPress={() => {
                                    this.props.pop()
                                    this.props.navigate({ routeName: 'MqInventoryStart' })
                                    this.props.showConciergeBell()
                                  }
                                } />
                    </View>
                </View>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        screenLanguage: fromLocalization.getLanguageDataSelector(state, 'FsQuoteListScreen')
    }
}
const mapDispatchToProps = (dispatch, ownProps)=> {
    return {
        navigate: (navigateOptions)=> {
            dispatch(fromRouting.navigate(navigateOptions))
        },
        navigateToFsQuoteList: () => {
            ownProps.navigation.replace('FsQuoteList')
        },
        showConciergeBell: () => {
          dispatch(showBell())
        },
        hideConciergeBell: () => {
          dispatch(hideBell())
        },
        pop: () => {
            dispatch(pop())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FsQuoteLandingScreen);
