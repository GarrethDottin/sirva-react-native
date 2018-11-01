import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet, ImageBackground, Image, TouchableHighlight } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import P from '../../Components/P';
import H2 from '../../Components/H2';
import Button from '../../Components/Button';
import ScreenWrapper from '../../Components/ScreenWrapper'
import images from '../../Theme/Images'
import variables from '../../Theme/Variables'
import colors from '../../Theme/Colors'
import layout from '../../Theme/Layout'
import styles from './Styles/MqDateScreenStyles'
import CalendarTheme from '../../Theme/Calendar'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { asyncFetchRelocationData, asyncUpdateMoveDate,getStartDateSelector, getMoveDateSelector } from '../../Redux/Modules/Relocation'
import { navigate } from '../../Redux/Modules/Routing';
import { hideBell, showBell } from '../../Redux/Modules/Concierge'

//TODO: Update move date in relocation redux module
class MqMovingDateScreen extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)

        this.dateFormat = require('dateformat');

        this.state = {
            selectedDay: null
        };
    }

    componentDidMount = () => {
        if (this.props.relocationData == null) {
            this.props.refreshData()
        }

        this.props.hideConciergeBell();
    }

    gotoScreen = (screen) => {
        this.props.gotoScreen(screen)
    }

    componentWillUnmount() {
      this.props.showConciergeBell();
    }

    onDayPress = (day) => {
        this.setState({
            selectedDay: day.dateString
        });
    }

    saveSelectedDate = () => {
        this.props.updateMoveDate(this.state.selectedDay)
    }

    render() {
        let startDate = ''
        let startDateFormatted = ''
        let maxDate = ''
        let moveDate = this.props.moveDate ? this.props.moveDate : this.dateFormat(Date.now(), 'yyyy-mm-dd')

        //User has selected a new date but hasn't finalized the choice
        if (this.state.selectedDay != null) {
            moveDate = this.state.selectedDay
        }

        startDate = this.props.startDate
        startDateFormatted = this.dateFormat(startDate, 'mmmm d, yyyy', true)
        //maxDate = new Date(startDate)

        let markedDates={}
        markedDates[startDate] = {marked: true, textColor: colors.lightGreen, dotColor: colors.lightGreen, activeOpacity: 0}
        markedDates[moveDate] = {selected: true}

        return (
            <ScreenWrapper
                backgroundStyles={[layout.screenWrapperAlt]}
                backgroundImage={images.texture01}
                watermark={images.movingWatermark}>

                <ScrollView style={styles.screen} contentContainerStyle={[layout.innerContainerNarrowed, layout.fullHeight, styles.wrapper]}>
                    <P style={styles.introCopy}>
                        {this.__('introtextstart')} <Text style={styles.startDate}>{startDateFormatted}.</Text>
                        {"\n"}
                        {this.__('introtextend')}
                    </P>
                    <View style={styles.dateWrapper}>
                        <Calendar
                            minDate={Date.now()}
                            maxDate={maxDate}
                            markedDates={markedDates}
                            theme={CalendarTheme}
                            onDayPress={this.onDayPress}
                        />
                    </View>

                    <View style={styles.actions}>
                        <H2 style={styles.selectedDate}>
                            {this.dateFormat(moveDate, 'dddd, mmmm d, yyyy', true)}
                        </H2>
                        <Button
                            label=""
                            style={styles.actionButton}
                            onPress={() => this.saveSelectedDate()}
                        >
                            <Text style={styles.actionButtonText}>{this.__('button')}</Text>
                        </Button>
                    </View>
                </ScrollView>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        startDate: getStartDateSelector(state),
        moveDate: getMoveDateSelector(state),
        screenLanguage: getLanguageDataSelector(state, 'MqMovingDateScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen, params) => {
            dispatch(navigate({ routeName: screen, params: params }));
        },
        refreshData: () => {
            dispatch(asyncFetchRelocationData());
        },
        updateMoveDate: (date) => {
            dispatch(asyncUpdateMoveDate(date))
        },
        hideConciergeBell: () => {
          dispatch(hideBell())
        },
        showConciergeBell: () => {
          dispatch(showBell())
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MqMovingDateScreen)
