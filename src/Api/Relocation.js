import { apiUrls } from '../Config/Constants'
import { buildJsonPayload, doPost, doGet, doPatch, patch } from './Helper'

const TYPE_RELOCATION = 'relocation'
const TYPE_ADDRESS = 'address'

export async function getRelocationData(token) {
    return await doGet(apiUrls.getAllRelocationData, token)
}

export async function saveMoveDate(moveDate, token) {
    const attributes = {
        moveDate
    }
    const payload = buildJsonPayload(TYPE_RELOCATION, attributes)

    return await doPatch(apiUrls.updateRelocationInfo, payload, token)
}

export async function getDestinationWeather(token) {
    return await doGet(apiUrls.getDestinationWeather, token)
}

export async function acceptRepaymentAgreement(token) {
    return await doPatch(apiUrls.acceptAgreement, {}, token)
}

export async function submitStep2(adultCount, kidCount, token) {
    const attributes = {
        currentAdultsCount: adultCount,
        currentKidsCount: kidCount,
    }
    const payload = buildJsonPayload(TYPE_RELOCATION, attributes);

    return await doPatch(apiUrls.updateRelocationInfo, payload, token);
}

export async function submitStep3(type, bedCount, token) {
    const attributes = {
        currentBedroomCount: bedCount,
        currentResidenceType: type,
        setupCompleted: true
    }
    const payload = buildJsonPayload(TYPE_RELOCATION, attributes);

    return await doPatch(apiUrls.updateRelocationInfo, payload, token);
}

export async function saveAddress(addressData, addressId, token) {
    const attributes = addressData

    const payload = buildJsonPayload(TYPE_ADDRESS, attributes, addressId);

    return await doPatch(apiUrls.updateRelocationAddress, payload, token);
}

export async function saveNewDestinationAddress(addressData, token) {
    const attributes = addressData

    const payload = buildJsonPayload(TYPE_ADDRESS, attributes);

    return await doPost(apiUrls.saveNewDestinationAddress, payload, token);
}

export async function signTermsAndConditions(token) {
  return await patch(apiUrls.termsSeen, {}, token)
}
