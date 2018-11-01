import { AsyncStorage } from 'react-native'
import { createSelector } from 'reselect';
import { dsKeyAuthToken } from '../../Config/Constants'
import { getAgents, getAgentsByLatLng, requestRealtorLeadSubmission, getLead } from '../../Api/Housing'
import { closeModal } from './Modal'
import { getOriginAddressSelector, getDestinationAddressSelector } from './Relocation'
import { navigate, pop } from '../Modules/Routing';
import { handleError } from './SystemMessaging';
import { addAsyncWorkingRequest, removeAsyncWorkingRequest} from './SystemWorking'
import { asyncLogOff } from './Authentication';

const SET_AGENTS = 'SET_AGENTS'
const SET_CURRENT_AGENT = 'SET_CURRENT_AGENT'
const SET_BUYING_LOCATION = 'SET_BUYING_LOCATION'
const SET_SELLING_LOCATION = 'SET_SELLING_LOCATION'
const SET_LOCATION_STATE = 'SET_LOCATION_STATE'
const SET_AGENT_REQUEST = 'SET_AGENT_REQUEST'
const SET_LOADING = 'SET_LOADING'
export const REQUEST_REALTOR = 'REQUEST REALTOR'
export const REQUEST_REALTOR_SUCCESS = 'REQUEST REALTOR SUCCESS'
export const REQUEST_REALTOR_ERROR = 'REQUEST REALTOR ERROR'

export const setAgents = (agents) => {
    return {
        type: SET_AGENTS,
        agents
    }
}

export const setCurrentAgent = (agent) => {
    return {
        type: SET_CURRENT_AGENT,
        agent
    }
}

export const setBuyingLocation = (city, state, zip, lat = null, lng = null) => {
    return {
        type: SET_BUYING_LOCATION,
        city,
        state,
        zip,
        lat,
        lng
    }
}

export const setSellingLocation = (city, state, zip, lat = null, lng = null) => {
    return {
        type: SET_SELLING_LOCATION,
        city,
        state,
        zip,
        lat,
        lng
    }
}

export const setLocationState = (isSellState) => {
    return {
        type: SET_LOCATION_STATE,
        isSellState
    }
}

export const setAgentRequest = (request_date) => {
    return {
        type: SET_AGENT_REQUEST,
        request_date
    }
}

export const setLoading = (loading, loaded) => {
    return {
        type: SET_LOADING,
        loading,
        loaded
    }
}

export const initLocationsIfEmpty = () => {
    return (dispatch, getState) => {
        const state = getState()

        const origin = getOriginAddressSelector(state)
        dispatch(setSellingLocation(origin.city, origin.state, origin.zipCode));

        const dest = getDestinationAddressSelector(state)
        dispatch(setBuyingLocation(dest.city, dest.state, dest.zipCode))

    }
}

export const updateLocationAndAgents = (city, state, lat, lng) => {
    return async function (dispatch, getState) {
        dispatch(setBuyingLocation(city, state, null, lat, lng))
        dispatch(asyncGetAgents())
    }
}

export const asyncGetAgents = () => {
    return async function (dispatch, getState) {
        try {
            dispatch(addAsyncWorkingRequest())
            dispatch(setLoading(true, false))
            const token = await AsyncStorage.getItem(dsKeyAuthToken)
            const housingState = getState().housing
            const location = housingState.isSellState ?
                housingState.sellingLocation :
                housingState.buyingLocation

            let response = null
            if (location.lat && location.lng) {
                response = await getAgentsByLatLng({
                    lat: location.lat,
                    lng: location.lng
                }, token)
            } else {
                response = await getAgents({
                    city: location.city,
                    state: location.state,
                    zip: location.zip
                }, token)
        }
            dispatch(setAgents(response.data))
            dispatch(setLoading(false, true))
        } catch (error) {
            dispatch(setLoading(false, true))
            if (error.responseStatus === 401) {
                dispatch(asyncLogOff())
            }

        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const asyncRequestRealtorLeadSubmission = (supplier_id, isSellState) => {
    return async function (dispatch, getState) {
        try {
            dispatch(addAsyncWorkingRequest())
            dispatch({ type: REQUEST_REALTOR })

            const state = getState()
            const isSellState = getLocationStateSelector(state)
            const requestType = isSellState ? "sale" : "purchase"

            const token = await AsyncStorage.getItem(dsKeyAuthToken)
            const response = await requestRealtorLeadSubmission(supplier_id, requestType, token)

            dispatch(pop())
            dispatch({ type: REQUEST_REALTOR_SUCCESS })
            dispatch(navigate({ routeName: 'AgentSubmission' }))
        } catch (error) {
            dispatch({ type: REQUEST_REALTOR_ERROR })
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const asyncGetLead = (supplier_id) => {
    return async function (dispatch) {
        try {
            dispatch(addAsyncWorkingRequest())
            const token = await AsyncStorage.getItem(dsKeyAuthToken)
            const response = await getLead(supplier_id, token)

            if (response["data"] !== null) {
                const requested_date = Date.parse(response["data"]["attributes"]["updatedAt"])
                dispatch(setAgentRequest(requested_date))
            }

        } catch (error) {
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

const initialState = {
    agents: [],
    currentAgent: null,
    currentAgentRequest: null,
    sellingLocation: {
        city: null,
        state: null,
        zip: null,
        lat: null,
        lng: null,
        isSet: false
    },
    buyingLocation: {
        city: null,
        state: null,
        zip: null,
        lat: null,
        lng: null,
        isSet: false
    },
    isSellState: false,
    isLoading: false,
    isLoaded: false
}

// reducer function to manage the modal state
export default function housing(state = initialState, action) {
    switch (action.type) {
        case SET_AGENTS:
            return {
                ...state,
                agents: action.agents
            }
        case SET_CURRENT_AGENT:
            return {
                ...state,
                currentAgent: action.agent
            }
        case SET_BUYING_LOCATION:
            return {
                ...state,
                buyingLocation: {
                    city: action.city,
                    state: action.state,
                    zip: action.zip,
                    lat: action.lat,
                    lng: action.lng,
                    isSet: true
                }
            }
        case SET_SELLING_LOCATION:
        console.log('action', action)
            return {
                ...state,
                sellingLocation: {
                    city: action.city,
                    state: action.state,
                    zip: action.zip,
                    lat: action.lat, //Note: Currently selling address can't be changed on listing screen, only in profile
                    lng: action.lng,// (so lat and lng are never used).
                    isSet: true
                }
            }
        case SET_LOCATION_STATE:
            return {
                ...state,
                isSellState: action.isSellState
            }
        case SET_AGENT_REQUEST:
            return {
                ...state,
                currentAgentRequest: action.request_date,
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading,
                loaded: action.loaded
            }
        default:
            return state
    }
}

export const getHousingData = (state) => {
    return state.housing
}

export const getRealEstateLocationSelector = createSelector(
    getHousingData,
    (housingData) => {
        return housingData.isSellState ? housingData.sellingLocation : housingData.buyingLocation
    }
)

export const getLocationStateSelector = createSelector(
    getHousingData,
    (housingData) => {
        return housingData.isSellState
    }
)
