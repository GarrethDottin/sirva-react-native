import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ScrollView, View, Text, Image } from 'react-native'
import dateFormat from 'dateformat'
import { openModalById } from '../../Redux/Modules/Modal'
import { getAddress, getStartDateTime, getWorkers, getHours, setWorkersAndHours } from '../../Redux/Modules/Labor'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { ScreenWrapper, BasicCard, H2, H4, P, Dropdown, ActionCard, AppModalFullScreen, TopNavHeader, Faqs } from '../../Components'
import { Images, Colors,Variables} from '../../Theme'
import { formatAddressFromObject } from '../../Utils/ReactHelpers'
import styles from './Styles/LaborWorkersScreenStyles'
import { navigate } from '../../Redux/Modules/Routing';
import { ScreenHOC } from '../Screen';
import S from '../../StyleUtils';
import { showBell, hideBell } from '../../Redux/Modules/Concierge'

const OrderInfoCard = ({label, text, icon, style = null})=> {
    return (
        <BasicCard style={ [S.pv4, style] }>
            <Text style={[S.lightGray, S.mb2, S.textXs, styles.cardLabelCopy] }>{label}</Text>
            <View style={ [S.flexRow, S.itemsEnd] }>
                <Text style={ [S.flex1, S.darkGray, S.textBase, S.fontSemiBold] }>
                    {text}
                </Text>
                <Image style={ [{ width: 16, height: 16, resizeMode: 'contain' }] }  source={icon} />
            </View>
        </BasicCard>
    )
}

class LaborWorkersScreen extends Component {

