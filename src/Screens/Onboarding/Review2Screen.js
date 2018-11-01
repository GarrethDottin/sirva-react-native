import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, Label, TextInput, ScrollView } from 'react-native'
import { asyncFetchRelocationData, asyncSubmitStep2Data, getCurrentAdultsSelector, getCurrentKidsSelector } from '../../Redux/Modules/Relocation'
import { Button, H3, P, NumberField, ScreenWrapper } from '../../Components'
import { Images, Layout } from '../../Theme'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from './Styles/Review2ScreenStyles'
import { ScreenHOC } from '../Screen';

class Review2Screen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Who\'s Moving',
        headerStyle: {
            backgroundColor: colors.lightBlue,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
            lineHeight: 32,
            fontSize: 20,
            fontFamily: variables.baseHeaderFont,
            fontWeight: variables.weightSemiBold
        }
    })
    state = {
        adultCount: 1,
        childCount: 0
    }

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount = () => {
        if (this.props.adults === null) {
            this.props.refreshData()
        }
        this.setState({
            adultCount: (this.props.adults === null || this.props.adults === 0) ? 1 : this.props.adults,
            childCount: (this.props.kids === null) ? 0 : this.props.kids
        })
    }

    onChangeAdult = (newValue) => {
        this.setState( {
            adultCount: newValue
        })
    }

    onChangeChild = (newValue) => {
        this.setState( {
            childCount: newValue
        })
    }

    onSubmit = () => {
        const { adultCount, childCount} = this.state
        const redirectTo = this.props.navigation.state.params ?
            this.props.navigation.state.params.redirectTo :
            'Review3'

        this.props.submitStep2(adultCount, childCount, redirectTo)
    }

    render () {
        return (
            <ScreenWrapper backgroundImage={images.texture06Blue}>
                <View style={[Layout.outerContainer]}>
                    <View style={{width:'100%', flex: 1}}>
                        <View style={[styles.wrapper]}>
                            <H3 style={styles.title}>{this.__('title')}</H3>
                            <H1 style={styles.subtitle}>{this.__('subtitle')}</H1>
                            <NumberField
                                icon={Images.iconAdult}
                                text={this.__('adults')}
                                containerStyle={styles.fieldContainer}
                                onChange={this.onChangeAdult}
                                initialValue={this.state.adultCount}
                                minValue={1}
                                maxValue={9}
                            />
                            <NumberField
                                icon={Images.iconChild}
                                text={this.__('children')}
                                containerStyle={styles.fieldContainer}
                                onChange={this.onChangeChild}
                                initialValue={this.state.childCount}
                                maxValue={9}
                            />
                        </View>
                    </View>
                    <Button
                        label={this.__('button')}
                        style={styles.button}
                        onPress={this.onSubmit}
                    />
                </View>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        adults: getCurrentAdultsSelector(state),
        kids: getCurrentKidsSelector(state),
        screenLanguage: getLanguageDataSelector(state, 'Review2Screen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitStep2: (adultCount, childCount, redirectTo) => {
            dispatch(asyncSubmitStep2Data(adultCount, childCount, redirectTo))
        },
        refreshData: () => {
            dispatch(asyncFetchRelocationData())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(Review2Screen));
