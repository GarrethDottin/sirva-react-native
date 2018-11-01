import React, { Component, PureComponent } from "react";
import { connect } from 'react-redux';
import { ScrollView, View, Text, Image, TouchableOpacity, ImageStore, Linking, TouchableWithoutFeedback } from "react-native";

import { ScreenWrapper, BasicCard, IntroCard, H2, TopNavHeader, GestureFlatList, AddressAutocompleteModal, Faqs, P, Touchable, Button } from "../../Components";
import { Images, Variables, Colors } from "../../Theme";

import { __ } from '../../Utils/ReactHelpers';

import * as fromSchools from '../../Redux/Modules/Schools';
import * as fromLocalization from '../../Redux/Modules/Localization';
import * as fromRelocation from '../../Redux/Modules/Relocation';
import * as fromModal from '../../Redux/Modules/Modal';

import S from '../../StyleUtils';

class SchoolCard extends PureComponent {
    ratingColorStyle() {
        const { schoolData } = this.props;
        if (!schoolData.rating) { return null }
        if (schoolData.rating > 7) {
            return S.lightGreen;
        } else if (schoolData.rating > 4) {
            return S.darkYellow;
        } else {
            return S.red;
        }
    }

    imageLinkOpacity() {
        const { schoolData } = this.props;
        if (schoolData.website) {
            return 1;
        } else {
            return 0.2;
        }
    }

    render() {
        const { schoolData, onPress} = this.props;
        return (
            <BasicCard onPress={ onPress }>
                <View>
                    <View style={ [S.mbXs, { width: '100%', flexDirection: 'row', justifyContent: 'space-between' }] } >
                    <H2 style={ [S.lightBlue, S.flex1] }>{schoolData.name}</H2>
                    {
                        schoolData.rating &&
                        <Text style={ [S.textLg, this.ratingColorStyle(), { fontWeight: '600', width: 80, textAlign: 'right' }] }>{schoolData.rating}/10</Text>
                    }
                    </View>
                    <View style={ S.mbXl }>
                    <Text style={ [S.textXs, S.darkGray]}>{schoolData.address}</Text>
                    <Text style={ [S.textXs, S.lightGray]}>{schoolData.district}</Text>
                    </View>
                    <View style={[{flexDirection:'row', justifyContent: 'space-between', alignItems: 'flex-end'}]}>
                        <View>{ schoolData.reviews && <Text style={S.textXs}> { schoolData.reviews } REVIEWS </Text>}</View>
                        <Image style={{width:18, height:18, opacity: this.imageLinkOpacity() }} source={Images.iconExternalLink} />
                    </View>
                </View>
            </BasicCard>
        )
    }
}
export class SchoolsScreen extends Component {
    CategoriesTitleMapping = {
        all: 'All',
        elementary_school: 'Elementary School',
        primary_school: 'Primary School',
        middle_school: 'Middle School',
        high_school: 'High School'
    }

    constructor(props) {
        super(props);
        this.__ = __(this.props.screenLanguage);
    }
    componentDidMount() {
        this.props.loadSchools();
    }

    handleSwipeRight() {
        const currentCategoryIndex = this.schoolCategories.indexOf(this.props.selectedCategory);
        if (currentCategoryIndex <= 0) { return };
        this.props.selectSchoolCategory(this.schoolCategories[currentCategoryIndex - 1])
    }

    handleSwipeLeft() {
        const currentCategoryIndex = this.schoolCategories.indexOf(this.props.selectedCategory);
        if (currentCategoryIndex >= (this.schoolCategories.length - 1)) { return };
        this.props.selectSchoolCategory(this.schoolCategories[currentCategoryIndex + 1])
    }

    get schoolCategories() {
        return ['all', 'elementary_school', 'primary_school', 'middle_school', 'high_school'];
    }

    get schoolCategoriesTitles() {
        const mapping = this.CategoriesTitleMapping;
        return this.schoolCategories.map((category)=> {
            return mapping[category];
        })
    }

    get selectedCategoryTitle() {
        return this.CategoriesTitleMapping[this.props.selectedCategory];
    }

    saveAddress(address) {
        const addressId = this.props.destinationAddress ? this.props.destinationAddress.id : null;
        this.props.saveAddress(addressId, address);
    }

    openSchoolWebsite(school) {
        Linking.openURL(school.website)
    }

