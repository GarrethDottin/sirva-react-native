import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated, Easing, View, DatePickerIOS } from 'react-native'
import { Link } from '../Components'
import styles from './Styles/TimePickerStyles'

export default class TimePicker extends Component {

    static propTypes =  {
        date: PropTypes.instanceOf(Date),
        onSave: PropTypes.func,
        cancelText: PropTypes.string,
        saveText: PropTypes.string
    }

    static defaultProps = {
        date: new Date(),
        onSave: (value) => {},
        cancelText: "CANCEL",
        saveText: "SAVE"
    }

    selectedDate = this.props.date
    bottomValue = new Animated.Value(0)    
    interpolateBottom = this.bottomValue.interpolate({
        inputRange: [0,1],
        outputRange: [-265, 0]
    })
    state = {
        minuteInterval: 1
    }

    componentDidMount = () => {
        //this is a workaround for minuteInterval not working (core bug)
        //https://github.com/facebook/react-native/issues/9566
        this.setState({minuteInterval: 15});
    }

    setDate(newDate) {
        this.selectedDate = newDate
    }

    animate = (to) => {
        Animated.timing(this.bottomValue, {
            toValue: to,
            duration: 300,
            easing: Easing.ease,
        }).start()
    }

    open = () => {
        this.animate(1)
    }

    onCancel = () => {
        this.animate(0)
    }

    onSave = () => {
        this.props.onSave(this.selectedDate)
        this.onCancel()
    }

    render = () => {
        return (
            <Animated.View style={[styles.container, { bottom: this.interpolateBottom }]}>
                <View style={styles.header}>
                    <Link textStyle={styles.link} onPress={() => this.onCancel()}>{this.props.cancelText}</Link>
                    <Link textStyle={styles.link} onPress={() => this.onSave()}>{this.props.saveText}</Link>
                </View>
                <DatePickerIOS
                    ref="DatePicker"
                    date={this.props.date}
                    mode="time"
                    minuteInterval={this.state.minuteInterval} 
                    onDateChange={(newDate) => this.setDate(newDate)}
                />
            </Animated.View>
        )
    }
}