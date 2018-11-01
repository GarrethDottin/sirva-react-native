import { vsprintf } from 'sprintf-js'
import { getLanguageDataSelector } from '../Redux/Modules/Localization'

export const generateGuid = () => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4().toString() + s4().toString() + s4().toString() + s4().toString() + s4().toString() + s4().toString() + s4().toString() + s4().toString()
}

export const formatCurrencyFromString = (value, includeCents = false) => {
    const decimals = (includeCents) ? 2 : 0

    let floatValue = parseFloat(value)
    if (isNaN(floatValue)) floatValue = 0

    return '$' + floatValue.toFixed(decimals).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const convertHexToRgbaString = (hexValue, opacity = 1) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
    return result
        ? 'rgba(' + parseInt(result[1], 16) + ',' +
            parseInt(result[2], 16) + ',' +
            parseInt(result[3], 16) + ',' + opacity + ')'
        : 'rgba(0,0,0,0)';
}

export const formatAddressFromObject = (addressObj, trimZipCode = false) => {
    const zipLength = trimZipCode ? 5 : 99

    let addressString = ''
    if (addressObj !== null) {
        addressString = ((addressObj.street1 !== null && addressObj.street1.length) ? addressObj.street1 + "\n" : "") +
            ((addressObj.street2 !== null) && addressObj.street2.length ? addressObj.street2 + "\n" : "") +
            ((addressObj.city !== null && addressObj.city.length) ? addressObj.city + ", " : "") +
            ((addressObj.state !== null && addressObj.state.length) ? addressObj.state + " " : "") +
            ((addressObj.zipCode !== null && addressObj.zipCode.length) ? addressObj.zipCode.substring(0, zipLength) : "")
    }
    return addressString
}

_filterGooglePlacesAddressComponent = (addressArray, type) => {
    const component = addressArray.filter((comp) => {
        return comp.types.includes(type)
    })

    return component[0]
}
export const convertGooglePlacesAddress = (addressArray) => {
    return {
        street1: `${_filterGooglePlacesAddressComponent(addressArray, 'street_number').short_name} ${_filterGooglePlacesAddressComponent(addressArray, 'route').short_name}`,
        //const street2 = _filterGooglePlacesAddressComponent(addressArray, 'route').short_name,
        city: _filterGooglePlacesAddressComponent(addressArray, 'locality').short_name,
        state: _filterGooglePlacesAddressComponent(addressArray, 'administrative_area_level_1').short_name,
        zip_code: _filterGooglePlacesAddressComponent(addressArray, 'postal_code').short_name
    }
}

export const getDateObjFromString = (dateString) => {
    const parts = dateString.split('-');
    return new Date(parts[0], parts[1] - 1, parts[2]);
}

export const formatDateFromObj = (dateObj) => {
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
    }
    return dateObj.toLocaleDateString("en-us", options)
}

export const formatDateFromString = (dateString) => {
    return formatDateFromObj(getDateObjFromString(dateString))
}

export const getDaysUntil = (date) => {
    return Math.ceil(Math.abs(date - new Date()) / (1000 * 3600 * 24))
}

export const formatPhone = (number) => {
    let numbers = number.replace(/\D/g, '')
    const char = { 1: ' (', 4: ') ', 7: '-' }

    if (!numbers.startsWith('1')) {
        numbers = '1' + numbers
    }

    let newNumber = ''

    for (var i = 0; i < numbers.length; i++) {
        newNumber += (char[i] || '') + numbers[i];
    }
    return newNumber
}

export const isValidPhone = (number) => {
    let numbers = number.replace(/\D/g, '')

    if (!numbers.startsWith('1')) {
        numbers = '1' + numbers
    }

    return numbers.length === 11
}

export const pareseUrlParams = (url) => {
    const urlAry = url.split('?')
    if (urlAry.length !== 2) return {}

    const qs = urlAry[1]
    const result = {};
    qs.split("&").forEach((part) => {
        const item = part.split("=")
        result[item[0]] = decodeURIComponent(item[1])
    })

    return result
}

export const __ = (langagueData) => {
    this.langagueData = langagueData

    return l = function(languageKey, variables = [], data = null) {
        if (langagueData || data) {
            const currentData = data || langagueData
            const keys = languageKey.split('.')
            const currentKey = keys[0]

            keys.shift()

            if (currentData[currentKey]){
                if (keys.length) {
                    return l(keys.join('.'), variables, currentData[currentKey])
                } else {
                    return vsprintf(currentData[languageKey], variables)
                }
            } else {
                console.error(`The requested key was not found in the language data: ${currentKey}.`)
            }
        } else {
            console.error('Language Data not set. Have you initialized "__"?')
        }
    }
}

export const printCost = (value) => {
    if (value == null ) {
        return null;
    } else {
        return "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

export const printPercentage = (value) => {
    if (value == null) {
        return null;
    } else {
        return value + "%";
    }
}

export const printValue = (value) => {
    if (value == null) {
        return null;
    } else {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    }
}

export const printDegrees = (value) => {
    if (value == null) {
        return null;
    } else {
        return value + "°";
    }
}

export const percentage = (value1, value2) => {
    return Math.round((Math.abs(value1 - value2) / ((value1 + value2) / 2)) * 100) + "%"
}
