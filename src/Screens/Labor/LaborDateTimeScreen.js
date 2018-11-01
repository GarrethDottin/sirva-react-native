import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Calendar } from 'react-native-calendars'
import dateFormat from 'dateformat'
import { asyncFetchRelocationData, getStartDateSelector } from '../../Redux/Modules/Relocation'
import { getAddress, getStartDateTime, setStartDateTime } from '../../Redux/Modules/Labor'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { ScreenWrapper, H2, P, Button, TimePicker } from '../../Components'
import { Colors, CalendarTheme, Images } from '../../Theme'
import styles from './Styles/LaborDateTimeScreenStyles'
import { navigate } from '../../Redux/Modules/Routing';
import { ScreenHOC } from '../Screen';

class LaborDateTimeScreen extends Component {

    maxDate = ''

    state = {
        selectedDate: new Date(),
    }

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount = () => {
        if (this.props.startDate == null) {
            this.props.refreshData()
        }

        let newDate = null
        if (this.props.laborStartDateTime !== null) {
            newDate = this.props.laborStartDateTime
        } else {
            newDate = new Date()
            newDate.setDate(newDate.getDate() + 7)
            newDate.setHours(9)
            newDate.setMinutes(0)
        }
        this.setState({ selectedDate: newDate })
    }

    updateDateTimeState = (date) => {
        this.hours = date.getHours()
        this.minutes = date.getMinutes()
        this.setState({
            selectedDate: date,
        })
    }

    onDayPress = (day) => {
        let newDate = this.state.selectedDate
        newDate.setFullYear(day.year)
        newDate.setMonth(day.month - 1)
        newDate.setDate(day.day)
        newDate.setHours(this.state.selectedDate.getHours())
        newDate.setMinutes(this.state.selectedDate.getMinutes())

        this.setState({ selectedDate: newDate })
    }    

    onTimePick = (newTime) => {
        this.updateDateTimeState(newTime)
    }

    onNextPress = () => {
        this.props.setStartDateTime(this.state.selectedDate)
        this.props.gotoScreen('LaborWorkers')
    }

    render() {
        const startDate = (this.props.relocationStartDate !== null) ? this.props.relocationStartDate : ''

        let markedDates={}
        markedDates[startDate] = { marked: true, textColor: Colors.lightGreen, dotColor: Colors.lightGreen, activeOpacity: 0 }
        markedDates[dateFormat((this.state.selectedDate), 'yyyy-mm-dd')] = { selected: true }

        return (
            <ScreenWrapper backgroundStyles={{flex:1}} backgroundImage={Images.texture05} watermark={Images.movingWatermark}>
                <ScrollView style={ { backgroundColor: Colors.lightBlueWithOpacity } }> 
                    <View style={styles.wrapper}>
                        <H2 style={styles.title}>{this.__('title')}</H2>
                    </View>

                    <View style={styles.calendarWrapper}>
                        <Calendar 
                            minDate={new Date()}
                            maxDate={this.maxDate}
                            markedDates={markedDates}
                            theme={CalendarTheme}
                            onDayPress={this.onDayPress} 
                        />
                    </View>

                    <View style={styles.wrapper}>
                        <P style={styles.label}>{this.__('date')}</P>
                        <View style={styles.dateWrapper}>
                            <P style={styles.date}>{dateFormat(this.state.selectedDate, 'mmmm d, yyyy')}</P>
                            <Image source={Images.iconCalendarSmallWhite} style={styles.calendarIcon} />
                        </View>

                        <TouchableOpacity onPress={() => { this.refs.TimePicker.open() }}>
                            <P style={styles.label}>{this.__('starttime')}</P>
                            <View style={styles.dateWrapper}>
                                <P style={styles.date}>{dateFormat(this.state.selectedDate, 'h:MM TT')}</P>
                                <Image source={Images.iconTime} style={styles.calendarIcon} />
                            </View>
                        </TouchableOpacity>
                        <Button label={this.__('button')} type="secondary" style={styles.button} onPress={() => this.onNextPress()} />
                    </View>
                </ScrollView>
                <TimePicker 
                    ref="TimePicker"
                    date={this.state.selectedDate}
                    cancelText={this.__('canceltext')}
                    saveText={this.__('savetext')}
                    onSave={(newTime) => this.onTimePick(newTime)}
                />
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        relocationStartDate: getStartDateSelector(state),
        laborStartDateTime: getStartDateTime(state),
        address: getAddress(state),
        screenLanguage: getLanguageDataSelector(state, 'LaborDateTimeScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen) => {
            dispatch(navigate({ routeName: screen }));
        },
        refreshData: () => {
            dispatch(asyncFetchRelocationData())
        },
        setStartDateTime: (date) => {
            dispatch(setStartDateTime(date))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(LaborDateTimeScreen))
