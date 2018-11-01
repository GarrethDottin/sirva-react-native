import { apiUrls } from '../Config/Constants'
import { doPost, doGet, buildJsonPayload } from './Helper'

const TYPE_QUOTE = 'moving_labor_quote'
const TYPE_ORDER = 'book_moving_labor'

export async function getLaborQuote(token, address, datetime, hours, workers) {
    const apiUrl = apiUrls.getLaborQuote
    const attributes = {
        address: {
            "street1" : address.street1,
            "street2" : address.street2,
            "city" : address.city,
            "state" : address.state,
            "zip_code" : address.zipCode,
        },
        datetime: datetime.toString(),
        hours: hours,
        helpers: workers,
        use_elevator: false //TODO: wire this up to something in the app instead of hardcoded
    }
    const payload = buildJsonPayload(TYPE_QUOTE, attributes)
    return await doPost(apiUrl, payload, token)
}

export async function setLaborOrder(token, address, datetime, hours, workers, total, paymentToken) {
    const apiUrl = apiUrls.placeLaborOrder
    const attributes = {
        address: {
            "street1" : address.street1,
            "street2" : address.street2,
            "city" : address.city,
            "state" : address.state,
            "zip_code" : address.zipCode,
        },
        datetime: datetime.toString(),
        hours: hours,
        helpers: workers,
        use_elevator: false, //TODO: wire this up to something in the app instead of hardcoded
        curreny: 'USD',
        total_paid: total,
        payment_token: paymentToken
    }
  
    const payload = buildJsonPayload(TYPE_ORDER, attributes)  
    return await doPost(apiUrl, payload, token)
}

export async function getLaborOrders(token) {
    const apiUrl = apiUrls.getLaborOrders
    return await doGet(apiUrl, token)
}
