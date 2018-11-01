import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Linking, ScrollView } from 'react-native';
import { OffersCard, TopNavHeader, GestureFlatList, ScreenWrapper } from '../../Components';
import { FadeInLeftToRight, FadeInDown } from '../../Components/Animations';
import { Layout, Images, Colors } from '../../Theme';
import { styles } from './Styles/OffersScreenStyles';
import {
    asyncFetchOffers,
    getCategoriesSelector,
    getCurrentCategoryOfferListSelector,
    selectedCategory,
    getSelectedCategory,
} from '../../Redux/Modules/Offers'
import { navigate } from '../../Redux/Modules/Routing';
import { ScreenHOC } from '../Screen';

class OffersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSelection: 0,
        }

        this._renderItem = this._renderItem.bind(this)
    }

    componentDidMount() {
        this.props.fetchData();
    }

    handleHeaderSelection(index) {
        categoryIndex = this.props.categories.indexOf(this.props.currentCategory)
        if (index !== categoryIndex) {
            this.props.setSelectedCategory(this.props.categories[index])
        }
    }

    handleSwipeRight() {
        index = this.props.categories.indexOf(this.props.currentCategory)
        if (index > 0) {
            this.props.setSelectedCategory(this.props.categories[index - 1])
        }
    }

    handleSwipeLeft() {
        index = this.props.categories.indexOf(this.props.currentCategory)
        if (index < this.props.categories.length - 1) {
            this.props.setSelectedCategory(this.props.categories[index + 1])
        }
    }

    _renderItem({ item, index }) {
        return (
            <FadeInDown count={index}>
                <View style={styles.itemContainer}>
                    <OffersCard
                        headerImage={item.logo}
                        label={item.name}
                        info={item.description}
                        buttonLabel={item.text}
                        onPress={() => this.props.navigate({ routeName: 'OfferDetails', params: { offer: item } })} />
                </View>
            </FadeInDown>
        );
    }

    render() {
        return (
            <ScreenWrapper backgroundStyles={{ flex: 1 }} backgroundImage={Images.texture01} >
                <ScrollView style={{ height: "100%" }}>
                    <TopNavHeader
                        data={this.props.categories}
                        selectedId={this.props.categories.indexOf(this.props.currentCategory)}
                        onPress={(index) => this.handleHeaderSelection(index)} />
                    <GestureFlatList
                        data={this.props.currentCategoryData}
                        _keyExtractor={(item, index) => item.id}
                        _renderItem={this._renderItem}
                        style={{}}
                        onSwipeLeft={() => this.handleSwipeLeft()}
                        onSwipeRight={() => this.handleSwipeRight()}
                    />
                </ScrollView>
            </ScreenWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: getCategoriesSelector(state),
        currentCategoryData: getCurrentCategoryOfferListSelector(state),
        currentCategory: getSelectedCategory(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => {
            dispatch(asyncFetchOffers());
        },
        setSelectedCategory: (category) => {
            dispatch(selectedCategory(category))
        },
        navigate: (navigationOptions) => {
            dispatch(navigate(navigationOptions));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScreenHOC(OffersScreen));
