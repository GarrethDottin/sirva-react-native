import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ScrollView, View, Text, Image, TextInput, FlatList } from 'react-native'
import { ScreenWrapper, H2, H3, H4, P, CompareListItem } from '../../Components'
import { Images, Layout, Variables, Colors } from '../../Theme'
import styles from './Styles/CostOfLivingScreenStyles'
import S from '../../StyleUtils/'
import * as cityGuideUtils from '../../Screens/CityGuides/Utils'
import { __ } from '../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../Redux/Modules/Localization'
import { getOriginCitySelector, getDestinationCitySelector, getSelectedInfoKey } from '../../Redux/Modules/CityGuides'
import { ScreenHOC } from '../Screen';


class CompareInfoScreen extends Component {
    constructor(props){
      super(props);
      this.__ = __(this.props.screenLanguage)
    }

    componentWillMount() {
        this.props.navigation.setParams({ title: this.props.navigation.state.params.screenName })
    }

    render() {
        let originCity = this.props.originCity;
        let destinationCity = this.props.destinationCity;
        let visibleKey = this.props.visibleKey;
        let data = cityGuideUtils.createInfoData(cityGuideUtils[visibleKey](this.__), originCity.info[visibleKey], destinationCity.info[visibleKey]);
        const watermark = Images[visibleKey + 'Watermark']

        return (
            <ScreenWrapper backgroundStyles={{ flex: 1}} 
                backgroundImage={Images.texture05} 
                watermark={watermark}>

              <ScrollView style={{ minHeight: "100%" }}>
                <View style={styles.mainContainer}>
                    <View style={[styles.subContainer, S.mb]}>
                        <Text style={styles.firstItem}></Text>
                        <Text style={styles.secondItem}>{originCity.city}</Text>
                        <Text style={styles.thirdItem}>{destinationCity.city}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <FlatList
                            data={data}
                            renderItem={({item}) =>
                                <CompareListItem
                                    title={item.title ? item.title : null}
                                    subtitle={item.subtitle ? item.subtitle : null}
                                    item1={item.item1 ? item.item1 : null}
                                    item2={item.item2 ? item.item2 : null}
                                    item1Subtitle={item.item1Subtitle ? item.item1Subtitle : null}
                                    item2Subtitle={item.item2Subtitle ? item.item2Subtitle : null} />
                                }/>
                    </View>
                </View>
              </ScrollView>
            </ScreenWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        originCity: getOriginCitySelector(state),
        destinationCity: getDestinationCitySelector(state),
        screenLanguage: getLanguageDataSelector(state, 'CompareInfoScreen'),
        visibleKey: getSelectedInfoKey(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenHOC(CompareInfoScreen))
