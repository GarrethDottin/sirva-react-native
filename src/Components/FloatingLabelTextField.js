import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated, TextInput, Text, View, Image, NativeModules, findNodeHandle, TouchableOpacity, ViewPropTypes } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Colors, Images } from '../Theme'
import styles from './Styles/FloatingLabelTextFieldStyles'

const UIManager = NativeModules.UIManager

class FloatingLabel extends Component {

    static propTypes = {
        floatingLabelEnabled: PropTypes.bool,
        floatingLabelAniDuration: PropTypes.number,
        opacityAniDur: PropTypes.number,
    }

    static defaultProps = {
        floatingLabelEnabled: true,
        floatingLabelAniDuration: 200,
        opacityAniDur: 0,
    }

    placeholderHeight = 0

    state = {
        progress: new Animated.Value(1),
        opacity: new Animated.Value(0),
        text: '',
    }

    componentWillMount() {
        this.updateText(this.props.text)
    }

    componentWillReceiveProps(nextProps) {
        this.updateText(nextProps.text)
    }

    updateText(text) {
        this.setState({ text })
    }

    _onLabelLayout = ({ nativeEvent: { layout } }) => {
        const height = layout.height
        if (height && !this.placeholderHeight) {
            this.placeholderHeight = height
        }
    }

    measure(cb) {
        return this.refs.label && UIManager.measure(findNodeHandle(this.refs.label), cb)
    }

    aniFloatLabel() {
        if (!this.props.floatingLabelEnabled) {
            return []
        }
        return [
            Animated.sequence([
                Animated.timing(this.state.opacity, {
                    toValue: 1,
                    duration: this.props.opacityAniDur,
                  }),
                Animated.timing(this.state.progress, {
                    toValue: 0,
                    duration: this.props.floatingLabelAniDuration,
                }),
        ])]
    }

    aniSinkLabel() {
        if (!this.props.floatingLabelEnabled) {
            return []
        }
        return [
            Animated.sequence([
                Animated.timing(this.state.progress, {
                    toValue: 1,
                    duration: this.props.floatingLabelAniDuration,
                }),
                Animated.timing(this.state.opacity, {
                  toValue: 0,
                  duration: this.props.opacityAniDur,
                }),
        ])]
    }

    render() {
        const labelY = this.state.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.placeholderHeight],
        })

        return (
            <Animated.Text
                ref="label"
                pointerEvents="none"
                style={[styles.label, { top: labelY, opacity: this.state.opacity }, this.props.style]}
                onLayout={this._onLabelLayout}
            >
                {this.state.text}
            </Animated.Text>
        )
    }
}

export default class FloatingLabelTextfield extends Component {

    static propTypes = {
        ...TextInput.propTypes,
        ...FloatingLabel.propTypes, // [Floating Label Props](#floatingLabelProps)
        text: PropTypes.string, // Alias to `value`
        secureTextEntry: PropTypes.bool,
        autoCapitalize: PropTypes.string,
        hasError: PropTypes.bool,
        hasBlueBackground: PropTypes.bool,
        inputStyle: PropTypes.any,
        autoCorrect: PropTypes.bool,
        textContentType: PropTypes.string,
        hasMask: PropTypes.bool,
        maskType: PropTypes.string,
        maskOptions: PropTypes.object,
        maxLength: PropTypes.number
    }

    static defaultProps = {
        ...FloatingLabel.defaultProps,
        secureTextEntry: false,
        autoCapitalize: 'none',
        hasError: false,
        hasBlueBackground: false,
        autoCorrect: false,
        textContentType: 'none',
        hasMask: false,
        maskType: 'custom',
        maxLength: -1
    }

    anim = null
    originPlaceholder = ''
    initialTextVisible = true
    floatingLabelEnabled = false
    state = {
        inputMarginTop: 0,
        textVisible: true,
        text:'',
    }

    focus() {
        if (this.refs.input) this.refs.input.focus()
    }

