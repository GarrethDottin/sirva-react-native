import { AsyncStorage } from 'react-native'
import { createSelector } from 'reselect';
import { dsKeyAuthToken } from '../../Config/Constants'
import { getTruckQuotes, getMovingQuotes, submitQuoteRequest } from '../../Api/Moving'
import { retrieveAuthTokenFromDevice, unpackResponse, unpackResponseArray } from '../../Api/Helper'
import { handleError } from './SystemMessaging'
import { addAsyncWorkingRequest, removeAsyncWorkingRequest} from './SystemWorking'
import { asyncLogOff } from './Authentication'
import { navigate } from '../../Redux/Modules/Routing'

import * as fromRelocation from './Relocation';

// vscode-fold=#
const tempTruckQuotes = {
    data: [{
        id: "1",
        type: 'truck_quote',
        attributes: {
            company: "UHaul",
            size: "12ft",
            quote: "100.56"
        }
    },
    {
        id: "2",
        type: 'truck_quote',
        attributes: {
            company: "UHaul",
            size: "15ft",
            quote: "150.56"
        }
    },
    {
        id: "3",
        type: 'truck_quote',
        attributes: {
            company: "UHaul",
            size: "21ft",
            quote: "200.56"
        }
    },
    {
        id: "4",
        type: 'truck_quote',
        attributes: {
            company: "UHaul",
            size: "26ft",
            quote: "300.56"
        }
    },
    {
        id: "5",
        type: 'truck_quote',
        attributes: {
            company: "Penske",
            size: "10ft",
            quote: "1000.56"
        }
    },
    {
        id: "6",
        type: 'truck_quote',
        attributes: {
            company: "Penske",
            size: "16ft",
            quote: "2000.56"
        }
    },
    {
        id: "7",
        type: 'truck_quote',
        attributes: {
            company: "Penske",
            size: "22ft",
            quote: "3000.56"
        }
    }]
}

const SET_TRUCK_QUOTE_DATA = 'SET_TRUCK_QUOTE_DATA'
const NO_TRUCK_QUOTE_DATA = 'NO_TRUCK_QUOTE_DATA'
const SET_TRUCK_SIZE = 'SET_TRUCK_SIZE'
const SET_ACTIVE_TRUCK_QUOTE_ID = 'SET_ACTIVE_TRUCK_QUOTE_ID'
const UPDATE_MOVING_QUOTES = 'UPDATE_MOVING_QUOTES'
const NO_MOVING_QUOTE_DATA = 'NO_MOVING_QUOTE_DATA'
const SET_ACTIVE_MOVING_QUOTE_ID = 'SET_ACTIVE_MOVING_QUOTE_ID'
export const QUOTE_REQUEST_SUBMITTED = 'QUOTE_REQUEST_SUBMITTED'

export const setTruckQuoteData = (truckQuoteData) => {
    return {
        type: SET_TRUCK_QUOTE_DATA,
        truckQuoteData: truckQuoteData
    }
}

export const noTruckQuoteData = () => {
    return {
        type: NO_TRUCK_QUOTE_DATA,
    }
}

export const setTruckSize = (size) => {
    return {
        type: SET_TRUCK_SIZE,
        truckSize: size
    }
}

export const setActiveTruckQuote = (id) => {
    return {
        type: SET_ACTIVE_TRUCK_QUOTE_ID,
        activeTruckQuoteId: id
    }
}

export const noMovingQuoteData = () => {
    return {
        type: NO_MOVING_QUOTE_DATA,
    }
}

export const updateMovingQuoteData = (data) => {
    return {
        type: UPDATE_MOVING_QUOTES,
        movingQuotes: data
    }
}

export const setActiveMovingQuote = (id) => {
    return {
        type: SET_ACTIVE_MOVING_QUOTE_ID,
        activeMovingQuoteId: id
    }
}

export const quoteRequestSubmitted = () => {
    return {
        type: QUOTE_REQUEST_SUBMITTED
    }
}

export const navigateToFsQuotes = () => {
    return (dispatch, getState) => {
        const inventoryItemCount = fromRelocation.getInventoryItemCountSelector(getState());
        if (inventoryItemCount > 0) {
            dispatch(navigate({ routeName: 'FsQuoteList'}))
        } else {
            dispatch(navigate({ routeName: 'FsQuoteLanding' }))
        }
    }
}

export const asyncFetchTruckQuoteData = () => {
    return async function (dispatch) {

        try {
            dispatch(addAsyncWorkingRequest())
            const token = await AsyncStorage.getItem(dsKeyAuthToken)
            const response = await getTruckQuotes(token)
            const truckQuoteData = unpackResponseArray(response)
            console.log('truckQuoteData', truckQuoteData)
            dispatch(setTruckQuoteData(truckQuoteData))

        } catch(error){
            console.log('error', error)
            if (error.responseStatus === 422) {
                //No quotes
                dispatch(noTruckQuoteData())
            } else {
                dispatch(
                    error.responseStatus === 401 ? asyncLogOff() : handleError(error)
                )
            }
        } finally {
            dispatch(removeAsyncWorkingRequest())
         }
    }
}

