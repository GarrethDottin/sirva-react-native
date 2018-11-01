import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ScrollView, View, Image, TouchableOpacity } from 'react-native'
import images from '../../../Theme/Images'
import layout from '../../../Theme/Layout'
import { H2, P, ScreenWrapper, ScreenCloseButton } from '../../../Components'
import { __ } from '../../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../../Redux/Modules/Localization'
//import styles from './Styles/FsQuoteSubmittedScreenStyles'
import { getMovingQuoteDetailSelector } from '../../../Redux/Modules/Moving'
import { ScreenHOC } from '../../Screen';

class FsQuoteSubmittedScreen extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    render() {
        const props = this.props
        const quote = props.quote

        return (
            <ScreenWrapper
                backgroundImage={images.texture05}
                watermark={images.movingWatermark}>

                <View style={[ layout.innerContainerNarrowed, {paddingTop: 30, flex: 1}]}>
                    <H2 style={{paddingBottom: 30}}>{this.__('title')}</H2>

                    <P>
                        {this.__('note', quote.supplierData.data.name)}
                    </P>
                </View>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        quote: getMovingQuoteDetailSelector(state),
        screenLanguage: getLanguageDataSelector(state, 'FsQuoteSubmittedScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return { };
};

export default connect(
    mapStateToProps,
    null
)(ScreenHOC(FsQuoteSubmittedScreen))