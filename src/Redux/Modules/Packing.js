import { createSelector } from 'reselect';
import { AsyncStorage } from 'react-native'
import { NavigationActions } from "react-navigation";
import { dsKeyAuthToken } from '../../Config/Constants'
import { getOriginAddressSelector } from './Relocation'
import { unpackResponse } from '../../Api/Helper';
import { getMovingSupplies, getSupplyPricing, setSupplyOrder, fetchOrders } from '../../Api/Packing'
import { ImovePaymentRequest, getPaymentData, getPaymentDetails, getShippingAddressPaymentOptions} from '../../Utils/ApplePay'
import { handleError } from './SystemMessaging';
import { navigate, resetNavStack } from '../../Redux/Modules/Routing';

export const SET_MOVING_SUPPLIES = "[PACKING_MATERIALS] SET_MOVING_SUPPLIES"
export const SELECT_MOVING_SUPPLY = "[PACKING_MATERIALS] SELECT_MOVING_SUPPLY"
export const SET_SUPPLY_PRICING = "[PACKING_MATERIALS] SET_SUPPLY_PRICING"
export const START_PURCHASE = "[PACKING_MATERIALS] START PURCHASE";
export const COMPLETE_PURCHASE = "[PACKING_MATERIALS] COMPLETE PURCHASE";
export const PURCHASE_DONE = "[PACKING_MATERIALS] PURCHASE_DONE";

export const LOAD_ORDERS_SUCCESS = "[PACKING_MATERIALS] LOAD_ORDERS_SUCCESS";
export const SELECT_ORDER = "[PACKING_MATERIALS] SELECT_ORDER";

export const asyncFetchPackingMaterials = () => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem(dsKeyAuthToken)
      if (token !== null) {
        const response = await getMovingSupplies(token)
        dispatch(setMovingSupplies(response))
      }
    }
    catch (e) {
      dispatch(handleError(e));
    }
  }
}

export const asyncFetchMovingSupplyPricing = (sku, address) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem(dsKeyAuthToken)
      if (token !== null) {
        try {
          let response = await getSupplyPricing(token, sku, address)
          dispatch(setSupplyPricing(response, sku))
        } catch(e) {}
      }
    }
    catch (e) {
      console.error(e)
    }
  }
}

export const asyncPlaceSupplyOrder = (sku, paymentToken) => {
  return async(dispatch, getState) => {
    try {
      const token = await AsyncStorage.getItem(dsKeyAuthToken)
      if (token !== null) {
        const originAddress = getOriginAddressSelector(getState())
        let response = await setSupplyOrder(token, sku, originAddress, paymentToken)
        if (response.status === 200) {
          return true
        } else {
          return false
        }
      }
    }
    catch (e) {
      console.error(e)
    }
  }
}


const asyncPlaceOrder = async(sku, address, paymentToken) => {
  const token = await AsyncStorage.getItem(dsKeyAuthToken)
  if (token !== null) {
    let response = await setSupplyOrder(token, sku, address, paymentToken)
    // TODO: Proper handling of server error
    if (response.errorCodes === undefined) {
      const data = unpackResponse(response);
      return data;
    } else {
      return false
    }
  }
}

const asyncUpdateAddress = async(sku, address, name, defaultDetails) => {
  const token = await AsyncStorage.getItem(dsKeyAuthToken)
  if (token !== null) {
    const response = await getSupplyPricing(token, sku, address);
    if (response.errorCodes === undefined) {
      const newDetails = getPaymentDetails([
        { name: name, value: response.data.attributes.price },
        { name: "Tax", value: response.data.attributes.taxPrice }
      ], response.data.attributes.totalPrice, true)
      return newDetails
    }
    else {
      return Promise.reject(response.errorCodes);
    }
  } else {
    return null
  }
}

export const asyncCompletePurchase = (orderDetails) => {
  return function(dispatch) {
    dispatch(completePurchase(orderDetails));
    dispatch(navigate({ routeName: "PackingMaterialsOrderSuccess"}));
  }
}

