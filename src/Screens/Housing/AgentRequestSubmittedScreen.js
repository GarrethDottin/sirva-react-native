import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ScrollView, View, Text, Image } from 'react-native'
import { ScreenWrapper, H2, H3, H4, P } from '../../Components'
import { Images, Layout, Variables } from '../../Theme'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from './Styles/AgentRequestSubmittedScreenStyles'
import S from '../../StyleUtils/'

class AgentRequestSubmittedScreen extends Component {
    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    render() {
        const agentAttributes = this.props.agent.attributes

        return (
            <ScreenWrapper
            backgroundStyles={styles.backgroundStyles}
            backgroundImage={Images.texture05}
            watermark={Images.housingWatermark}>
                <ScrollView contentContainerStyle={[Layout.fullHeight, Layout.innerContainerNarrowed, Layout.bottomSpacer, styles.container]}>
                  <H2 style={S.mb}>{this.__('title')}</H2>
                  <View style={styles.mainContainer}>
                      {agentAttributes.images.profile &&
                      <Image style={[styles.avatar, S.mr]} source={{ uri: agentAttributes.images.profile }} />
                      }
                    <View>
                      <H3>{agentAttributes.agentName}</H3>
                      {agentAttributes.yearsOfExperience &&
                          <H4>{agentAttributes.yearsOfExperience} {this.__('experience')}</H4>
                      }
                    </View>
                  </View>
                  <P>{this.__('subtitle', agentAttributes.agentName)}</P>

                </ScrollView>
            </ScreenWrapper>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        agent: state.housing.currentAgent,
        screenLanguage: getLanguageDataSelector(state, 'AgentRequestSubmittedScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AgentRequestSubmittedScreen)
