import { AsyncStorage, NetInfo } from 'react-native'
import { dsKeyAuthToken } from '../Config/Constants'

export function retrieveAuthTokenFromDevice() {
    return AsyncStorage.getItem(dsKeyAuthToken)
}

export async function post(url, payload) {
    return request(url, payload, "POST")
}

export async function patch(url, payload) {
    return request(url, payload, "PATCH")
}

export async function get(url) {
    return request(url, {}, "GET")
}

async function request(url, payload, method) {
    const token = await retrieveAuthTokenFromDevice();
    const response = await doRequest(url, payload, token, method);
    return unpack(response);
}

export async function doPost(url, payload, token = '') {
    return await doRequest(url, payload, token)
}

export async function doPatch(url, payload, token = '') {
    return await doRequest(url, payload, token, "PATCH")
}

export async function doGet(url, token = '') {
    return await doRequest(url, {}, token, "GET")
}

async function doRequest(url, payload, token, method = 'POST') {
    console.log(method + ' - ' + url);
    console.log(JSON.stringify(payload));

    const connectionType = await NetInfo.getConnectionInfo();

    if (connectionType.type == 'none') {
        throw {
            errorCode: 'no_connection'
        }
    }

    const headers = { 'content-type': 'application/json' }
    if (token !== '') headers.Authorization = 'Bearer ' + token

    const request = {
        cache: 'no-cache',
        method: method,
        headers: headers
    }

    if (method !== 'GET') request.body = JSON.stringify(payload);

    const responseStream = await fetch(url, request)

    if (responseStream.status == 500) {
        throw {
            errorCode: 'server_error'
        }
    }

    if (responseStream.status == 401) {
        //Auth failed
        throw {
            responseStatus: 401,
            errorCodes: 'Could not authenticate'
        }
    }

    //successful no body
    if (responseStream.status === 204) {
        return {}
    }

    const resp = await responseStream.json()
    if (resp.hasOwnProperty('data') || responseStream.status === 200) {
        return resp
    }

    throw {
        responseStatus: responseStream.status,
        errorCodes: resp.hasOwnProperty('errors') ? resp.errors :  ['unknown']
    }
}

export function buildJsonPayload (type, attributes, id=null) {
    let payload = { data: {} };
    payload.data.type = type;
    payload.data.attributes = attributes;
    if (id) payload.data.id = id;

    return payload;
}

const unpack = (response) => {
    if (Array.isArray(response.data)) {
        return {
            links: response.links,
            data: unpackResponseArray(response)
        };
    } else {
        return unpackResponse(response);
    }
}

export const unpackResponse = (response) => {
    let data = response.data.attributes
    data.jsonapi_identifier = response.data.id
    data.jsonapi_type = response.data.type

    if ('relationships' in response.data && 'included' in response) {
        for(let key in response.data.relationships) {
            const relation = response.data.relationships[key]

            if (relation.data) {
                const { id, type } = relation.data

                data[key+'Data'] = {}
                data[key+'Data']['id'] = id
                data[key+'Data']['type'] = type

                const relatedObj = response.included.find(function(item) {
                    return item.id === id && item.type === type
                })

                data[key+'Data']['data'] = relatedObj && relatedObj.attributes
            }
        }
    }

    return data
}

export const unpackResponseArray = (response) => {
    const responseData = response.data
    let items = []

    for(index in responseData) {
        const data = {
            data: responseData[index],
        }
        if ('included' in response) {
            data.included = response.included
        }
        items.push(unpackResponse(data))
    }

    return items
}