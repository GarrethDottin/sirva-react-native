import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Image, Text, ImageBackground, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { P, Button, ScreenWrapper, MultiSelectButton } from '../../Components'
import { submitUserFeedbackAndMood } from '../../Redux/Modules/Feedback'
import { Images } from '../../Theme'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { styles } from './Styles/FeedbackScreenStyles';
import { ScreenHOC } from '../Screen';
import { navigate } from '../../Redux/Modules/Routing';

class FeedbackScreen extends Component {
    inputText = null

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)

        this.state = {
            feedbackText: "",
            mood: "",
        };
    }
    changeMood(mood) {
        this.setState({
            mood
        })
    }
    submitFeedback() {
        if (this.state.feedbackText.length !== 0 && this.state.mood !== "") {
            const feedbackText = this.state.feedbackText;
            const mood = this.state.mood;
            this.setState({ feedbackText: "", mood: "" });
            this.inputText.clear()
            this.props.submitFeedbackAndMood(feedbackText, mood);
            this.props.gotoScreen('ThankYouFeedback');
        }
    }

    render() {
        return (
            <ScreenWrapper backgroundStyles={{ flex: 1, width: "100%", height: "100%" }} backgroundImage={Images.texture03} >
              <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.feedbackArea}>
                        <View style={styles.feedbackDescriptionText}>
                            <P style={{ marginBottom: 15 }}>{this.__('intro')}</P>
                        </View>
                        <View style={styles.feedbackDescriptionText}>
                            <P style={{ marginBottom: 15 }}>{`How's your experience with this app? `}</P>
                            <MultiSelectButton
                                elements={[
                                    {
                                        label: "Unhappy", // pass null if it doesnt apply
                                        children: (
                                            this.state.mood === "sad" ?
                                            <Image source={Images.unhappyYellowEmoji} style={{ width: 32, height: 32 }} /> :
                                            <Image source={Images.unhappyWhiteEmoji} style={{ width: 32, height: 32 }} />
                                        ),
                                        style: { },
                                        selected: this.state.mood === "sad",
                                        onPress: () => this.changeMood("sad"),
                                    },
                                    {
                                        label: "Just okay",
                                        children: (
                                            this.state.mood === "neutral" ?
                                            <Image source={Images.neutralYellowEmoji} style={{ width: 32, height: 32 }}/>:
                                            <Image source={Images.neutralWhiteEmoji} style={{ width: 32, height: 32 }} />
                                        ),
                                        style: {},
                                        selected: this.state.mood === "neutral",
                                        onPress: () => this.changeMood("neutral"),
                                    },
                                    {
                                        label: "Happy",
                                        children: (
                                            this.state.mood === "happy" ?
                                            <Image source={Images.happyYellowEmoji} style={{ width: 32, height: 32 }}/> :
                                            <Image source={Images.happyWhiteEmoji} style={{ width: 32, height: 32 }} />
                                        ),
                                        style: {  },
                                        selected: this.state.mood === "happy",
                                        onPress: () => this.changeMood("happy"),
                                    }
                                ]}
                                idSuffix={"moodtracker"}
                            />
                            <P style={{ marginBottom: 15, marginTop: 30 }}>{`Tell Us More`}</P>
                        </View>

                        <View style={styles.inputArea}>
                            <TextInput ref={child => {
                                this.inputText = child
                            }}
                                multiline={true}
                                maxLength={255}
                                style={styles.inputAreaText}
                                onChangeText={(text) => this.setState({ feedbackText: text })}
                                placeholder={this.__('placeholder')}
                                underlineColorAndroid={"transparent"} />
                        </View>
                        <Button style={styles.button} label={this.__('button')} onPress={() => this.submitFeedback()} />
                    </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </ScreenWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        screenLanguage: getLanguageDataSelector(state, 'FeedbackScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitFeedbackAndMood: (feedbackText, mood) => {
            dispatch(submitUserFeedbackAndMood(feedbackText, mood));
        },
        gotoScreen: (screen) => {
            dispatch(navigate({ routeName: screen }));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenHOC(FeedbackScreen));
