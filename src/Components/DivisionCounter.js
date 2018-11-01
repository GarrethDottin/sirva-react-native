import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, Image} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Images } from '../Theme';
import styles from './Styles/DivisonCounterStyles'
import S from '../StyleUtils/'


class DivisionCounter extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.initialValue
        }
    }

    increment = () => {
        this.setState({value: this.state.value + 1}, () => {
            this.props.setCount(this.state.value)
        });
    }

    decrement = () => {
        if (this.state.value > 0) {
            this.setState({value: this.state.value - 1},
            () => {
                this.props.setCount(this.state.value)
            });
        }
    }

    render() {
        const hasStyles = this.props.hasStyles ? this.props.hasStyles : {};
        const icon = this.props.icon;

        return (
            <View style={[hasStyles, styles.formWrapper, styles.horizontalAlign]}>
                <Image source={icon} style={styles.icon} />
                <TouchableOpacity style={S.mr} onPress={() => this.decrement()}><Text style={S.white}>-</Text></TouchableOpacity>
                <Text style={[S.offwhite, S.textBase]}>{this.state.value}</Text>
                <TouchableOpacity style={S.ml} onPress={() => this.increment()}><Text style={S.white}>+</Text></TouchableOpacity>
            </View>
      )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DivisionCounter)
