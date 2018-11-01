import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Colors, Variables } from '../Theme';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { googleMapsApiData } from '../Config/Constants';

import S from '../StyleUtils';
import { extractAddress } from '../Utils/GoogleMapHelpers';
import Highlighter from 'react-native-highlight-words';

const styles = {
    container: { zIndex: 1 },
    poweredContainer: { display: 'none' } ,
    listView: {
        position: 'absolute', width: '100%', top: '100%', backgroundColor: 'white',
        maxHeight: 250, borderBottomLeftRadius: 10, borderBottomRightRadius: 10
    },
    textInputContainer: {
        backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'
    },
    textInput: {
        color: Colors.white,
        backgroundColor: 'transparent',
        width: '100%',
        height: 38,
        fontFamily: Variables.baseFont,
        fontSize: 12,
        fontWeight: Variables.weightBold,
        lineHeight: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.xLightGray,
    },
    row: {
        padding: 12,
        flexDirection: 'row',
        width: '100%',
    },
    separator: { backgroundColor: '#c8c7cc', height: StyleSheet.hairlineWidth },
    description: { flex: 1, maxWidth: '80%' }
}

export class AddressTypeahead extends Component {
    constructor(props) {
        super(props);
        this.addressTypeaheadRef = React.createRef();
        this.state = {
            searchText: this.props.defaultValue
        }
    }

    renderRow(rowData) {
        const { main_text, main_text_matched_substrings, secondary_text } = rowData.structured_formatting
        const searchWords = this.state.searchText.split(' ');
        return (
            <View style={ styles.description } >
                <Highlighter searchWords={searchWords}
                             style={ [S.mbXxs] }
                             highlightStyle={ { fontWeight: 'bold' } }
                             textToHighlight={main_text} />
                <Text style={ [S.textXxs] }  numberOfLines={1}>{secondary_text}</Text>
            </View>
        );
    }

    onPress(data, details) {
        const address = extractAddress(details.address_components);
        this.props.onSelect(address);
        this.addressTypeaheadRef.current.setAddressText(address.street1);
    }

    onChangeText(text) {
        this.setState({ searchText: text })
    }

    render() {
        return (
            <GooglePlacesAutocomplete
                ref={ this.addressTypeaheadRef }
                placeholder={this.props.placeholder}
                getDefaultValue={() => this.state.searchText }
                minLength={3}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                currentLocation={false}
                query={{
                    key: googleMapsApiData.googleApiKey,
                    language: 'en',
                    types: 'address'
                }}
                suppressDefaultStyles={true}
                isRowScrollable={false}
                numberOfLines={1}
                placeholderTextColor={ this.props.placeholderColor ? this.props.placeholderColor : Colors.lightGray }
                styles={styles}
                renderRow={ (rowData) => this.renderRow(rowData) }
                textInputProps={ {
                    onChangeText: (text) => this.onChangeText(text)
                } }
                onPress={ (data, details) => this.onPress(data, details) }
            />
        )
    }
}
