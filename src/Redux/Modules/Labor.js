import { AsyncStorage } from 'react-native'
import { createSelector } from 'reselect'
import { NavigationActions } from "react-navigation";
import { dsKeyAuthToken } from '../../Config/Constants'
import { getLaborQuote, setLaborOrder, getLaborOrders } from '../../Api/Labor'
import { ImovePaymentRequest, getPaymentData, getPaymentDetails } from '../../Utils/ApplePay'
import { unpackResponse, unpackResponseArray } from '../../Api/Helper';
import { handleError } from './SystemMessaging';
import { addAsyncWorkingRequest, removeAsyncWorkingRequest} from './SystemWorking'
import { navigate, resetNavStack } from '../../Redux/Modules/Routing';


const SET_ADDRESS = 'SET_ADDRESS'
const SET_START_DATETIME = 'SET_START_DATETIME'
const SET_WORKERS_HOURS = 'SET_WORKERS_HOURS'
const SET_QUOTE_DATA = 'SET_QUOTE_DATA'
export const START_PURCHASE = "START PURCHASE"
export const COMPLETE_PURCHASE = "COMPLETE PURCHASE"
const PURCHASE_DONE = "PURCHASE_DONE"
const ORDER_HISTORY = "ORDER_HISTORY"

export const asyncGetQuote = () => {
    return async function (dispatch, getState) {
        const state = getState()
        try {
            dispatch(addAsyncWorkingRequest())

            const token = await AsyncStorage.getItem(dsKeyAuthToken)
            const response = await getLaborQuote(
                token,
                getAddress(state),
                getStartDateTime(state),
                getHours(state),
                getWorkers(state)
            )
            dispatch(setQuoteData(response.data.attributes))
        } catch (error) {
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const startPurchase = (name, price, tax, total) => {
    return (dispatch, getState)=> {
        dispatch({ type: START_PURCHASE })
        const state = getState()
        const METHOD_DATA = getPaymentData("ios")
        const DETAILS = getPaymentDetails([
            { name: name, value: price },
            { name: "Tax", value: tax || 0 },
        ], total)

        const paymentRequest = new ImovePaymentRequest(METHOD_DATA, DETAILS)
        paymentRequest.show()
            .then((paymentResponse)=> {
                dispatch(addAsyncWorkingRequest())

                const { paymentToken } = paymentResponse.details

                return asyncPlaceOrder(
                        getAddress(state),
                        getStartDateTime(state),
                        getHours(state),
                        getWorkers(state),
                        total,
                        paymentToken
                    )
                    .then((data)=> {
                        paymentResponse.complete('success');
                        dispatch(asyncCompletePurchase(data));
                    })
                    .catch((e) => {
                        paymentRequest.abort();
                        dispatch(handleError(e));
                    }).finally(() => {
                        dispatch(removeAsyncWorkingRequest())
                    })
            })
    }
}

const asyncPlaceOrder = async(address, datetime, hours, workers, total, paymentToken) => {
    const token = await AsyncStorage.getItem(dsKeyAuthToken)
    if (token !== null) {
        let response = await setLaborOrder(token, address, datetime, hours, workers, total, paymentToken)
        // TODO: Proper handling of server error
        if (response.errorCodes === undefined) {
            const data = unpackResponse(response);
            return data;
        } else {
            return false
        }
    }
}

export const asyncCompletePurchase = (orderDetails) => {
    return function(dispatch) {
        dispatch(completePurchase(orderDetails));
        dispatch(navigate({ routeName: "LaborSuccess" }));
    }
}

export const asyncPurchseDone = () => {
    return function(dispatch) {
        dispatch(resetNavStack({
            index: 0,
            actions: [ NavigationActions.navigate({ routeName: 'Home' }) ],
        }))
        dispatch(purchaseDone());
    }
}

export const asyncGetOrderHistory = () => {
    return async function (dispatch) {
        try {
            dispatch(addAsyncWorkingRequest())

            const token = await AsyncStorage.getItem(dsKeyAuthToken)
            const response = await getLaborOrders(token)
            const orderHistory = unpackResponseArray(response)

            dispatch(setOrderHistory(orderHistory))
        } catch (error) {
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const setAddress = (addressObj, addressType) => {
    return {
        type: SET_ADDRESS,
        address: addressObj,
        addressType: addressType,
    }
}

export const setStartDateTime = (dateObj) => {
    return {
        type: SET_START_DATETIME,
        startDateTime: dateObj
    }
}

export const setWorkersAndHours = (workers, hours) => {
    return {
        type: SET_WORKERS_HOURS,
        workers: workers,
        hours: hours,
    }
}

export const setQuoteData = (quoteData) => {
    return {
        type: SET_QUOTE_DATA,
        quoteData: quoteData,
    }
}

export const completePurchase = (orderDetails) => {
    return {
        type: COMPLETE_PURCHASE,
        orderDetails: orderDetails
    }
}

export const purchaseDone = () => {
    return {
        type: PURCHASE_DONE
    }
}

export const setOrderHistory = (orderHistory) => {
    return {
        type: ORDER_HISTORY,
        orderHistory: orderHistory
    }
}

const initialState = {
    address: null,
    addressType: null,
    startDateTime: null,
    workers: null,
    hours: null,
    quoteData: null,
    orderDetails: null,
    orderHistory: null,
}

export default function labor(state = initialState, action) {
    switch (action.type) {
        case SET_ADDRESS:
            return {
                ...state,
                address: action.address,
                addressType: action.addressType,
            }
        case SET_START_DATETIME:
            return {
                ...state,
                startDateTime: action.startDateTime
            }
        case SET_WORKERS_HOURS:
            return {
                ...state,
                workers: action.workers,
                hours: action.hours,
            }
        case SET_QUOTE_DATA:
            return {
                ...state,
                quoteData: action.quoteData
            }
        case COMPLETE_PURCHASE:
            return {
                ...state,
                orderDetails: action.orderDetails
            }
        case PURCHASE_DONE:
            return {
                ...state,
                orderDetails: null
            }
        case ORDER_HISTORY:
            return {
                ...state,
                orderHistory: action.orderHistory
            }
        default:
            return state
    }
}

export const getLaborData = ({ labor }) => {
    return labor
}

export const getAddress = createSelector(
    getLaborData,
    (laborData) => {
        return laborData ? laborData.address : null
    }
)

export const getAddressType = createSelector(
    getLaborData,
    (laborData) => {
        return laborData ? laborData.addressType : null
    }
)

export const getStartDateTime = createSelector(
    getLaborData,
    (laborData) => {
        return laborData ? laborData.startDateTime : null
    }
)

export const getWorkers = createSelector(
    getLaborData,
    (laborData) => {
        return laborData ? laborData.workers : null
    }
)

export const getHours = createSelector(
    getLaborData,
    (laborData) => {
        return laborData ? laborData.hours : null
    }
)

export const getQuoteData = createSelector(
    getLaborData,
    (laborData) => {
        return laborData ? laborData.quoteData : null
    }
)

export const getOrderDetails = createSelector(
    getLaborData,
    (laborData) => {
        return laborData ? laborData.orderDetails : null
    }
)

export const getOrderHistory = createSelector(
    getLaborData,
    (laborData) => {
        return laborData ? laborData.orderHistory : null
    }
)
