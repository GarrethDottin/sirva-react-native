import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ScrollView, View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import { ScreenWrapper, Link, H2, H3, P, ProTip, Button, Li, AppModalFullScreen, HtmlView } from '../../Components'
import { Images, Layout, Variables } from '../../Theme'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { asyncRequestRealtorLeadSubmission, asyncGetLead, } from '../../Redux/Modules/Housing'
import { checkForFeedback, setFeedbackLocationText } from '../../Redux/Modules/Feedback'
import * as fromModal from '../../Redux/Modules/Modal';

import styles from './Styles/AgentDetailsScreenStyles'
import { navigate } from '../../Redux/Modules/Routing'
import moment from 'moment'
import S from '../../StyleUtils/'

class AgentDetailScreen extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount() {
        this.props.getLead(this.props.agent.attributes.noyoId)
    }

    openLink = (url) => {
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    makeRequest = (agentAttributes) => {
        this.props.requestRealtor(agentAttributes.noyoId)
    }

    getRequestedTime(request_date){
        let now = moment(new Date());
        let duration = moment.duration(now.diff(request_date));

        if (duration.asMinutes() < 1)
          return parseInt(duration.asSeconds()) + " seconds";
        else if (duration.asHours() < 1)
            return parseInt(duration.asMinutes()) + " minutes";
        else if (duration.asHours() < 24)
            return parseInt(duration.asHours()) + " hours";
        else
            return parseInt(duration.asDays()) + " days";
        }

    render() {

        const agentAttributes = this.props.agent.attributes
        const request_date = this.props.getAgentLead ? this.props.getAgentLead : null;

        return (
            <ScreenWrapper
            backgroundImage={Images.texture05}
            watermark={Images.housingWatermark}>

                <ScrollView contentContainerStyle={[Layout.fullHeight, Layout.innerContainerNarrowed, Layout.bottomSpacer, styles.container]}>
                    <View style={styles.intro}>
                        {agentAttributes.images.profile &&
                        <Image style={styles.avatar} source={{ uri: agentAttributes.images.profile }} />
                        }
                        <H2>{agentAttributes.agentName}</H2>

                        {(agentAttributes.yearsOfExperience || agentAttributes.licenseNumber) &&
                        <P style={styles.subheader}>
                            {agentAttributes.yearsOfExperience &&
                                <Text>{agentAttributes.yearsOfExperience} {this.__('experience')}</Text>
                            }
                            {agentAttributes.yearsOfExperience && agentAttributes.licenseNumber &&
                                <Text>  |  </Text>
                            }

                            {agentAttributes.licenseNumber &&
                                <Text>{this.__('licensed')}</Text>
                            }
                        </P>
                        }
                          <Button label={`${this.__('call')}`} style={[styles.callButton, S.mb]} onPress={() => {
                            this.makeRequest(agentAttributes)
                            this.props.feedbackCheck()
                            this.props.feedbackText(
                                this.__("moodTrackerTitle"),
                                this.__("moodTrackerText")
                            )
                          }} />

                          {request_date !== null &&
                              <Text>{this.__('request', this.getRequestedTime(request_date))}</Text>
                          }

                    </View>

                    {agentAttributes.cities &&
                        <View style={styles.infoSection}>
                            <H3 style={styles.sectionHeader}>{this.__('serviceareas')}</H3>
                            <P>
                                {
                                    agentAttributes.cities.reduce((accumulator, currentValue, currentIndex, array) => {

                                    if (currentIndex == 1) {
                                        accumulator = accumulator.split(',')[0] + ", "
                                    }

                                    let cities =`${accumulator} ${currentValue.split(',')[0]}`

                                    if (currentIndex <  array.length - 1) {
                                        cities += ","
                                    }

                                    return cities
                                })}
                            </P>
                        </View>
                    }
                    {agentAttributes.about &&
                        <View style={styles.infoSection}>
                            <H3 style={styles.sectionHeader}>{this.__('about')}</H3>
                            <P>{agentAttributes.about}</P>
                        </View>
                    }

                    {(agentAttributes.twitter || agentAttributes.facebook || agentAttributes.instagram) &&
                        <View style={styles.infoSection}>
                            <H3 style={styles.sectionHeader}>{this.__('social')}</H3>

                            {agentAttributes.linkedin &&
                                <TouchableOpacity style={styles.contactAction} onPress={() => this.openLink(`https://www.linkedin.com/in/${agentAttributes.linkedin}`)} activeOpacity={0.5}>
                                    <P style={styles.contactActionCopy}>@{agentAttributes.linkedin}</P>
                                    <Image style={styles.linkedin} source={Images.iconLinkedIn} />
                                </TouchableOpacity>
                            }
                            {agentAttributes.twitter &&
                                <TouchableOpacity style={styles.contactAction} onPress={() => this.openLink(`https://twitter.com/${agentAttributes.twitter}`)} activeOpacity={0.5}>
                                    <P style={styles.contactActionCopy}>@{agentAttributes.twitter}</P>
                                    <Image style={styles.twitter} source={Images.iconTwitter} />
                                </TouchableOpacity>
                            }

                            {agentAttributes.facebook &&
                                <TouchableOpacity style={styles.contactAction} onPress={() => this.openLink(`https://www.facebook.com/${agentAttributes.facebook}`)} activeOpacity={0.5}>
                                    <P style={styles.contactActionCopy}>@{agentAttributes.facebook}</P>
                                    <Image style={styles.facebook} source={Images.iconFacebook} />
                                </TouchableOpacity>
                            }

                            {agentAttributes.instagram &&
                                <TouchableOpacity style={styles.contactAction} onPress={() => this.openLink(`https://www.instagram.com/${agentAttributes.instagram}`)} activeOpacity={0.5}>
                                    <P style={styles.contactActionCopy}>@{agentAttributes.instagram}</P>
                                    <Image style={styles.instagram} source={Images.iconInstagram} />
                                </TouchableOpacity>
                            }
                        </View>
                    }

                    {agentAttributes.services &&
                        <View style={[styles.infoSection, S.mb16]}>
                            <H3 style={styles.sectionHeader}>{this.__('designations')}</H3>
                            {agentAttributes.services.map((service) => {
                                return <Li>{service}</Li>
                            })}
                        </View>
                    }

                    <Button label={`${this.__('call')}`} style={[styles.callButton, S.mb2]} onPress={() => {
                        this.makeRequest(agentAttributes)
                        this.props.feedbackCheck()
                        this.props.feedbackText(
                            this.__("moodTrackerTitle"),
                            this.__("moodTrackerText")
                        )
                        }} />

                    <View>
                        <Link onPress={()=> this.props.openModal('detail-realtor-legal')}>
                            iMOVE Notices & Disclaimers
                        </Link>
                    </View>

                    <AppModalFullScreen modalKey={"detail-realtor-legal"} type="gray">
                        <View style={ [S.flex1, S.pt16] }>
                            <View style={ { height: '100%' } }>
                                <HtmlView source={ { html: `<style> html { font-family: 'Nunito Sans'; color: white; padding-top: 16 }</style>${this.__('services_legal_text')}` } } ></HtmlView>
                            </View>
                        </View>
                    </AppModalFullScreen>
                </ScrollView>
            </ScreenWrapper>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        agent: state.housing.currentAgent,
        screenLanguage: getLanguageDataSelector(state, 'AgentDetailScreen'),
        getAgentLead: state.housing.currentAgentRequest
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      requestRealtor: (supplier_id) => {
        dispatch(asyncRequestRealtorLeadSubmission(supplier_id))
      },
      gotoScreen: (screen) => {
          dispatch(navigate({ routeName: screen }))
      },
      getLead: (supplier_id) => {
          dispatch(asyncGetLead(supplier_id))
      },
      feedbackCheck: () => {
          dispatch(checkForFeedback('moodTrackerRealEstate'))
      },
      feedbackText: (title, text) => {
          dispatch(setFeedbackLocationText(title, text))
      },
      openModal: (identifier) => {
        dispatch(fromModal.openModalById(identifier))
    },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AgentDetailScreen)
