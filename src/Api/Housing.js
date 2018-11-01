import { apiUrls } from '../Config/Constants'
import { buildJsonPayload, doPost, doGet, doPatch } from './Helper'

const TYPE_REALTOR = "realtors"

export async function getAgents({city, state, zip}, token) {
    const url = apiUrls.getRealEstateAgents.replace('{city}', city).
        replace('{state}', state).replace('{zip}', zip)

    return await doGet(url, token)
}

export async function getAgentsByLatLng({lat, lng}, token) {
    const url = apiUrls.getRealEstateAgentsLatLng.replace('{lat}', lat).
        replace('{lng}', lng)

    return await doGet(url, token)
}

export async function getTempHouses(token) {
  const url = apiUrls.getTempHouses;

  return await doGet(url, token);
}

export function requestTempHousing(housingParams, token) {
    let city = housingParams.city
    let state = housingParams.state
    let zip_code = housingParams.zipCode
    let start_date = housingParams.startDate
    let end_date = housingParams.endDate
    let number_of_bedrooms = housingParams.bedrooms
    let number_of_bathrooms = housingParams.bathrooms
    let average_daily = housingParams.averageDaily
    let extra_comments = housingParams.extraComments
    let comute = housingParams.comutes
    let features = housingParams.features

    const attributes = {
        city,
        state,
        zip_code,
        start_date,
        end_date,
        number_of_bedrooms,
        number_of_bathrooms,
        average_daily,
        extra_comments,
        comute,
        features
    }

    const url = apiUrls.requestTempHousing
    const payload = buildJsonPayload('request_temp_bookings', attributes)

    return doPost(url, payload, token);
}


export function requestRealtorLeadSubmission(supplier_id, request_type, token) {
  const attributes = {
    supplierId: supplier_id,
    requestType: request_type
  }
  console.log('attributes', attributes)
  const payload = buildJsonPayload(TYPE_REALTOR, attributes)

  return doPost(apiUrls.requestRealtorLeadSubmission, payload, token)
}

export async function getLead(supplier_id, token) {
  const attributes = {
    supplierId: supplier_id
  }

  const payload = buildJsonPayload(TYPE_REALTOR, attributes)

  return await doPost(apiUrls.getLead, payload, token)
}
