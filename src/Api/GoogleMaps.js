import { googleMapsApiData } from '../Config/Constants'

export async function autocomplete(query = '', location = {}) {
    const request = {
        cache: 'no-cache',
        method: 'GET',
    }

    let url = googleMapsApiData.autocompleteBaseUrl + 'types=address&'
    url += `input=${query}`

    if (location.hasOwnProperty('lat') && location.hasOwnProperty('lng')) {
        url += `&location=${location.lat},${location.lng}&radius=${googleMapsApiData.autocompleteRange}`
    }

    console.log('autocomplete', url)
    const responseStream = await fetch(url, request)    
    if (responseStream.status !== 200) {
        throw {
            responseStatus: 200,
            errorCodes: ['google_api_connection_error']
        }
    }

    const resp = await responseStream.json()
    if (resp.hasOwnProperty('status')) {
        if (resp.status === 'OK') {
            return resp.predictions
        } else if (resp.status == 'ZERO_RESULTS') {
            return {}
        }
    }

    throw {        
        responseStatus: responseStream.status,
        errorCodes: resp.hasOwnProperty('error_message') ? [resp.error_message] : ['unknown google api autocomplete error']
    }
}

export async function geocode(query = '') {
    const request = {
        method: 'GET',
    }

    let url = googleMapsApiData.geocodeBaseUrl
    url += `address=${query}`

    const responseStream = await fetch(url, request)    
    if (responseStream.status !== 200) {
        throw {
            responseStatus: 200,
            errorCodes: ['google_api_connection_error']
        }
    }

    const resp = await responseStream.json()
    if (resp.hasOwnProperty('status')) {
        if (resp.status === 'OK') {
            return resp.results[0].geometry.location
        } else if (resp.status === 'ZERO_RESULTS') {
            return {}
        }
    }

    throw {        
        responseStatus: responseStream.status,
        errorCodes: resp.hasOwnProperty('error_message') ? [resp.error_message] : ['unknown google api geocoding error']
    } 
}

export async function placeDetails(placeId) {
    const request = {
        method: 'GET',
    }

    let url = googleMapsApiData.placeDetailsBaseUrl
    url += `placeid=${placeId}`

    const responseStream = await fetch(url, request)    
    if (responseStream.status !== 200) {
        throw {
            responseStatus: 200,
            errorCodes: ['google_api_connection_error']
        }
    }

    const resp = await responseStream.json()
    if (resp.hasOwnProperty('status')) {
        if (resp.status === 'OK') {
            return resp.result
        }
    }

    throw {        
        responseStatus: responseStream.status,
        errorCodes: resp.hasOwnProperty('error_message') ? [resp.error_message] : ['unknown google api place details error']
    } 
}