import { AsyncStorage } from 'react-native';
import { dsKeyAuthToken } from '../../Config/Constants';
import { requestTempHousing, getTempHouses } from '../../Api/Housing';
import { createSelector } from 'reselect'
import { navigate } from './Routing'
import { showBell } from './Concierge'
import { asyncLogOff } from './Authentication'
import { handleError } from './SystemMessaging'
import { addAsyncWorkingRequest, removeAsyncWorkingRequest} from './SystemWorking'

export const REQUEST_TEMP_HOUSING = 'REQUEST TEMP HOUSING';
export const REQUEST_TEMP_HOUSING_SUCCESS = 'REQUEST TEMP HOUSING SUCCESS';
export const REQUEST_TEMP_HOUSING_ERROR = 'REQUEST TEMP HOUSING ERROR';
export const REQUEST_TEMP_HOUSING_INFORMATION = 'REQUEST_TEMP_HOUSING_INFORMATION';

export const setTempRequest = () => {
    return {
        type: REQUEST_TEMP_HOUSING
    }
}

export const requestTempHousingSuccess = (value) => {
    return {
        type: REQUEST_TEMP_HOUSING_SUCCESS,
        value
    }
}

export const requestTempHousingError = (value) => {
    return {
        type: REQUEST_TEMP_HOUSING_ERROR,
        value
    }
}

export const requestTempHousingInformation = (value) => {
    return {
        type: REQUEST_TEMP_HOUSING_INFORMATION,
        value
    }
}

export const asyncRequestTempHousing = (params) => {
    return async function(dispatch) {
        try {
            dispatch(addAsyncWorkingRequest())

            const token = await AsyncStorage.getItem(dsKeyAuthToken);
            dispatch(setTempRequest);
            result = await requestTempHousing(params, token);
            dispatch(requestTempHousingSuccess(true));
            showBell()
            dispatch(navigate({ routeName: 'TempHousingExit'}))
        } catch (error) {
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const asyncGetTempHouses = () => {
    return async function(dispatch) {
        try {
            dispatch(addAsyncWorkingRequest())

            const token = await AsyncStorage.getItem(dsKeyAuthToken);
            const result = await getTempHouses(token)

            dispatch(requestTempHousingInformation(result))
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
    tempRequest: false,
    error: false,
    requests: {}
}

export default function tempHousing(state = initialState, action) {
    switch(action.type) {
        case REQUEST_TEMP_HOUSING_SUCCESS:
            return {
                ...state,
                tempRequest: action.value
            }
        case REQUEST_TEMP_HOUSING_ERROR:
            return {
                ...state,
                tempRequest: action.value,
                error: true
            }
        case REQUEST_TEMP_HOUSING_INFORMATION:
            return {
                ...state,
                requests: action.value
            }
        default:
            return state
      }
}

export const getTempHousingDataSelector = ({ tempHousing }) => {
    return tempHousing
}

export const getTempHousingValue = createSelector(
    getTempHousingDataSelector,
    (tempHousingData) => {
        return tempHousingData ? tempHousingData.tempRequest : null
    }
)

export const getTempHousingErrorSelector = createSelector(
    getTempHousingDataSelector,
    (tempHousingData) => {
        return tempHousingData ? tempHousingData.error : null
    }
)

export const getRequestsSelector = createSelector(
    getTempHousingDataSelector,
    (tempHousingData) => {
        return tempHousingData ? tempHousingData.requests : null
    }
)
