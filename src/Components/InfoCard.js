import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, TouchableHighlight } from 'react-native'
import { H4 } from './'
import styles from './Styles/InfoCardStyles'
import { Images } from '../Theme'
import { navigate } from '../Redux/Modules/Routing'
import { asyncSetVisibleKey } from '../Redux/Modules/CityGuides'

class InfoCard extends Component {
    render() {
        return (
            <TouchableHighlight style={styles.touchableHighStyle} onPress={() =>{
                this.props.goToScreen('CompareInfoScreen', { screenName: this.props.screenName });
                this.props.setVisibleKey(this.props.visibleKey);
            }}>
                <View style={styles.card}>
                    <View style={styles.body}>
                        <View style={styles.header}>
                            { this.props.headerIcon && <Image style={styles.image} source={this.props.headerIcon} /> }
                            <View>
                                <H4 style={styles.headerCopy}>{this.props.headerCopy}</H4>
                                { this.props.subtitle ? <P style={styles.subtitle}>{this.props.subtitle}</P> : null}
                            </View>
                        </View>
                        <Image style={styles.arrow} source={images.iconArrowheadBlue} />
                    </View>
                    <View style={this.props.styleChild ? this.props.styleChild : null}>
                        { this.props.children}
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}
const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        goToScreen: (screen, params) => {
            dispatch(navigate({ routeName: screen, params }))
        },
        setVisibleKey: (visibleKey) => {
            dispatch(asyncSetVisibleKey(visibleKey))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InfoCard)
