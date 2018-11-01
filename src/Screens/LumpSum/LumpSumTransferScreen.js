import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, ScrollView, TouchableOpacity } from 'react-native'
import { asyncFetchRelocationData } from '../../Redux/Modules/Relocation'
import { asyncVerifyRoutingNumber, asyncSubmitTransfer } from '../../Redux/Modules/LumpSum'
import { Button, H1, H2, ScreenWrapper, FloatingLabelTextField } from '../../Components'
import { Images, Layout } from '../../Theme'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { formatCurrencyFromString, convertHexToRgbaString } from '../../Utils/ReactHelpers'
import styles from './Styles/LumpSumTransferScreenStyles'
import { ScreenHOC } from '../Screen';

class LumpSumTransferScreen extends Component {

    state = {
        routingNumber: '',
        routingError: false,
        accountNumber: '',
        accountError: false,
        buttonDisabled: true
    }

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    submitTransfer = () => {
        if (!this.state.buttonDisabled) {
            this.props.submitTransfer(
                this.state.routingNumber,
                this.state.accountNumber
            )
        }
    }
    
    validateForm = () => {
        const enabled = this.state.routingNumber.length == 9 &&
            /^[0-9]*$/.test(this.state.routingNumber) &&
            this.state.accountNumber.length > 2

        this.setState({
            buttonDisabled: !enabled
        })
    }

    checkRoutingNumber = (number) => {
        this.setState({routingNumber: number}, () => {
            this.validateForm()
        })
        this.props.verifyRoutingNumber(number)
    }

    render = () => {
        const relocationData = this.props.relocationData
        const transferee = relocationData.transfereeData.data
        const company = relocationData.companyData.data
        
        const bgColor1Style = (company.brandColor1 !== null) 
            ? { backgroundColor: company.brandColor1 }
            : { }

        return (
            <ScreenWrapper backgroundImage={Images.texture02}>
                <ScrollView contentContainerStyle={[Layout.fullHeight, styles.scrollWrapper]}>
                    <View style={[Layout.innerContainerNarrowed, styles.introWrapper]}>
                        <View style={styles.lumpSum}>
                            <View style={styles.summaryTopWrapper}>
                                <H4 style={styles.header}>{this.__('title')}</H4>
                                <H1 style={styles.amount}>
                                    {formatCurrencyFromString(relocationData.lumpSumAmount)}
                                </H1>
                                <H2 style={styles.copy}>
                                    {this.__('subtitle')}
                                </H2>
                            </View>

                            <View style={styles.form}>
                                <FloatingLabelTextField 
                                    placeholder={this.__('routingnumberplaceholder')}
                                    hasError={this.state.routingError}
                                    onChangeText={(value) => {
                                        this.checkRoutingNumber(value)
                                    }}
                                />
                                {this.props.bankName &&
                                    <H4 style={styles.bankName}>{this.props.bankName}</H4>
                                }
                                <FloatingLabelTextField 
                                    placeholder={this.__('accountnumberplaceholder')}
                                    hasError={this.state.accountError}
                                    onChangeText={(value) => {
                                        this.setState({accountNumber: value}, () => {
                                            this.validateForm()
                                        })
                                    }}
                                />
                            </View>

                            <Image style={styles.checkImage} source={Images.lumpSumCheck} />
                        </View>
                    </View>
                    <View style={Layout.outerContainerAlt}>
                        <Button
                            style={[{ width: '100%'}, bgColor1Style]}
                            disabled={this.state.buttonDisabled}
                            onPress={() => this.submitTransfer()}
                            label={this.__('button')} />
                    </View>
                </ScrollView>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        relocationData: state.relocation.relocationData,
        bankName: state.lumpSum.bankName,
        screenLanguage: getLanguageDataSelector(state, 'LumpSumTransferScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitTransfer: (routingNumber, accountNumber) => {
            dispatch(asyncSubmitTransfer(routingNumber, accountNumber))
        },
        verifyRoutingNumber: (routingNumber) => {
            dispatch(asyncVerifyRoutingNumber(routingNumber))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(LumpSumTransferScreen))
