import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { styles } from './Styles/TopNavHeaderStyles'
import { P } from './'
import colors from '../Theme/Colors'
import { NavLine } from './Animations'
export default class TopNavHeader extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        selectedId: PropTypes.number.isRequired,
        onPress: PropTypes.func.isRequired,
        style: PropTypes.any,
    }

    static defaultProps = {
        data: [],
        style: {},
        onPress: (index) => null,
        selectedId: null,
    }
    state = {
        selected: null,
        scrollWidth: null,
    }
    renderElements() {
        return this.props.data
            .map((element, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => this.props.onPress(index)}
                        activeOpacity={index === this.props.selectedId ? 1 : 0.2}
                        style={[index === this.props.selectedId ? styles.selectedOption : styles.notSelectedOption, this.props.optionStyles]}
                        onLayout={(event) => {
                            if (index == this.props.selectedId) {
                                this.setState({
                                    selected: event.nativeEvent.layout
                                })
                            }
                        }}
                        key={`${index + "TopNavHeaderElement"}`}>
                        <P style={[
                            styles.link,
                            { color: index === this.props.selectedId ? colors.darkBlue : colors.lightBlue },
                            
                            this.props.linkStyles
                        ]}>
                            {element.toUpperCase()}
                        </P>
                    </TouchableOpacity>
                )
            });
    }

    render() {
        var navline = this.state.selected && this.state.scrollWidth ? <NavLine index={this.props.selectedId} width={this.state.scrollWidth} selected={this.state.selected} /> : null;

        return (
            <ScrollView
                onContentSizeChange={(width, height) => {
                    this.setState({
                        scrollWidth: width
                    })
                }}
                contentContainerStyle={[styles.container, this.props.style]} horizontal showsHorizontalScrollIndicator={false}>
                {this.renderElements()}
                {navline}
            </ScrollView>
        );
    }
}
