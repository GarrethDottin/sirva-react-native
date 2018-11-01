import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Button, ScreenWrapper, ScreenCloseButton, H2 } from '../../Components';
import { Layout, Images, Colors, CalendarTheme } from '../../Theme';
import moment from 'moment';
import styles from './Styles/TempHousingCalendarStyles';
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'

class TempHousingCalendarScreen extends Component {

    constructor(props) {
        super(props);
        this.dateFormat = require('dateformat');
        this.state = {
            selectedDay: this.props.navigation.state.params.date || this.dateFormat(this.props.navigation.state.params.initialDate, "yyyy-mm-dd"),
            title: this.props.title
        };
        this.__ = __(this.props.screenLanguage)
    }

    onDayPress = (day) => {
        this.setState({
            selectedDay: day.dateString
        });
    }

    render() {
        const { params } = this.props.navigation.state;
        let date = this.dateFormat(params.date, 'yyyy-mm-dd');

        if (this.state.selectedDay != null) {
            date = this.state.selectedDay
        }

        LocaleConfig.locales['en'] = {
            monthNames: [
            'JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST',
            'SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'
        ]}

        let markedDates={}
        markedDates[date] = {selected: true}

        return (
            <ScreenWrapper
                backgroundStyles={Layout.screenWrapperAlt}
                backgroundImage={Images.texture01}
                watermark={Images.housingWatermark}>
                <View style={[Layout.innerContainerNarrowed, styles.wrapper]}>
                    <View style={styles.dateWrapper}>
                        <Calendar
                            minDate={this.props.navigation.state.params.initialDate ? this.dateFormat(moment(this.props.navigation.state.params.initialDate).add(1, 'd'), 'yyyy-mm-dd') : Date.now()}
                            maxDate={''}
                            markedDates={markedDates}
                            theme={CalendarTheme}
                            onDayPress={this.onDayPress} />
                    </View>
                    <View style={styles.actions}>
                        <H2 style={styles.selectedDate}>
                            {this.dateFormat(date, 'dddd, mmmm d, yyyy', true)}
                        </H2>
                        <Button
                            label=""
                            style={styles.actionButton}
                            onPress={() => {
                                params.dateFunc(this.state.selectedDay)
                            }}>
                            <Text style={styles.actionButtonText}>{this.__('buttonLabel')}</Text>
                        </Button>
                    </View>
                </View>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        screenLanguage: getLanguageDataSelector(state, 'TempHousingCalendarScreen')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TempHousingCalendarScreen)
