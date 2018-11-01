import React, { Component } from "react";
import { connect } from "react-redux";

import {
    View,
    Text,
    Image,
    SectionList
} from "react-native";
import images from "../../../Theme/Images";
import layout, { Layout } from "../../../Theme/Layout";
import {
    PackingCard,
    ScreenWrapper,
    TopNavHeader,
    OfferInline
} from "../../../Components/index";
import {
    asyncFetchPackingMaterials,
    getSupplies,
    getSuppliesByRow,
    showMovingSupply,
} from "../../../Redux/Modules/Packing";
import { __ } from '../../../Utils/ReactHelpers'
import { getLanguageDataSelector } from '../../../Redux/Modules/Localization'
import S from '../../../StyleUtils/index';
import colors from '../../../Theme/Colors';
import { styles } from "./Styles/PackingMaterialsScreenStyles";

class PackingMaterialsScreen extends Component {

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage)
    }

    componentDidMount() {
        this.props.fetchData();
    }

    renderRow({ item, index }) {
        const [supplier1, supplier2] = item;
        return (
            <View key={index} style={styles.rowContainer}>
                {supplier1 ? this.renderSupplyItem(supplier1) : null}
                {supplier2 ? this.renderSupplyItem(supplier2) : null}
            </View>
        );
    }

    renderSupplyItem(supply) {
        return (
            <View style={styles.rowItem}>
                <PackingCard
                    text={supply.name}
                    logo={supply.images !== null ? supply.images[0] : null}
                    onPress={() => this.props.showDetails(supply)}
                />
            </View>
        );
    }

    renderLogoArea() {
        return (
            <View style={[layout.outerContainerAlt, styles.offer]}>
                <OfferInline copy={this.__('discountpromo')} />
            </View>
        )
    }

    render() {
        const sections = [
            { title: 'Logo', data: [''], renderItem: () => { return this.renderLogoArea() } },
            { title: 'list', data: this.props.suppliesByRow }
        ]
        return  (

            <SectionList sections={sections}
                scrollEnabled={false}
                renderItem={(data) => this.renderRow(data)}
                style={{ flex: 1, marginBottom: 10 }} />
            )
    }
}

const mapStateToProps = state => {
    return {
        supplies: getSupplies(state),
        suppliesByRow: getSuppliesByRow(state),
        screenLanguage: getLanguageDataSelector(state, 'PackingMaterialsScreen'),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => {
            dispatch(asyncFetchPackingMaterials());
        },
        showDetails: supply => {
            dispatch(showMovingSupply(supply));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(
    PackingMaterialsScreen
);
