import { apiUrls } from '../Config/Constants'
import { buildJsonPayload, doPost, doGet, doPatch } from './Helper'

const TYPE_ACH_TRANSFER = "achTransfer"

export async function submitAchTransferRequest(routingNumber, accountNumber, token) {
    const attributes = {
        routingNumber,
        accountNumber
    }
    const payload = buildJsonPayload(TYPE_ACH_TRANSFER, attributes)

    return await doPost(apiUrls.createAchTransfer, payload, token)
}

export async function getAchTransfer(token) {
    return await doGet(apiUrls.createAchTransfer, token)
}

export async function verifyRoutingNumber(routingNumber, token) {
    const url = `${apiUrls.verifyRoutingNumber}${routingNumber}`
    return await doGet(url, token)
}