export const asyncPurchseDone = () => {
  return function(dispatch) {
    dispatch(resetNavStack({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
        ],
    }));
    dispatch(purchaseDone());
  }
}

/* --------- PAYMENT --------- */
export const startBuy = (name, price, tax, total) => {
  return (dispatch, getState)=> {
    dispatch({ type: START_PURCHASE })
    const state = getState()
    const { currentSupply } = getCurrentSupplyInformation(state)
    let address = getOriginAddressSelector(state)
    const METHOD_DATA = getPaymentData("ios");

    const DETAILS = getPaymentDetails([
      { name: name, value: price },
      { name: "Tax", value: tax || 0 },
    ], total)

    const OPTIONS = getShippingAddressPaymentOptions()
    const paymentRequest = new ImovePaymentRequest(METHOD_DATA, DETAILS, OPTIONS);

    paymentRequest.addEventListener("shippingaddresschange", e => {
      const shippingAddress = paymentRequest.shippingAddress
      if (shippingAddress) {
        const newAddress = {
          //street1: shippingAddress.addressLine, // addressLine comes empty in test environment, replace line below with this in real devices
          street1: address.street1,
          street2: null,
          city: shippingAddress.city,
          state: shippingAddress.region,
          zipCode: shippingAddress.postalCode
        }
        address = newAddress
      }

      const updateAddressPromise =
        asyncUpdateAddress(currentSupply.sku, address, name, DETAILS)
          .catch((error)=> {
            dispatch(handleError(error))
            paymentRequest.abort();
          })
      e.updateWith(updateAddressPromise)
    });

    paymentRequest
      .show()
      .then((paymentResponse)=> {
        const { paymentToken } = paymentResponse.details
        return asyncPlaceOrder(currentSupply.sku, address, paymentToken)
          .then((data)=> {
            paymentResponse.complete('success');
            dispatch(asyncCompletePurchase(data));
          })
          .catch((e) => {
            paymentRequest.abort();
            dispatch(handleError(e));
          });
      })
  }
}
/* --------- PAYMENT --------- */

export const showMovingSupply = (supply) => {
  return async (dispatch, getState) => {
    const { sku } = supply
    const originAddress = getOriginAddressSelector(getState())
    dispatch(asyncFetchMovingSupplyPricing(sku, originAddress))
    dispatch(selectMovingSupply(sku))
    dispatch(navigate({ routeName: "PackingMaterialsDetail", params: { packingSupply: supply }}));
  }
}

export const setMovingSupplies = (movingSupplies) => {
  return {
    type: SET_MOVING_SUPPLIES,
    payload: { movingSupplies }
  }
}

export const selectMovingSupply = (sku) => {
  return {
    type: SELECT_MOVING_SUPPLY,
    payload: { sku }
  }
}

export const setSupplyPricing = (pricing, sku) => {
  return {
    type: SET_SUPPLY_PRICING,
    payload: { pricing: pricing, sku: sku }
  }
}

export const completePurchase = (orderDetails) => {
  return {
    type: COMPLETE_PURCHASE,
    payload: { orderDetails  }
  }
}

export const purchaseDone = (purchaseDone) => {
  return {
    type: PURCHASE_DONE
  }
}

export const loadOrdersSuccess = (orders) => {
  return {
    type: LOAD_ORDERS_SUCCESS,
    payload: { orders }
  }
}

export const selectOrder = (order) => {
  return {
    type: SELECT_ORDER,
    payload: { orderId: order.id }
  }
}

export const loadOrders = () => {
  return async (dispatch)=> {
    const token = await AsyncStorage.getItem(dsKeyAuthToken)
    if (token) {
      const result = await fetchOrders(token);
      dispatch(loadOrdersSuccess(result.data));
    }
  }
}

const initialState = {
  skus: [],
  bySku: {},
  selectedSupply: null,
  orderDetails: null,
  ordersById: {},
  orderIds: [],
  selectedOrderId: null
}

