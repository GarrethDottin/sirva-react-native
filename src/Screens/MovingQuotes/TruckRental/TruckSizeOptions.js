import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Images } from '../../../Theme';
import { TopNavHeader } from '../../../Components';

import S from '../../../StyleUtils';

const SIZE_FILTER = [
    '10-12ft',
    '15-16ft',
    '20-22ft',
    '26ft'
]

export class TruckSizeOptions extends Component {
    render() {
        return (
            <View style={ [S.flexRow, S.itemsCenter] }>
                <Image style={ [{ width: 30, height: 30 }] } source={Images.iconTruckGray} />
                <TopNavHeader 
                    data={SIZE_FILTER} 
                    onPress={(index) => {} } 
                    selectedId={null}
                    style={{ paddingLeft: 10, paddingRight: 0 }}
                    optionStyles={[S.ml]}
                    linkStyles={ [S.lightGray, S.textXs, this.props.linkStyles] }
                />
            </View>
        )
    }
}