    blur() {
        if (this.refs.input) this.refs.input.blur()
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.text != nextProps.value) {
            this.setState({
                text: nextProps.value
            }, this.aniFloatLabel);
        }
    }

    componentDidMount() {
        this.floatingLabelEnabled = this.props.floatingLabelEnabled && this.refs.floatingLabel && true

        this.originPlaceholder = this.props.placeholder
        this.initialTextVisible = !this.props.secureTextEntry

        this.setState({
            textVisible: !this.props.secureTextEntry,
            text: this.props.value || ''
        }, this.aniFloatLabel)
    }

    onChange = (text) => {
        const v = text.trim()

        if (v.length !== 0) this.aniFloatLabel()
        else this.aniStopHighlight()

        this.setState({ text: v })
        if (this.props.onChangeText) this.props.onChangeText(v)
    }

    onFocus = (e) => {
        this.aniStartHighlight()
    }

    onBlur = (e) => {
        this.aniStopHighlight()
    }

    startAnimations(animations, cb) {
        if (this.anim) this.anim.stop()
        this.anim = Animated.parallel(animations).start(cb)
    }

    doMeasurement() {
        if (this.floatingLabelEnabled && this.props.placeholder.length !== 0) {
            this.refs.floatingLabel.measure((left, top, width, height) => {
                this.setState({ inputMarginTop: height })
            })
        }
    }

    aniFloatLabel() {
        if (this.floatingLabelEnabled && this.state.text && this.state.text.length !== 0) {
            const animations = this.refs.floatingLabel.aniFloatLabel()
            if (animations.length) {
                this.startAnimations(animations)
            }
        }
    }

    aniStartHighlight() {
        if (this.floatingLabelEnabled) {
            this.setPlaceholder('') // hide fixed placeholder, if floating
            this.refs.floatingLabel.updateText(this.originPlaceholder) // and show floating label

            const animations = []
            animations.push(...this.refs.floatingLabel.aniFloatLabel())
            this.startAnimations(animations)
        }
    }

    aniStopHighlight() {
        if (this.floatingLabelEnabled) {
            const animations = []

            if (this.state.text && this.state.text.length === 0) {
                animations.push(...this.refs.floatingLabel.aniSinkLabel())
            }

            if (animations.length) {
                this.startAnimations(animations, () => {
                    this.setPlaceholder(this.originPlaceholder)
                    if (this.state.text.length === 0) {
                        this.refs.floatingLabel.updateText('')
                    }
                })
            }
        }
    }

    setPlaceholder(placeholder) {
        const input = this.props.hasMask ? this.maskInput : this.refs.input
        if (input) input.setNativeProps({ placeholder })
    }

    toggleTextVisibility() {
        this.setState({
            textVisible: !this.state.textVisible
        })
    }

    placeholderColor() {
        if (this.props.hasError) {
            return Colors.orange
        } else if (this.props.placeholderColor) {
            return this.props.placeholderColor
        } else {
            return Colors.lightGray
        }
    }

    render = () => {
        let icon = null
        if (this.props.hasError && this.state.text.length && this.initialTextVisible) {
            const xIcon = this.props.hasBlueBackground ? images.iconXOrange2 : images.iconXOrange
            icon = (
                <TouchableOpacity onPress={() => this.onChange('')}>
                    <Image style={styles.clearButton} source={xIcon} />
                </TouchableOpacity>
            )
        } else if (!this.initialTextVisible) {
            icon = (
                <TouchableOpacity style={styles.showHideWrapper} onPress={() => this.toggleTextVisibility()}>
                    <Image style={styles.showHideButton} source={this.state.textVisible ? Images.iconShow : Images.iconHide } />
                </TouchableOpacity>
            )
        } else if (this.props.icon) {
            icon = (
                <Image style={styles.icon} source={this.props.icon} />
            )
        }

        return (
            <View ref="container" style={[styles.container, this.props.style, { flexDirection: 'row' }]} onLayout={() => this.doMeasurement()}>
                <FloatingLabel ref="floatingLabel"
                    style={ [
                                (this.props.placeholderColor ? { color: this.props.placeholderColor } : {} ),
                                (this.props.hasError ?[styles.labelError, {
                                        color: this.props.hasBlueBackground ? Colors.orange2 : Colors.orange
                                    }] : {})
                            ]
                        }
                    text={this.props.placeholder}
                />
                    {this.props.hasMask ?
                        <TextInputMask
                            refInput={(ref) => this.maskInput = ref}
                            ref="input"
                            style={[
                                styles.input,
                                { marginTop: this.state.inputMarginTop },
                                (this.props.hasError ? {borderBottomColor: this.props.hasBlueBackground ?
                                    Colors.orange2 : Colors.orange } : {}),
                                this.props.inputStyle,
                            ]}
                            type={this.props.maskType}
                            options={this.props.maskOptions}
                            placeholder={this.props.placeholder}
                            placeholderTextColor={this.placeholderColor()}
                            onChangeText={(text) => this.onChange(text)}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            autoCapitalize={this.props.autoCapitalize}
                            value={this.state.text}
                            autoCorrect={this.props.autoCorrect}
                            maxLength={this.props.maxLength}
                        />
                :
                    <TextInput  // the input
                        ref="input"
                        style={[
                            styles.input,
                            { marginTop: this.state.inputMarginTop },
                            (this.props.hasError ? {borderBottomColor: this.props.hasBlueBackground ?
                                Colors.orange2 : Colors.orange } : {}),
                            this.props.inputStyle,
                        ]}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={this.placeholderColor()}
                        onChangeText={this.onChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        secureTextEntry={!this.state.textVisible}
                        autoCapitalize={this.props.autoCapitalize}
                        value={this.state.text}
                        autoCorrect={this.props.autoCorrect}
                        maxLength={this.props.maxLength}
                        textContentType={this.props.textContentType}
                    />
                }
                {icon}
            </View>
        )
    }
}
