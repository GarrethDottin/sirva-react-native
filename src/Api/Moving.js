import { apiUrls } from '../Config/Constants'
import { buildJsonPayload, doPost, doGet, doPatch } from './Helper'

const TYPE_RELOCATION = 'relocation'

export async function saveInventoryData({ inventoryData, weightInPounds, cubes, totalItemsCount }, token) {
    const attributes = {
        inventoryData,
        weightInPounds,
        cubes,
        totalItemsCount
    }
    const payload = buildJsonPayload(TYPE_RELOCATION, attributes)

    return await doPatch(apiUrls.updateRelocationInfo, payload, token)
}

export async function getInventoryData(token) {
    return await doGet(apiUrls.getInventoryData, token)
}

export async function getInventoryItemMatrix(token) {
    return await doGet(apiUrls.getInventoryItemMatrix, token)
}

export async function getMovingQuotes(token) {
    return await doGet(apiUrls.getMovingQuotes, token)
}

export async function getTruckQuotes(token) {
    return await doGet(apiUrls.getTruckQuotes, token)
}

export async function submitQuoteRequest(supplierId, token) {
    const url = `${apiUrls.requestMovingQuote}?supplier_id=${supplierId}`
    
    return await doPost(url, {}, token)
}
