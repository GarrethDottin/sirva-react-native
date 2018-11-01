import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, TouchableOpacity } from 'react-native'
import { H1, H2, P } from './'
import { Images } from '../Theme'
import styles from './Styles/NumberFieldStyles'


export default class NumberField extends Component {
    static propTypes = {
        icon: PropTypes.number,
        text: PropTypes.string.isRequired,
        initialValue: PropTypes.number,
        minValue: PropTypes.number,
        maxValue: PropTypes.number,
        containerStyle: PropTypes.any,
        onChange: PropTypes.func,
        styles: PropTypes.object
    }
      
    static defaultProps = {
        icon: null,
        initialValue: 0,
        minValue:0,
        maxValue:0,
        containerStyle: {},
        onChange: null,
        styles: {
            labelText: null,
            innerWrapper: null,
            inputText: null,
            button: null
        }
    }

    state = {
        value: 0
    } 

    componentDidMount = () => {
        //make sure min/max are valid
        if (this.props.minValue < 0) this.props.minValue = 0
        if (this.props.maxValue != 0 && this.props.maxValue < this.props.minValue) this.props.maxValue = this.props.minValue


        //make sure initialValue is between min and max
        let newValue = this.props.initialValue
        if (this.props.initialValue < this.props.minValue) newValue = this.props.minValue
        else if (this.props.maxValue != 0 && this.props.initialValue > this.props.maxValue) newValue = this.props.maxValue

        this.setState({ 
            value: newValue
        })
    }

    increment = () => {
        const newValue = this.state.value + 1

        if (this.props.maxValue == 0 || newValue <= this.props.maxValue) {
            this.setState({
                value: newValue
            })
            if (this.props.onChange !== null) this.props.onChange(newValue)
        }
    }

    decrement = () => {
        const newValue = this.state.value - 1
        if (newValue >= this.props.minValue) {
            this.setState({
                value: newValue
            })
            if (this.props.onChange !== null) this.props.onChange(newValue)
        }
    }

    render() {
        const icon = (this.props.icon !== null)
            ? <Image source={this.props.icon} style={styles.labelIcon} />
            : null

        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <View style={styles.innerWrapper}>
                    {icon}
                    <P style={[styles.labelText, this.props.styles.labelText]}>{this.props.text}</P>
                </View>
                <View style={[styles.innerWrapper, this.props.styles.innerWrapper]}>
                    <TouchableOpacity onPress={() => this.decrement()} style={{}}>
                        <H2 style={[styles.button, this.props.styles.button]}>-</H2>
                    </TouchableOpacity>
                    <H1 style={[styles.inputText, this.props.styles.inputText]}>{this.state.value}</H1>
                    <TouchableOpacity onPress={() => this.increment()} style={{}}>
                        <H2 style={[styles.button, this.props.styles.button]}>+</H2>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