    state = {
        workerValue: 2,
        hoursValue: 2,
        activeModalTab: 0,
    }

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)

        this.workerDropdownData = [
            { value: 2, label: this.__('workersoption', 2)},
            { value: 3, label: this.__('workersoption', 3)},
            { value: 4, label: this.__('workersoption', 4)},
        ]
        this.hoursDropdownData = [
            { value: 2, label: this.__('hoursoption', 2)},
            { value: 3, label: this.__('hoursoption', 3)},
            { value: 4, label: this.__('hoursoption', 4)},
            { value: 5, label: this.__('hoursoption', 5)},
            { value: 6, label: this.__('hoursoption', 6)},
            { value: 7, label: this.__('hoursoption', 7)},
            { value: 8, label: this.__('hoursoption', 8)},
            { value: 9, label: this.__('hoursoption', 9)},
            { value: 10, label: this.__('hoursoption', 10)},
        ]
    }

    componentDidMount = () => {
        //this should be complete already
        if (this.props.address === null || this.props.laborStartDateTime === null) {
            this.props.gotoScreen('LaborLocation')
            return
        }

        if (this.props.workers !== null && this.props.hours !== null) {
            this.setState({
                workerValue: this.props.workers,
                hoursValue: this.props.hours
            })
        }

        this.props.showConciergeBell();
    }

    componentWillUnmount(){
      this.props.hideConciergeBell();
    }

    onChangeWorkers = (value) => {
        this.setState({ workerValue: value })
    }

    onChangeHours = (value) => {
        this.setState({ hoursValue: value })
    }

    onSubmit = () => {
        this.props.setWorkersAndHours(this.state.workerValue, this.state.hoursValue)
        this.props.gotoScreen('LaborReview')
    }

    orderInfoCard({label, text, icon}) {
        return (
            <BasicCard style={ [S.pv4] }>
                <Text style={ [S.lightGray, S.mb2, S.textXs] }>{label}</Text>
                <View style={ [S.flexRow, S.itemsEnd] }>
                    <Text style={ [S.flex1, S.darkGray, S.textBase, S.fontSemiBold] }>
                        {text}
                    </Text>
                    <Image style={ [{ width: 16, height: 16, resizeMode: 'contain' }] }  source={icon} />
                </View>
            </BasicCard>
        )
    }

    render() {
        const faq = [1, 2, 3, 4].map((questionNumber)=> {
            return { question: this.__(`question${questionNumber}`), answer: this.__(`answer${questionNumber}`) }
        })

        return (
            <ScreenWrapper backgroundImage={Images.texture05} watermark={Images.movingWatermark}>
                <ScrollView>
                    <View style={styles.introWrapper}>
                        <H2 style={styles.introTitle}>{this.__('title')}</H2>

                        <View style={styles.dropdownWrapper}>
                            <Dropdown
                                value={this.state.workerValue}
                                data={this.workerDropdownData}
                                fontSize={16}
                                fontFamily={Variables.baseHeaderFont}
                                fontWeight={Variables.weightSemiBold}
                                containerStyle={styles.dropdown}
                                baseColor={Colors.darkGray}
                                textColor={Colors.darkGray}
                                selectedItemColor={Colors.darkGray}
                                itemColor={Colors.darkGray}
                                pickerStyle={{backgroundColor: Colors.white}}
                                onChangeText={(value) => this.onChangeWorkers(value)}
                            />
                            <H4 style={styles.dropdownLabel}>{this.__('for')}</H4>
                            <Dropdown
                                value={this.state.hoursValue}
                                data={this.hoursDropdownData}
                                fontFamily={Variables.baseHeaderFont}
                                fontWeight={Variables.weightSemiBold}
                                fontSize={16}
                                containerStyle={styles.dropdown}
                                baseColor={Colors.darkGray}
                                textColor={Colors.darkGray}
                                selectedItemColor={Colors.darkGray}
                                itemColor={Colors.darkGray}
                                pickerStyle={{backgroundColor: Colors.white}}
                                onChangeText={(value) => this.onChangeHours(value)}
                            />
                        </View>

                        <P style={styles.introCopy}>
                            {this.__('introcopy')}
                        </P>
                        <Link onPress={() => this.props.openModal()} style={styles.calculationLnk} textStyle={styles.calculationLinkText}>
                            {this.__('introlink')}
                        </Link>
                    </View>

                    <View style={[styles.cardWrapper, S.pt]}>
                            <OrderInfoCard
                                style={S.mb }
                                label={this.__('addresslabel')}
                                text={formatAddressFromObject(this.props.address, true)}
                                icon={Images.iconLocationBlue} />
                            <OrderInfoCard
                                style={ S.mb }
                                label={this.__('datelabel')}
                                text={dateFormat(this.props.laborStartDateTime, 'mmmm d, yyyy')}
                                icon={Images.iconCalendarSmallBlue}/>
                            <OrderInfoCard
                                    label={this.__('timelabel')}
                                    text={dateFormat(this.props.laborStartDateTime, 'h:MM TT')}
                                    icon={Images.iconTimeBlue}/>
                    </View>

                    <View style={[styles.buttonWrapper, S.mb]}>
                        <Button style={styles.button} label={this.__('button')} onPress={() => this.onSubmit()} />
                    </View>
                    <Faqs data={faq} containerStyles={{marginTop: 10}} />
                </ScrollView>

                <AppModalFullScreen modalKey={'calculation'}>
                    <H2 style={styles.modalTitle}>{this.__('modaltitle')}</H2>
                    <P style={styles.modalCopy}>{this.__('modalcopy')}</P>
                    <View>
                        <TopNavHeader
                            data={[this.__('movingout'), this.__('movingin')]}
                            selectedId={this.state.activeModalTab}
                            onPress={(index) => this.setState({ activeModalTab: index })}
                        />
                    </View>
                    <View style={[styles.table, (this.state.activeModalTab !== 0) ? { position:'absolute', left:500 } : { }]}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell1}>
                                <P style={styles.tableCellContent}>{this.__('mostudiolabel')}</P>
                            </View>
                            <View style={styles.tableCell2}>
                                <P style={styles.tableCellContent}>{this.__('mostudiovalue')}</P>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell1}>
                                <P style={styles.tableCellContent}>{this.__('motwobedlabel')}</P>
                            </View>
                            <View style={styles.tableCell2}>
                                <P style={styles.tableCellContent}>{this.__('motwobedvalue')}</P>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell1}>
                                <P style={styles.tableCellContent}>{this.__('mothreebedlabel')}</P>
                            </View>
                            <View style={styles.tableCell2}>
                                <P style={styles.tableCellContent}>{this.__('mothreebedvalue')}</P>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell1}>
                                <P style={styles.tableCellContent}>{this.__('mofourbedlabel')}</P>
                            </View>
                            <View style={styles.tableCell2}>
                                <P style={styles.tableCellContent}>{this.__('mofourbedvalue')}</P>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.table, (this.state.activeModalTab !== 1) ? { position:'absolute', left:500 } : { }]}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell1}>
                                <P style={styles.tableCellContent}>{this.__('mistudiolabel')}</P>
                            </View>
                            <View style={styles.tableCell2}>
                                <P style={styles.tableCellContent}>{this.__('mistudiovalue')}</P>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell1}>
                                <P style={styles.tableCellContent}>{this.__('mitwobedlabel')}</P>
                            </View>
                            <View style={styles.tableCell2}>
                                <P style={styles.tableCellContent}>{this.__('mitwobedvalue')}</P>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell1}>
                                <P style={styles.tableCellContent}>{this.__('mithreebedlabel')}</P>
                            </View>
                            <View style={styles.tableCell2}>
                                <P style={styles.tableCellContent}>{this.__('mithreebedvalue')}</P>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell1}>
                                <P style={styles.tableCellContent}>{this.__('mifourbedlabel')}</P>
                            </View>
                            <View style={styles.tableCell2}>
                                <P style={styles.tableCellContent}>{this.__('mifourbedvalue')}</P>
                            </View>
                        </View>
                    </View>
                </AppModalFullScreen>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        address: getAddress(state),
        laborStartDateTime: getStartDateTime(state),
        workers: getWorkers(state),
        hours: getHours(state),
        screenLanguage: getLanguageDataSelector(state, 'LaborWorkersScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotoScreen: (screen) => {
            dispatch(navigate({ routeName: screen }));
        },
        openModal: () => {
            dispatch(openModalById('calculation'))
        },
        setWorkersAndHours: (workers, hours) => {
            dispatch(setWorkersAndHours(workers, hours))
        },
        showConciergeBell: () => {
          dispatch(showBell())
        },
        hideConciergeBell: () => {
          dispatch(hideBell())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(LaborWorkersScreen));
