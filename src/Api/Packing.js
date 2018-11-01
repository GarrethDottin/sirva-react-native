import { apiUrls } from '../Config/Constants'
import { doGet, doPost, buildJsonPayload } from './Helper'

const TYPE_SUPPLY_ORDER = 'supply_order'
const TYPE_SUPPLY_ORDER_INFO = 'supply_order_info'

export async function getMovingSupplies(token) {      
  return await doGet(apiUrls.getMovingSupplies, token);
}

export async function getSupplyPricing(token, sku, address) {
  const apiUrl = apiUrls.supplyPricing;
  const attributes = {
    sku,
    address: address ? {
      street1: address.street1,
      street2: address.street2,
      city: address.city,
      state: address.state,
      zip_code: address.zipCode
    } : null
  }
  const payload = buildJsonPayload(TYPE_SUPPLY_ORDER_INFO, attributes)
  return await doPost(apiUrl, payload, token);
}

/*
  address: {
    street1: "",
    street2: "", OPTIONAL
    city: "",
    state: "",
    zip_code: "",
  }
*/

export async function setSupplyOrder(token, sku, address, paymentToken) {
  const apiUrl = apiUrls.supplyOrders

  const attributes = {
    sku,
    payment_token: paymentToken,
    address: address ? {
      street1: address.street1,
      street2: address.street2,
      city: address.city,
      state: address.state,
      zip_code: address.zipCode
    } : null
  }

  const payload = buildJsonPayload(TYPE_SUPPLY_ORDER, attributes)

  return await doPost(apiUrl, payload, token)
}

export async function fetchOrders(token) {
  return await doGet(apiUrls.supplyOrdersWithSupply, token);
}
