import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import dateFormat from 'dateformat'

import * as c from '../../../Components';
import images from '../../../Theme/Images'
import layout from '../../../Theme/Layout'

import * as fromPacking from '../../../Redux/Modules/Packing';
import { __ } from '../../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../../Redux/Modules/Localization'
import { checkForFeedback,setFeedbackLocationText } from '../../../Redux/Modules/Feedback'
import { ScreenHOC } from '../../Screen';

export class PackingMaterialsOrderSuccessScreen extends Component {
    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    render()  {
        if (!this.props.orderDetails) {
            return null
        }

        const orderTotal = this.props.orderDetails.totalPrice;
        const orderNumber = this.props.orderDetails.jsonapi_identifier;
        const orderedAt = this.props.orderDetails.orderedAt;
        return (
            <c.ScreenWrapper
                backgroundImage={images.texture05}
                watermark={images.movingWatermark}>
                <View style={[layout.innerContainerNarrowed, { paddingTop: 30 }]}>
                    <c.H2 style={{ paddingBottom: 30 }}>{this.__('thankyounote')}</c.H2>
                    <View style={{ marginBottom: 30 }}>
                        <c.DataListItem label={this.__('ordertotallabel')} value={'$' + orderTotal} />
                        <c.DataListItem label={this.__('ordernumberlabel')} value={orderNumber} />
                        <c.DataListItem label={this.__('orderdatelabel')} value={dateFormat(orderedAt, 'mmm d, yyyy', true)} />
                    </View>

                    <c.Button
                        label={this.__('button')}
                        onPress={()=>{
                            this.props.purchaseDone()
                            this.props.feedbackCheck()
                            this.props.feedbackText(
                                this.__("moodTrackerTitle"),
                                this.__("moodTrackerText")
                            )
                        }}
                        style={{ width: '100%', minHeight: 40 }} />
                </View>
            </c.ScreenWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orderDetails: fromPacking.getOrderDetails(state),
        screenLanguage: getLanguageDataSelector(state, 'PackingMaterialsOrderSuccessScreen'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        purchaseDone: () => { dispatch(fromPacking.asyncPurchseDone()) },
        feedbackCheck: () => {
            dispatch(checkForFeedback('moodTrackerPackageMats'))
        },
        feedbackText: (title, text) => {
            dispatch(setFeedbackLocationText(title, text))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenHOC(PackingMaterialsOrderSuccessScreen));
