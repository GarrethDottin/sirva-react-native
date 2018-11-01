import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, ScrollView, TouchableOpacity } from 'react-native'
import HTMLView from 'react-native-htmlview'
import dateFormat from 'dateformat'
import { asyncFetchRelocationData } from '../../Redux/Modules/Relocation'
import { asyncVerifyRoutingNumber, asyncSubmitTransfer } from '../../Redux/Modules/LumpSum'
import { openModalById, getActiveModalId } from '../../Redux/Modules/Modal'
import { Button, H1, H2, P, ScreenWrapper, AppModalFullScreen, DataListItem } from '../../Components'
import { Images, Layout } from '../../Theme'
import { formatCurrencyFromString, convertHexToRgbaString } from '../../Utils/ReactHelpers'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import styles from './Styles/LumpSumStatusScreenStyles'
import htmlStyles from './Styles/SharedStyles'
import { ScreenHOC } from '../Screen';

class LumpSumStatusScreen extends Component {

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    openModal = () => {
        this.props.openModal()
    }

    render = () => {
        const relocationData = this.props.relocationData
        const agreementHtml = relocationData.repaymentAgreement
        const transfer = this.props.transferData

        return (
            <ScreenWrapper backgroundImage={Images.texture02}>
                <ScrollView contentContainerStyle={[Layout.fullHeight, styles.scrollWrapper]}>
                    <View style={[Layout.innerContainerNarrowed, styles.introWrapper]}>
                        <View style={styles.lumpSum}>
                            <View style={styles.summaryTopWrapper}>
                                <H2 style={styles.copy}>
                                    {this.__('title')}
                                </H2>
                                <H4 style={styles.header}>{this.__('subtitle')}</H4>
                                <H1 style={styles.amount}>
                                    {formatCurrencyFromString(relocationData.lumpSumAmount)}
                                </H1>

                                <Link onPress={() => this.openModal()} style={styles.agreementLink} textStyle={styles.agreementTextStyle}>
                                    {this.__('repaylink')}
                                </Link>

                                <P>{this.__('note')}</P>
                            </View>
                            <View style={styles.datalist}>
                                <DataListItem label={this.__('transactionnumber')} value={transfer.jsonapi_identifier} />
                                <DataListItem label={this.__('requesteddate')} value={Date.parse(transfer.requestedAt) ? dateFormat(transfer.requestedAt, 'm/d/yy', true) : 'N/A'} />
                                <DataListItem label={this.__('amount')} value={formatCurrencyFromString(transfer.lumpSumAmount)} />
                                <DataListItem label={this.__('routingnumber')} value={transfer.routingNumber} />
                                <DataListItem label={this.__('bankaccount')} value={this.__('endingin', transfer.accountNumberLast4)} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <AppModalFullScreen modalKey={'lumpSumAgreement'}>
                    <HTMLView
                        style={styles.contractWrapper}
                        value={agreementHtml}
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
        screenLanguage: getLanguageDataSelector(state, 'LumpSumStatusScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: () => {
            dispatch(openModalById('lumpSumAgreement'))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(LumpSumStatusScreen))