export default function packing(state = initialState, action) {
  let pricing
  switch (action.type) {
    case SET_MOVING_SUPPLIES:
      const movingSupplies = action.payload.movingSupplies.data
      const bySku = movingSupplies.reduce(function(accum, movingSupply) {
        return {
          ...accum,
          [movingSupply.id]: {
            ...movingSupply.attributes,
            subitems: movingSupply.attributes.subitems || []
          }
        };
      }, {});
      const skus = Object.keys(bySku);

      return { ...state, skus: skus, bySku: bySku }
    case SELECT_MOVING_SUPPLY:
      const { sku } = action.payload
      const supply = state.bySku[sku];
      pricing = {
        fullPrice: supply.price,
        price: supply.price,
        tax: null,
        totalPrice: supply.price
      }
      const selectedSupply = { sku, pricing }
      return { ...state, selectedSupply: selectedSupply }
    case SET_SUPPLY_PRICING:
      pricing = action.payload.pricing
      const _sku = action.payload.sku
      const _selectedSupply = state.selectedSupply
      if ( _selectedSupply.sku !== _sku ) {
        return state
      }
      const pricingInfo = { id: pricing.data.id, ...pricing.data.attributes}
      return { ...state, selectedSupply: { sku: _sku, pricing: pricingInfo}}
    case COMPLETE_PURCHASE:
      const { orderDetails } = action.payload;
      return { ...state, orderDetails };
    case PURCHASE_DONE:
      return { ...state, orderDetails: null }
    case LOAD_ORDERS_SUCCESS:
      const ordersById = action.payload.orders.reduce((accum, order)=> {
        return {
          ...accum,
          [order.id]: {
            ...order.attributes,
            id: order.id,
            relationships: order.relationships
          }
        }
      }, {});
      return { ...state, ordersById }
    case SELECT_ORDER:
      return {
        ...state,
        selectedOrderId: action.payload.orderId
      }
    default:
      return state
  }
}

// selector helpers
export const getSkus = (state) => state.packing.skus
export const getAllSupplies = (state) => state.packing.bySku
export const getSelectedSupply = (state) => state.packing.selectedSupply
export const getOrderDetails = (state) => state.packing.orderDetails;
export const getOrdersById = (state) => state.packing.ordersById;
export const getSelectedOrderId = (state) => state.packing.selectedOrderId;

export const getSupplies = createSelector([getAllSupplies], (supplies) => {
  const suppliesArray = []
  Object.keys(supplies).forEach((key) => suppliesArray.push(supplies[key]))
  return suppliesArray;
});

export const getSuppliesByRow = createSelector([getSupplies], supplies => {
  return supplies.reduce(function(accum, supply, index) {
    const rowIndex = Math.floor(index / 2);
    accum[rowIndex] = accum[rowIndex] || [];
    accum[rowIndex].push(supply);
    return accum;
  }, []);
});

export const getCurrentSupplyInformation = createSelector(
  [getSelectedSupply, getAllSupplies],
  (selectedSupply, supplies) => {
    if (selectedSupply === null) {
      return null
    }
    let supply = null
    const sku = selectedSupply.sku
    const currentSupply = supplies[sku]
    if (currentSupply) {
      supply = { ...supply, currentSupply}
    }

    return supply
  }
)

export const getCurrentSupplyPricing = createSelector([getSelectedSupply], (selectedSupply) => {
  if (selectedSupply === null || selectedSupply.pricing === null) {
    return null
  }
  return selectedSupply.pricing
})

export const getOrders = createSelector([getOrdersById, getAllSupplies], (ordersById, suppliesBySku) => {
  return Object.keys(ordersById).reduce((accum, orderId)=> {
    const orderData = ordersById[orderId];
    const order = {
      ...orderData,
      supply: suppliesBySku[orderData.relationships.supply.data.id]
    }
    return [...accum, order];
  }, []);
});

export const getSelectedOrder = createSelector([getSelectedOrderId, getOrdersById, getAllSupplies], (selectedOrderId, ordersById, suppliesBySku)=> {
  const orderData = ordersById[selectedOrderId];
  return {
    ...orderData,
    supply: suppliesBySku[orderData.relationships.supply.data.id]
  };
});
