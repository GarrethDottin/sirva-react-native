import React, { Component } from 'react'
import { Linking } from 'react-native'
import { connect } from 'react-redux'
import { Link } from './'
import styles from './Styles/HelpAndSupportLinkStyles'

class HelpAndSupportLink extends Component {

    gotoHelpAndSupport = () => {
        Linking.openURL('https://www.imoveapp.com/help').catch(err => console.error('An error occurred', err));
    }

    render = () => {
        return (
            <Link style={[styles.supportLink, this.props.style]} onPress={() => this.gotoHelpAndSupport()}>{this.props.text}</Link>
        )
    }
}
const mapStateToProps = (state) => {
    return { }
}

export default connect(
    mapStateToProps
)(HelpAndSupportLink)