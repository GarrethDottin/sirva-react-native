import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Dimensions, Text, Animated, TouchableOpacity } from 'react-native'
import { FloatingLabelTextField, AppModal, H4, Link } from './'
import { Images } from '../Theme'
import { __ } from '../Utils/ReactHelpers'
import zxcvbn from 'zxcvbn'
import _ from 'lodash'
import styles from './Styles/PasswordStrengthCheckerStyles'

const { width: wWidth } = Dimensions.get('window')

const widthByPercent = (percentage, containerWidth = wWidth) => {
    const value = (percentage * containerWidth) / 100
    return Math.round(value)
}

const regex = {
    digitsPattern: /\d/,
    lettersPattern: /[a-zA-Z]/,
    lowerCasePattern: /[a-z]/,
    upperCasePattern: /[A-Z]/,
    wordsPattern: /\w/,
    symbolsPattern: /\W/
}

export default class PasswordStrengthChecker extends Component {
    static defaultProps = {
        minLevel: 2,
        minLength: 0,
        ruleNames: 'lowerCase|upperCase|digits|symbols',
        strengthLevels: [
            {
                label: 'Weak',
                labelColor: '#fff',
                widthPercent: 33,
                innerBarColor: '#fe6c6c'
            },
            {
                label: 'Weak',
                labelColor: '#fff',
                widthPercent: 33,
                innerBarColor: '#fe6c6c'
            },
            {
                label: 'Fair',
                labelColor: '#fff',
                widthPercent: 67,
                innerBarColor: '#feb466'
            },
            {
                label: 'Fair',
                labelColor: '#fff',
                widthPercent: 67,
                innerBarColor: '#feb466'
            },
            {
                label: 'Strong',
                labelColor: '#fff',
                widthPercent: 100,
                innerBarColor: '#6cfeb5'
            }
        ],
        tooShort: {
            enabled: false,
            labelColor: '#fff',
            label: 'Too short',
            widthPercent: 33,
            innerBarColor: '#fe6c6c'
        },
        barWidthPercent: 100,
        showBarOnEmpty: true,
        hasError: false,
        languageData: {
            label: "Strength",
            placeholder: "Enter password",
            hintTitle: "YOUR PASSWORD MUST INCLUDE:",
            hint1: "8 characters or more",
            hint2: "1 uppercase letter",
            hint3: "1 lowercase letter",
            hint4: "1 number or special character",
            gotit: "Got it!"
        }
    }
    
    static propTypes = {
        onChangeText: PropTypes.func.isRequired,
        minLength: PropTypes.number,
        ruleNames: PropTypes.string,
        strengthLevels: PropTypes.array,
        tooShort: PropTypes.object,
        minLevel: PropTypes.number,
        strengthDescriptionStyle: Text.propTypes.style,
        showBarOnEmpty: PropTypes.bool,
        hasError: PropTypes.bool,
        languageData: PropTypes.object
    }
  
    animatedInnerBarWidth = new Animated.Value(0)
    animatedBarWidth = new Animated.Value(0)
    state = {
        level: -1,
        isTooShort: false,
        modalVisible: false,
        password: ''
    }
  
    constructor(props) {
        super(props);
        this.__ = __(this.props.languageData)
    }
    componentDidMount() {
        const { showBarOnEmpty } = this.props
        if (showBarOnEmpty) {
            this.showFullBar()
        }
    }
    
    showFullBar(isShow = true) {
        const { barWidthPercent } = this.props
        const barWidth = isShow ? widthByPercent(barWidthPercent) : 0
        Animated.timing(this.animatedBarWidth, {
            toValue: barWidth,
            duration: 20
        }).start()
    }
  
    isTooShort(password) {
        const { minLength } = this.props
        if (!minLength) {
            return true
        }
        return password.length < minLength
    }
    
    isMatchingRules(password) {
        const { ruleNames } = this.props
        if (!ruleNames) {
            return true
        }
        
        const rules = _.chain(ruleNames)
            .split('|')
            .filter(rule => !!rule)
            .map(rule => rule.trim())
            .value()
        
        for (const rule of rules) {
            if (!this.isMatchingRule(password, rule)) {
                return false
            }
        }
        return true
    }
  
    isMatchingRule(password, rule) {
        switch (rule) {
        case 'symbols':
            return regex.symbolsPattern.test(password)
        case 'words':
            return regex.wordsPattern.test(password)
        case 'digits':
            return regex.digitsPattern.test(password)
        case 'letters':
            return regex.lettersPattern.test(password)
        case 'lowerCase':
            return regex.lowerCasePattern.test(password)
        case 'upperCase':
            return regex.upperCasePattern.test(password)
        default:
            return true
        }
    }
  
