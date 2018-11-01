import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, ScrollView, TouchableOpacity } from 'react-native'
import HTMLView from 'react-native-htmlview'
import { asyncFetchRelocationData } from '../../Redux/Modules/Relocation'
import { asyncGetTransfer } from '../../Redux/Modules/LumpSum'
import { openModalById, getActiveModalId } from '../../Redux/Modules/Modal'
import { Button, H1, ScreenWrapper, Link, AppModalFullScreen } from '../../Components'
import { Images, Layout } from '../../Theme'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { formatCurrencyFromString, convertHexToRgbaString, formatAddressFromObject } from '../../Utils/ReactHelpers'
import styles from './Styles/LumpSumLandingScreenStyles'
import htmlStyles from './Styles/SharedStyles'
import { navigate } from '../../Redux/Modules/Routing';
import { ScreenHOC } from '../Screen';

class LumpSumLandingScreen extends Component {

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount = () => {
        if (this.props.relocationData === null){
            this.props.refreshRelocationData()
        }

        if (this.props.transferData === null){
            this.props.refreshTransferData()
        }

    }

    gotoNextScreen = (hasTransfer) => {
        const screen = hasTransfer ? 'LumpSumStatus' : 'LumpSumTransfer'
        this.props.gotoScreen(screen)
    }

    openModal = () => {
        this.props.openModal()
    }

    openRepaymentModal = () => {
        this.props.openRepaymentModal()
    }

    render = () => {
        const relocationData = this.props.relocationData
        const company = relocationData.companyData.data
        const companyAddress = relocationData.companyAddressData.data

        const companyImage = (company.logo !== null)
            ? <Image style={styles.summaryEmployerImage} source={{ uri: company.logo }} />
            : ''

        const bgColor1Style = (company.brandColor1 !== null)
            ? { backgroundColor: company.brandColor1 }
            : { }

        const bgColor2Style = (company.brandColor2 !== null)
            ? { backgroundColor: company.brandColor2 }
            : { }

        const introTextColorStyle = (company.welcomeTextColor !== null)
            ? { color: company.welcomeTextColor }
            : { }

        const lumpSumHtml = relocationData.lumpSumPolicy

        const repaymentAgreementHtml = relocationData.repaymentAgreement

        const hasTransfer = this.props.transferData ? this.props.transferData.hasOwnProperty('routingNumber') : false

        return (
            <ScreenWrapper backgroundImage={Images.texture02}>
                <ScrollView contentContainerStyle={[Layout.fullHeight, styles.scrollWrapper, bgColor1Style]}>
                    <View style={[styles.introWrapper, bgColor1Style]}>
                        <View style={styles.lumpSum}>
                            <View style={styles.summaryTopWrapper}>
                                <H4 style={styles.header}>{this.__('title')}</H4>
                                {companyImage}
                            </View>

                            <View style={styles.summaryBottomWrapper}>
                                <H1 style={styles.summaryAmount}>{formatCurrencyFromString(relocationData.lumpSumAmount)}</H1>
                                { hasTransfer || !!!relocationData.isWithdrawable ?
                                (<P style={styles.summaryCopy}>
                                    {this.__('summarycompletecopy')}
                                </P>) :
                                (<P style={styles.summaryCopy}>
                                    {this.__('summarytransfercopy')}
                                </P>)
                                }
                            </View>

                            {relocationData.isWithdrawable &&
                            <TouchableOpacity onPress={() => this.gotoNextScreen(hasTransfer)}
                                style={styles.transferButton} activeOpacity={0.5}>
                                {hasTransfer ?
                                    (<P style={styles.transferButtonCopy}>{this.__('buttondetails')}</P>) :
                                    (<P style={styles.transferButtonCopy}>{this.__('buttontransfer')}</P>)
                                }
                                <Image style={styles.transferButtonArrow} source={Images.iconArrowheadBlue} />
                            </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <View style={styles.agreementTrigger}>
                        <Link onPress={() => this.openRepaymentModal()} style={styles.agreementLink} textStyle={styles.agreementTextStyle}>
                            {this.__('repaylink')}
                        </Link>
                    </View>
                    <View style={styles.agreementTrigger}>
                        <Link onPress={() => this.openModal()} style={styles.agreementLink} textStyle={styles.agreementTextStyle}>
                            {this.__('lumpsumlink')}
                        </Link>
                    </View>
                </ScrollView>
                <AppModalFullScreen modalKey={'lumpSumAgreement'}>
                    <HTMLView
                        value={lumpSumHtml}
                        stylesheet={htmlStyles}
                    />
                </AppModalFullScreen>
                <AppModalFullScreen modalKey={'repaymentAgreement'}>
                    <HTMLView
                        value={repaymentAgreementHtml}
                        stylesheet={htmlStyles}
                    />
                </AppModalFullScreen>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        relocationData: state.relocation.relocationData,
        transferData: state.lumpSum.transferData,
        activeModal: getActiveModalId(state),
        screenLanguage: getLanguageDataSelector(state, 'LumpSumLandingScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen) => {
            dispatch(navigate({ routeName: screen }));
        },
        refreshRelocationData: () => {
            dispatch(asyncFetchRelocationData())
        },
        refreshTransferData: () => {
            dispatch(asyncGetTransfer())
        },
        openModal: () => {
            dispatch(openModalById('lumpSumAgreement'))
        },
        openRepaymentModal: () => {
            dispatch(openModalById('repaymentAgreement'))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(LumpSumLandingScreen))
