import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, Image} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { getMoveDateSelector } from '../Redux/Modules/Relocation'
import { Images } from '../Theme';
import { getHousingIntroScreenView, housingIntroScreenView } from '../Redux/Modules/AppState'
import styles from './Styles/DatePickerStyles'

import { navigate } from '../Redux/Modules/Routing'

class DatePicker extends Component {

    constructor(props) {
        super(props);
        this.dateFormat = require('dateformat');
    }

    gotoScreen = (screen, params) => {
        this.props.gotoScreen(screen, params)
    }

    setDate = (value) => {
        this.setState({ date: value })
    }

    render() {
        const date = this.props.date ? this.props.date : '';
        const hasStyles = this.props.hasStyles ? this.props.hasStyles : {};
        const title = this.props.title ? this.props.title : 'Calendar';
        const initialDate = this.props.initialDate ? this.props.initialDate : '';
        const dateFunc = this.props.dateFunc ? this.props.dateFunc.bind(this) : this.setDate.bind(this);

        console.log(initialDate)

        return (
            <View style={[hasStyles, (this.props.hasError ?  styles.hasError : styles.formWrapper)]}>
                <Text style={styles.header}>{this.props.title}</Text>
                <TouchableOpacity style={styles.horizontalAlign} onPress={() => this.gotoScreen(this.props.screen, { date: date, title: title, dateFunc: dateFunc, initialDate: initialDate })}>
                    <Text style={styles.selectedDate}>
                        {date == '' ? '' : this.dateFormat(date, 'mmm d, yyyy', true)}
                    </Text>
                    <Image source={Images.iconCalendarSmallWhite} style={styles.calendarIcon} />
                </TouchableOpacity>
            </View>
      )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen, params = {}) => {
            dispatch(navigate({ routeName: screen, params }));
        },
    }
};

export default connect(
    null,
    mapDispatchToProps
)(DatePicker)
