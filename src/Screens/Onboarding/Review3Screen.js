import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, Label, TextInput, ScrollView } from 'react-native'
import { asyncFetchRelocationData, asyncSubmitStep3Data, getCurrentResidenceTypeSelector, getCurrentBedroomCountSelector } from '../../Redux/Modules/Relocation'
import { Button, H3, P, NumberField, MultiSelectButton, ScreenWrapper } from '../../Components'
import { Images, Layout, Colors } from '../../Theme'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from './Styles/Review3ScreenStyles'
import { ScreenHOC } from '../Screen';

class Review3Screen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Home Size',
        headerStyle: {
            backgroundColor: Colors.lightBlue,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
            lineHeight: 32,
            fontSize: 20,
            fontFamily: variables.baseHeaderFont,
            fontWeight: variables.weightSemiBold
        },
        headerMode: 'screen'
    })
    state = {
        type: 'house',
        bedCount: 1
    }

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount = () => {
        if (this.props.currentResidenceType === null) {
            this.props.refreshData()
        }
        this.setState({
            currentResidenceType: this.props.currentResidenceType,
            currentBedroomCount: this.props.currentBedroomCount
        })
    }

    onChangeBeds = (newValue) => {
        this.setState( {
            bedCount: newValue
        })
    }

    changeType = (newValue) => {
        this.setState({
            type: newValue
        })
    }

    onSubmit = () => {
        const { type, bedCount} = this.state
        const redirectTo = this.props.navigation.state.params ?
            this.props.navigation.state.params.redirectTo :
            'Main'

        this.props.submitStep3(type, bedCount, redirectTo)
    }

    render () {
        return (
            <ScreenWrapper backgroundImage={Images.texture06Blue}>
                <View style={[Layout.outerContainer]}>
                    <View style={{width:'100%', flex: 1}}>
                        <View style={[styles.wrapper]}>
                            <H3 style={styles.title}>{this.__('title')}</H3>
                            <H1 style={styles.subtitle}>{this.__('subtitle')}</H1>
                            <NumberField
                                icon={Images.iconBed}
                                text={this.__('beds')}
                                containerStyle={styles.fieldContainer}
                                onChange={this.onChangeBeds}
                                initialValue={this.state.bedCount}
                                minValue={0}
                                maxValue={9}
                            />
                            <P style={styles.copy}>{this.__('note')}</P>

                            <MultiSelectButton
                                elements={[
                                    {
                                        label: this.__('house'),
                                        children: null,
                                        style: {},
                                        onPress: () => this.changeType("house"),
                                        selected: this.state.type === "house",
                                    },
                                    {
                                        label: this.__('apartment'),
                                        children: null,
                                        style: {},
                                        onPress: () => this.changeType("apartment"),
                                        selected: this.state.type === "apartment",
                                    },
                                ]}
                                idSuffix={"typeswitcher"}
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
        currentResidenceType: getCurrentResidenceTypeSelector(state),
        currentBedroomCount: getCurrentBedroomCountSelector(state),
        screenLanguage: getLanguageDataSelector(state, 'Review3Screen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitStep3: (type, bedCount, redirectTo) => {
            dispatch(asyncSubmitStep3Data(type, bedCount, redirectTo))
        },
        refreshData: () => {
            dispatch(asyncFetchRelocationData())
        }
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenHOC(Review3Screen))
