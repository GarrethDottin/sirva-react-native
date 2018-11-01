import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, TextInput, ScrollView, ImageBackground } from 'react-native'
import HTMLView from 'react-native-htmlview'
import dateFormat from 'dateformat'
import { getRelocationDataSelector, asyncFetchRelocationData, asyncAcceptRepaymentAgreement } from '../../Redux/Modules/Relocation'
import { Button, H1, P, RemoteImage } from '../../Components'
import { Images, Layout, Colors } from '../../Theme'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { formatCurrencyFromString, convertHexToRgbaString, formatAddressFromObject } from '../../Utils/ReactHelpers'
import styles, { htmlStyles } from './Styles/RepaymentAgreementScreenStyles'
import { ScreenHOC } from '../Screen';
import S from '../../StyleUtils';
class RepaymentAgreementScreen extends Component {

    state = {
        buttonDisabled: true
    }

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount = () => {
        if (this.props.agreementData === null) {
            this.props.refreshData()
        } else if (this.props.agreementData.repaymentAggreement === null) {
            this.setState({ buttonDisabled: false})
        }
    }
    
    acceptRepaymentAgreement = () => {
        if (!this.state.buttonDisabled) {
            this.props.acceptRepaymentAgreement()
        }
    }

    isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    }

    render() {
        const agreementData = this.props.agreementData
        const transferee =   agreementData.transfereeData ? agreementData.transfereeData.data : null
        const company = agreementData.companyData ? agreementData.companyData.data : null
        const companyAddress = agreementData.companyAddressData ? agreementData.companyAddressData.data : null
        const companyAddressRenderer = companyAddress ? 
            <P style={styles.summaryEmployerAddress}>
                {formatAddressFromObject(companyAddress)}
            </P> : null

        const companyImage = (company.logo !== null) 
            ? <View style={ S.mv1 }><RemoteImage height={32} style={ { maxWidth: 140 } } source={{ uri: company.logo }} /></View>
            : <P style={styles.summaryEmployerName}>{company.name}</P>

        const bgColor1Style = (company.brandColor1 !== null) 
            ? { backgroundColor: company.brandColor1 }
            : { backgroundColor: Colors.lightBlue }

        const bgColor2Style = (company.brandColor2 !== null) 
            ? { backgroundColor: company.brandColor2 }
            : { backgroundColor: Colors.medBlue }

        const introTextColorStyle = (company.welcomeTextColor !== null)
            ? { color: company.welcomeTextColor }
            : { color: Colors.white }
                        
        const agreementHtml = agreementData.repaymentAggreement ? agreementData.repaymentAggreement : ''

        return (            
            <ImageBackground style={Layout.screenWrapper} source={Images.texture01}>
                <ScrollView 
                    style={styles.scrollWrapper}
                    contentContainerStyle={styles.scrollInner}
                    onScroll={({nativeEvent}) => {
                        if (this.isCloseToBottom(nativeEvent)) {
                            this.setState({ buttonDisabled: false})
                        }
                    }}
                    scrollEventThrottle={400}>

                    <View style={[styles.introWrapper, bgColor1Style]}>
                        <H1 style={[styles.introCopy, introTextColorStyle]}>
                            {this.__('introcopy')}{"\n"}
                            {transferee.firstName} {transferee.lastName}.
                        </H1>
                        <H4 style={[styles.jobTitle, introTextColorStyle]}>{transferee.jobTitle.toUpperCase()}</H4>

                        <View style={styles.summaryTopWrapper}>
                            <View style={styles.summaryEmployerWrapper}>
                                <H4 style={styles.summaryEmployerSubtitle}>{this.__('employerlabel')}</H4>
                                {companyImage}
                                
                                <P style={styles.summaryEmployerAddress}>
                                    {formatAddressFromObject(companyAddress)}
                                </P>
                            </View>
                            <View style={styles.summaryDateWrapper}>
                                <H4 style={styles.summaryDateSubtitle}>
                                    {this.__('datelabel')}{"\n"}
                                    {dateFormat(agreementData.startDate, 'mm/dd/yyyy')}
                                </H4>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.colorBar, bgColor2Style]} />
                    <View style={styles.summaryBottomWrapper}>
                        <H1 style={styles.summaryAmount}>{formatCurrencyFromString(agreementData.lumpSumAmount)}</H1>
                        <P style={styles.summaryCopy}>
                            {this.__('summary')}
                        </P>
                    </View>
                    <HTMLView
                        style={styles.contractWrapper}
                        value={agreementHtml}
                        stylesheet={htmlStyles}
                    />
                </ScrollView>
                <View style={styles.buttonWrapper}>
                    <P style={styles.buttonCopy}>
                        {this.__('disclaimer')}    
                    </P>
                    <Button
                        label={this.__('button')}
                        style={styles.button}
                        disabled={this.state.buttonDisabled}
                        onPress={this.acceptRepaymentAgreement}
                    />
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        agreementData: getRelocationDataSelector(state),
        screenLanguage: getLanguageDataSelector(state, 'RepaymentAgreementScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        acceptRepaymentAgreement: () => {            
            dispatch(asyncAcceptRepaymentAgreement())
        },
        refreshData: () => {
            dispatch(asyncFetchRelocationData())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(RepaymentAgreementScreen))
