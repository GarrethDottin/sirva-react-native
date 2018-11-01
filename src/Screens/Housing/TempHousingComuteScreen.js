import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ScrollView, View, Image, TextInput, FlatList, KeyboardAvoidingView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { ScreenWrapper, H4, ProTip, Button, CheckBox } from '../../Components'
import { Images, Colors} from '../../Theme';
import styles from './Styles/TempHousingComuteScreenStyles'
import S from '../../StyleUtils/'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'

class TempHousingComuteScreen extends Component {

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
        this.state = {
            comutes: Object.keys(this.props.navigation.state.params.comutes).length === 0 ? {
                drive: { checked: false, label: this.__('drive') },
                public_transit: { checked: false, label: this.__('publicTransit') },
                bike: { checked: false, label: this.__('bike') },
                walk: { checked: false, label: this.__('walk') }
            } : this.props.navigation.state.params.comutes,
             features: Object.keys(this.props.navigation.state.params.features).length === 0 ? {
                 furnished: { checked: false, label: this.__('furnished') },
                 parking: { checked: false, label: this.__('parking') },
                 washer_dryer: { checked: false, label: this.__('washer') },
                 pool: { checked: false, label: this.__('pool') },
                 fitness_center: { checked: false, label: this.__('fitness') },
                 elevator: { checked: false, label: this.__('elevator') },
                 pets_friendly: { checked: false, label: this.__('pets') }
             } : this.props.navigation.state.params.features,
             time: this.props.navigation.state.params.time ? this.props.navigation.state.params.time : ''
         }
    }

    onChangeFeature(featureKey, isChecked) {
        var featuresArray = this.state.features;
        featuresArray[featureKey].checked = isChecked;

        this.setState({ features: featuresArray })
    }

    onChangeComute(comuteKey, isChecked) {
        var comutesArray = this.state.comutes;
        comutesArray[comuteKey].checked = isChecked;

        this.setState({ comutes: comutesArray })
    }

    onDone() {
        this.props.navigation.state.params.returnData(this.state.features, this.state.comutes, this.state.time)
        this.props.navigation.goBack()
    }

    render() {
        return (
            <ScreenWrapper
            backgroundImage={Images.texture01}
            watermark={Images.housingWatermark}>
                    <ScrollView style={ { minHeight: '100%' } }>
                    <KeyboardAvoidingView  behavior="padding" enabled>
                        <View style={styles.introCard}>
                            <Image source={Images.iconCommute} style={styles.houseIcon2} />
                            <H3 style={[S.white, S.textBase]}>{this.__('title')}</H3>
                        </View>
                        <View style={styles.mainContainer}>
                            <View style={styles.subContainer}>
                                <H4 style={styles.checkListTitle}>{this.__('commute')}</H4>
                                <FlatList data={Object.keys(this.state.comutes)} renderItem={({item}) => {
                                    const comute = this.state.comutes[item];
                                    return <CheckBox label={comute.label} isChecked={ comute.checked } onChange={(isChecked) => { this.onChangeComute(item, isChecked) }}/> }
                                } />
                            </View>
                            <View style={[styles.formWrapper, styles.subContainer]}>
                                <H4>{this.__('travelTime')}</H4>
                                <View style={styles.travelContainer}>
                                    <TextInput
                                        style={{ height: 40, flex: 1 }}
                                        onChangeText={(time) => this.setState({time})}
                                        placeholder={this.__('chooseTime')}
                                        placeholderTextColor={'#A19E9E'}
                                        value={this.state.time} />
                                    <Image source={Images.iconClock} style={styles.houseIcon2} />
                                </View>
                            </View>
                            <View style={[styles.subContainer, { marginTop: 10 }]}>
                                <H4 style={styles.checkListTitle}>{this.__('features')}</H4>
                                <FlatList data={Object.keys(this.state.features)} renderItem={({item}) => {
                                    const feature = this.state.features[item];
                                    return <CheckBox label={feature.label} isChecked={ feature.checked } onChange={(isChecked) => { this.onChangeFeature(item, isChecked) }} />
                                }}/>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    label={this.__('done')}
                                    style={ [styles.primaryButton] }
                                    onPress={ () => { this.onDone() } } />
                            </View>
                        </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
            </ScreenWrapper>
        )
    }
}

const mapDispatchToProps = (state) => {
    return {
        screenLanguage: getLanguageDataSelector(state, 'TempHousingComuteScreen')
    }
};

export default connect(
    mapDispatchToProps
)(TempHousingComuteScreen)
