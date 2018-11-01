import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Images } from '../Theme';
import { H4 } from '../Components';
import styles from './Styles/FaqsStyles'
import S from '../StyleUtils/';

class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    openTab(){
        this.setState({ open: !this.state.open })
    }

    render() {
        return (
            <TouchableOpacity style={[styles.itemContainer, S.pv2]} onPress={() => this.openTab()}>
                <View style={[styles.faqItem, S.justifyBetween, S.ph5, S.mv3]}>
                    <Text style={[styles.faqQuestion, S.pr6]}>{this.props.info.question}</Text>
                    <Image style={this.state.open ? styles.arrowStyleRotated : styles.arrowStyle} source={Images.iconArrowheadSmallRightBlue } />
                </View>
                {this.state.open &&
                    <View style={[styles.faqAnswer, S.ph5]}>
                        <Text>{this.props.info.answer}</Text>
                    </View>
                }
            </TouchableOpacity>
        )
    }
}

export default class Faqs extends Component {
    render() {
        return (
            <View style={[styles.mainContainer, this.props.containerStyles ? this.props.containerStyles : null]}>
                <Text style={[S.mb, styles.title]}>FREQUENTLY ASKED QUESTIONS</Text>
                <FlatList
                    data={this.props.data}
                    renderItem={({item}) => <Item info={item} /> } />
            </View>
        )
    }
}