export const asyncFetchMovingQuoteData = () => {
    return async function (dispatch) {

        try {
            dispatch(addAsyncWorkingRequest())

            const token = await AsyncStorage.getItem(dsKeyAuthToken)
            const response = await getMovingQuotes(token)

            const data = unpackResponseArray(response)

            dispatch(updateMovingQuoteData(data))
        } catch(error){
            console.log('error', error)
            if (error.responseStatus === 422) {
                //No quotes
                dispatch(noMovingQuoteData())
            } else {
                dispatch(
                    error.responseStatus === 401 ? asyncLogOff() : handleError(error)
                )
            }
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const asyncSubmitQuoteRequest = (supplierId) => {
    return async function (dispatch) {

        try {
            dispatch(addAsyncWorkingRequest())

            const token = await AsyncStorage.getItem(dsKeyAuthToken)
            const response = await submitQuoteRequest(supplierId, token)
            dispatch(quoteRequestSubmitted())
            dispatch(navigate({ routeName: 'FsQuoteSubmitted' }))
        } catch(error){
            console.error(error)
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}
const initialState = {
    truckQuoteData: null,
    noTruckQuotesAvailable: false,
    activeTruckSize: null,
    activeTruckQuoteId: null,
    movingQuotes: null,
    noMovingQuotesAvailable: false,
    activeMovingQuoteId: null
}

//Relocation Reducer
export default moving = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRUCK_QUOTE_DATA:
            return {
                ...state,
                truckQuoteData: action.truckQuoteData,
                noTruckQuotesAvailable: false
            }
        case NO_TRUCK_QUOTE_DATA:
            return {
                ...state,
                noTruckQuotesAvailable: true
            }
        case SET_TRUCK_SIZE:
            return {
                ...state,
                activeTruckSize: action.truckSize,
            }
        case SET_ACTIVE_TRUCK_QUOTE_ID:
            return {
                ...state,
                activeTruckQuoteId: action.activeTruckQuoteId
            }
        case UPDATE_MOVING_QUOTES:
            return {
                ...state,
                movingQuotes: action.movingQuotes,
                noMovingQuotesAvailable: false
            }
        case NO_MOVING_QUOTE_DATA:
            return {
                ...state,
                noMovingQuotesAvailable: true
            }
        case SET_ACTIVE_MOVING_QUOTE_ID:
            return {
                ...state,
                activeMovingQuoteId: action.activeMovingQuoteId
            }
        default:
            return state
    }
}

export const getTruckQuotesSelector = ({ moving }) => moving.truckQuoteData
export const getActiveTruckSizeSelector = (state) => state.moving.activeTruckSize

export const getTruckQuotesBySizeSelector = createSelector(
    getTruckQuotesSelector,
    getActiveTruckSizeSelector,
    (quotes, activeTruckSize) => {

        let quotesForSize = null

        if (activeTruckSize != null && quotes != null) {
            const sizeBoundaries = activeTruckSize.split('-')

            quotesForSize = quotes.filter((quote) => {
                const sizeAsInt = parseInt(quote.size.replace('ft', ''))
                return sizeAsInt >= sizeBoundaries[0] && sizeAsInt <= sizeBoundaries[1]
            })
        }
        return quotesForSize
    }
)

export const getActiveTruckQuoteSelector = (state) => state.moving.activeTruckQuoteId

export const getTruckQuoteDetailSelector = createSelector(
    getTruckQuotesSelector,
    getActiveTruckQuoteSelector,
    (quotes, activeTruckQuoteId) => {
        const activeQuote = quotes.find((quote) => {
            return quote.jsonapi_identifier === activeTruckQuoteId
        })

        return activeQuote
    }
)

export const getTruckEstimateRange = createSelector(
    getTruckQuotesSelector,
    (quotes) => {
        if (!quotes) return null

        let quoteMin = -1,
            quoteMax = -1

        quotes.map((quote) => {
            if (quoteMin < 0) quoteMin = quote.quote
            if (quoteMax < 0) quoteMax = quote.quote

            quoteMin = quote.quote < quoteMin && quote.quote > 0 ? quote.quote : quoteMin
            quoteMax = quote.quote > quoteMax ? quote.quote : quoteMax
        })
        return {
            min: quoteMin,
            max: quoteMax
        }
    }
)

export const getMovingQuotesSelector = (state) => state.moving.movingQuotes
export const getActiveMovingQuoteSelector = (state) => state.moving.activeMovingQuoteId

export const getMovingQuoteDetailSelector = createSelector(
    getMovingQuotesSelector,
    getActiveMovingQuoteSelector,
    (quotes, activeQuoteId) => {
        const activeQuote = quotes.find((quote) => {
            return quote.jsonapi_identifier === activeQuoteId
        })
        return activeQuote //quotes.find by id
    }
)

export const getMovingQuoteRange = createSelector(
    getMovingQuotesSelector,
    (quotes) => {
        if (!quotes) return null

        let quoteMin = -1,
            quoteMax = -1

        quotes.map((quote) => {
            if (quoteMin < 0) quoteMin = quote.avgPrice
            if (quoteMax < 0) quoteMax = quote.avgPrice

            quoteMin = quote.avgPrice < quoteMin ? quote.avgPrice : quoteMin
            quoteMax = quote.avgPrice > quoteMax ? quote.avgPrice : quoteMax
        })
        return {
            min: quoteMin,
            max: quoteMax
        }
    }
)