    render() {
        const categories = this.schoolCategories;
        const categoriesTitles = this.schoolCategoriesTitles;
        const address = this.props.destinationAddress;
        const schools = this.props.schoolList;

        const faq = [1, 2, 3, 4].map((questionNumber)=> {
            return { question: this.__(`question${questionNumber}`), answer: this.__(`answer${questionNumber}`) }
        })

        return (
        <ScreenWrapper>
            <ScrollView style={{minHeight: '100%'}}>
            <IntroCard styles={ [{ paddingTop: 30 }] }>
                <View style={{ paddingHorizontal: Variables.smallGutter }}>
                    <H2 style={ { color: Colors.white } }>{this.__('schoolresearchlocation')}</H2>
                    <View style={ { paddingBottom: 2, borderBottomColor: Colors.white, borderBottomWidth: 1 } }>
                        <TouchableOpacity style={ { flexDirection: 'row', alignItems: 'center' } } onPress={() => this.props.openModal('edit-home-address')}>
                            {
                                address && (
                                    <P style={ [S.textXl, S.offwhite, S.fontSemiBold, { lineHeight: 28 }] }>
                                        {address.city}, {address.zipCode}
                                    </P>
                                )
                            }
                            {
                                !address && (
                                    <P style={ [S.textXl, S.offwhite, S.fontSemiBold, { lineHeight: 28 }] }>
                                        Set Address
                                    </P>
                                )
                            }
                            <Image style={{ marginLeft: 'auto', width: 17, height: 17 } } source={Images.iconEdit} />
                        </TouchableOpacity>
                    </View>
                </View>
            </IntroCard>
            <AddressAutocompleteModal addressObj={address} modalKey={'edit-home-address'} onSubmit={ (address) => { this.saveAddress(address) } } />
            {
                address && (
                    <View style={ S.ph }>
                        <TopNavHeader
                        data={categoriesTitles}
                        selectedId={categoriesTitles.indexOf(this.selectedCategoryTitle)}
                        onPress={ (index)=> { this.props.selectSchoolCategory(categories[index]) } }
                        style={ [{ paddingHorizontal: 0, justifyContent: 'space-between' }] }/>
                        <View style={ [S.mb, S.ph, S.flexRow, S.justifyBetween] }>
                            <H2>{this.__('schoolresearchtopresults')}</H2>
                            <Touchable onPress={ ()=> Linking.openURL('https://www.greatschools.org/') }>
                                <Image resizeMode={'contain'} source={ Images.gsLogo } style={ { height: 20, width: 38 } }></Image>
                            </Touchable>
                        </View>
                        <GestureFlatList
                        data={schools}
                        _keyExtractor={(item, index) => index }
                        _renderItem={({item})=> (
                            <View style={ S.mb }>
                            <SchoolCard onPress={ ()=> this.openSchoolWebsite(item) } schoolData={item}/>
                            </View>
                        )}
                        style={{}}
                        onSwipeLeft={() => this.handleSwipeLeft()}
                        onSwipeRight={() => this.handleSwipeRight()}
                        />
                        { this.props.hasMore && (
                                <Button style={ [{ width: '100%', backgroundColor: 'transparent' }] }
                                        onPress={ this.props.loadMore }>
                                    <View style={ S.flexRow }>
                                        <Text style={ [S.lightBlue, S.textXs, S.fontSemiBold, S.mr2] }>VIEW MORE</Text>
                                        <Image style={{width:16, height:16}} source={Images.iconExternalLink} />
                                    </View>
                                </Button>
                            )
                        }
                    </View>
                )
            }
            { address && <Faqs data={faq}/> }
            </ScrollView>
        </ScreenWrapper>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
        schoolList: fromSchools.getSelectedSchoolList(state),
        hasMore: fromSchools.hasMore(state),
        schoolCategories: fromSchools.getSchoolCategories(state),
        selectedCategory: fromSchools.getSelectedSchoolCategory(state),
        screenLanguage: fromLocalization.getLanguageDataSelector(state, 'SchoolsScreen'),
        destinationAddress: fromRelocation.getDestinationAddressSelector(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadSchools: ()=> { dispatch(fromSchools.loadSchools()) },
        loadMore: ()=> { dispatch(fromSchools.loadMore()) },
        selectSchoolCategory: (category)=> { dispatch(fromSchools.selectSchoolCategory(category)) },
        openModal: (modalId) => { dispatch(fromModal.openModalById(modalId)) },
        saveAddress: (addressId, addressData) => { dispatch(fromRelocation.asyncSaveAddress(addressData, addressId, 'destination')) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchoolsScreen);