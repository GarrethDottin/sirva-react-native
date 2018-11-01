import React, { Component } from 'react';
import { connect } from 'react-redux'
import { __ } from '../Utils/ReactHelpers'
import { View,Image} from 'react-native';
import { H2, P, MultiSelectButton, AppModal, Button } from './'
import { submitUserMood } from '../Redux/Modules/Feedback'
import { closeModal, getActiveModalId } from '../Redux/Modules/Modal'
import { getFeedbackText, setHideMoodTracker } from '../Redux/Modules/Feedback'
import { getLanguageDataSelector } from '../Redux/Modules/Localization'

import { styles } from './Styles/MoodTrackerStyles';

import images from '../Theme/Images'

class MoodTracker extends Component {

    constructor(props){
        super(props)
        this.__ = __(this.props.screenLanguage)
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.screenLanguage) {
            this.__ = __(nextProps.screenLanguage)
        }
    }
    submitMood(mood) {
        this.props.submitFeedback(mood)

    }
    
    //@TODO: Add icons to buttons
    render() {
        const doRender = this.props.screenLanguage != null

        const renderer = doRender && (
            <AppModal
                modalStyle={styles.modal}
                // visible={true} 
                visible={this.props.activeModal === "feedback" } 
                onToggle={() => this.props.requestClose()}>
                
                <View style={styles.topWrapper}>
                    <H2 style={styles.alignText}>{this.props.feedback.title}</H2>
                    <P style={styles.alignText}>{this.props.feedback.text}</P>

                    <MultiSelectButton
                        elements={[
                            {
                                label: this.__('labelHappy'),
                                children: (<Image source={images.happyWhiteEmoji} style={{ width: 32, height: 32 }} />),
                                style: { borderLeftWidth: 1, borderColor: "#3D5AD4" },
                                onPress: () => this.submitMood("happy"),
                            },
                            {
                                label: this.__('labelJustOkay'),
                                children: (<Image source={images.neutralWhiteEmoji} style={{ width: 32, height: 32 }}/>),
                                style: {},
                                onPress: () => this.submitMood("neutral"),
                            },
                            {
                                label: this.__('labelUnhappy'), // pass null if it doesnt apply
                                children: (<Image source={images.unhappyWhiteEmoji} style={{ width: 32, height: 32 }} />),
                                style: { borderRightWidth: 1, borderColor: "#3D5AD4" },
                                onPress: () => this.submitMood("sad"),
                            }

                        ]}
                        idSuffix={"moodtracker"}
                    />
                    <Button
                        label={this.__('showButton')}
                        style={{
                            backgroundColor:'transparent',
                            paddingTop: 45,
                            minWidth: '100%'
                        }}
                        onPress={() => {
                            this.props.neverShow()
                            this.props.requestClose()
                        }}></Button>
                </View>
            </AppModal>
        )

        return (
            renderer
        )
    }
}

const mapStateToProps = (state) => ({
    activeModal: getActiveModalId(state),
    feedback: getFeedbackText(state),
    screenLanguage: getLanguageDataSelector(state, 'MoodTracker'),
    neverShow:function(){
        setHideMoodTracker()
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        submitFeedback: (feedbackMood) => {
            dispatch(submitUserMood(feedbackMood));
        },
        requestClose: () => {
            dispatch(closeModal());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MoodTracker)