    calculateScore(text) {
        if (!text) {
            this.setState({
                isTooShort: false
            })
            return -1
        }
        
        if (this.isTooShort(text)) {
            this.setState({
                isTooShort: true
            })
            return 0
        }
        
        this.setState({
            isTooShort: false
        })
        
        if (!this.isMatchingRules(text)) {
            return 0
        }
        
        return zxcvbn(text).score
    }
  
    getPasswordStrengthLevel(password) {
        return this.calculateScore(password)
    }
    
    onChangeText(password) {
        const level = this.getPasswordStrengthLevel(password)
        this.setState({
            level: level,
            password: password
        })
        const isValid = this.isMatchingRules(password) && level >= this.props.minLevel
        this.props.onChangeText(password, isValid)
    }

    toggleModal() {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }
  
    renderPasswordInput() {
        return (
            <View>
                <FloatingLabelTextField
                    placeholder={this.__('placeholder')}
                    secureTextEntry={true}
                    hasError={this.props.hasError}
                    value={this.state.password}
                    onChangeText={text => this.onChangeText(text)} />
            </View>
        )
    }
  
    renderPasswordStrength() {
        const {
            barWidthPercent,
            tooShort,
            strengthLevels,
            showBarOnEmpty
        } = this.props
        
        const barWidth = widthByPercent(barWidthPercent)
        
        const { level } = this.state
        
        let strengthLevelBarStyle = {}, strengthLevelLabelStyle = { }, 
            strengthDescriptionIconStyle = { }, innerBarWidth = 0,
            strengthLevelLabel = this.__('label')

        if (level !== -1) {        
            if (!showBarOnEmpty) {
                this.showFullBar()
            }
            
            innerBarWidth = widthByPercent(strengthLevels[level].widthPercent, barWidth)

            strengthLevelBarStyle = {
                backgroundColor: strengthLevels[level].innerBarColor
            }
            
            strengthLevelLabelStyle = {
                color: strengthLevels[level].labelColor                
            }

            strengthDescriptionIconStyle = {
                backgroundColor: strengthLevels[level].labelColor                
            }

            strengthLevelLabel = strengthLevels[level].label
            
            if (tooShort.enabled && this.state.isTooShort) {
                innerBarWidth = widthByPercent(tooShort.widthPercent, barWidth) || widthByPercent(strengthLevels[level].widthPercent, barWidth)
                strengthLevelBarStyle = {
                    backgroundColor: tooShort.innerBarColor || strengthLevels[level].innerBarColor
                }
                strengthLevelLabelStyle = {
                    color: tooShort.labelColor || strengthLevels[level].labelColor
                }
                strengthDescriptionIconStyle = {
                    backgroundColor: tooShort.labelColor || strengthLevels[level].labelColor
                }
                strengthLevelLabel = tooShort.label || strengthLevels[level].label
            }
        } else {
            if (!showBarOnEmpty) {
                this.showFullBar(false)
            }
        }
        
        Animated.timing(this.animatedInnerBarWidth, {
            toValue: innerBarWidth,
            duration: 800
        }).start()
        
        return (
            <View style={[styles.passwordStrengthWrapper]}>
                <Animated.View style={[styles.passwordStrengthBar, { width: this.animatedBarWidth }]}>
                    <Animated.View style={[styles.innerPasswordStrengthBar, { ...strengthLevelBarStyle, width: this.animatedInnerBarWidth}]} />
                </Animated.View>
                <TouchableOpacity onPress={() => this.toggleModal()}>
                    <View style={styles.strengthDescriptionWrapper}>
                            <View style={[styles.strengthDescriptionIcon, { ...strengthDescriptionIconStyle}]}>
                                <Image style={styles.strengthDescriptionIconImage} source={Images.iconI} />
                            </View>
                            <Text style={[styles.strengthDescription, { ...strengthLevelLabelStyle }]}>{strengthLevelLabel}</Text>
                    </View>
                </TouchableOpacity>
            </View>            
        )
    }
    
    render() {
        return (
            <View style={styles.wrapper}>
                {this.renderPasswordInput()}
                {this.renderPasswordStrength()}
                <AppModal visible={this.state.modalVisible} onToggle={() => this.toggleModal()}>
       
                        <H4 style={styles.modalTitle}>{this.__('hintTitle')}</H4>
                        <View>
                            <Li>{this.__('hint1')}</Li>
                            <Li>{this.__('hint2')}</Li>
                            <Li>{this.__('hint3')}</Li>
                            <Li>{this.__('hint4')}</Li>
                        </View>
                        <Link style={styles.modalLink} onPress={() => this.toggleModal()}>{this.__('gotit')}</Link> 
                  
                </AppModal>
            </View>
        )
    }
}