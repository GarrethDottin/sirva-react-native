import { createSelector } from 'reselect';
import { getRelocationData, saveMoveDate,
    getDestinationWeather, acceptRepaymentAgreement,
    submitStep2, submitStep3, saveAddress, saveNewDestinationAddress, signTermsAndConditions } from '../../Api/Relocation'
import { retrieveAuthTokenFromDevice, unpackResponse } from '../../Api/Helper'
import { asyncLogOff } from './Authentication'
import { handleError } from './SystemMessaging'
import { addAsyncWorkingRequest, removeAsyncWorkingRequest} from './SystemWorking'
import { back, navigate } from '../../Redux/Modules/Routing'
import { showBell } from '../../Redux/Modules/Concierge'

const LOAD_RELOCATION_DATA = 'LOAD_RELOCATION_DATA'
const SET_RELOCATION_DATA = 'SET_RELOCATION_DATA'
const SAVE_RELOCATION_DATA = 'SAVE_RELOCATION_DATA'
const SET_WEATHER_DATA = 'SET_WEATHER_DATA'
const SET_BEDROOM_SIZE_NO_PERSIST = 'SET_BEDROOM_SIZE_NO_PERSIST'
const UPDATE_MOVE_DATE = 'UPDATE_MOVE_DATE'
const UPDATE_ACCEPT_DATE = 'UPDATE_ACCEPT_DATE'
const UPDATE_STEP2_DATA = 'UPDATE_STEP2_DATA'
const UPDATE_STEP3_DATA = 'UPDATE_STEP3_DATA'
const SET_ORIGIN_ADDRESS = 'SET_ORIGIN_ADDRESS'
const SET_DEST_ADDRESS = 'SET_DEST_ADDRESS'


export const loadRelocationData = () => {
    return {
        type: LOAD_RELOCATION_DATA
    }
}

export const setRelocationData = (relocationData) => {
    return {
        type: SET_RELOCATION_DATA,
        relocationData: relocationData
    }
}

export const saveRelocationData = (relocationData) => {
    return {
        type: SAVE_RELOCATION_DATA,
        relocationData: relocationData
    }
}

export const setDestinationWeatherData = (weatherData) => {
    return {
        type: SET_WEATHER_DATA,
        weatherData: weatherData
    }
}

export const setBedroomSizeNoPersist = (size) => {
    return {
        type: SET_BEDROOM_SIZE_NO_PERSIST,
        size: size
    }
}

export const updateMoveDate = (moveDate) => {
    return {
        type: UPDATE_MOVE_DATE,
        moveDate: moveDate
    }
}

export const updateAcceptDate = (date) => {
    return {
        type: UPDATE_ACCEPT_DATE,
        date: date
    }
}

export const updateStep2Data = (adults, kids) => {
    return {
        type: UPDATE_STEP2_DATA,
        adults: adults,
        kids: kids
    }
}

export const updateStep3Data = (residenceType, bedCount) => {
    return {
        type: UPDATE_STEP3_DATA,
        residenceType: residenceType,
        bedCount: bedCount
    }
}

export const setOriginAddress = (addressData) => {
    return {
        type: SET_ORIGIN_ADDRESS,
        addressData
    }
}

export const setDestAddress = (addressData) => {
    return {
        type: SET_DEST_ADDRESS,
        addressData
    }
}


export const asyncFetchRelocationData = () => {
    return async function (dispatch) {
        try {
            //dispatch(addAsyncWorkingRequest())

            const token = await retrieveAuthTokenFromDevice()
            dispatch(loadRelocationData());
            const response = await getRelocationData(token)
            console.log('response', response)
            const relocationData = unpackResponse(response)

            dispatch(setRelocationData(relocationData))

        } catch(error) {
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        } finally {
            //dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const asyncUpdateMoveDate = (moveDate) => {
    return async function (dispatch) {
        try {
            const token = await retrieveAuthTokenFromDevice()
            const response = await saveMoveDate(moveDate, token)
            const relocationData = unpackResponse(response)
            dispatch(updateMoveDate(relocationData.moveDate))
            dispatch(back())
            dispatch(showBell())
        } catch(error) {
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        }
    }
}

export const asyncFetchDestWeather = () => {
    return async function (dispatch) {
        try {
            const token = await retrieveAuthTokenFromDevice()
            const response = await getDestinationWeather(token)
            const weatherData = unpackResponse(response)
            dispatch(setDestinationWeatherData(weatherData))
        } catch(error) {
            dispatch(
                //error.responseStatus === 401 ? asyncLogOff() : handleError(error)
                error.responseStatus === 401 && asyncLogOff()
            )
        }
    }
}

export const asyncAcceptRepaymentAgreement = () => {
    return async function(dispatch) {
        try {
            dispatch(addAsyncWorkingRequest())

            const token = await retrieveAuthTokenFromDevice()
            const response = await acceptRepaymentAgreement(token)
            const relocationData = unpackResponse(response)
            dispatch(updateAcceptDate(relocationData.signedAgreementAt))
            dispatch(navigate({ routeName: 'Onboarding' }))
        } catch (error) {
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const asyncSubmitStep2Data = (adultCount, kidCount, redirectTo) => {
    return async function(dispatch) {
        try {
            dispatch(addAsyncWorkingRequest())

            const token = await retrieveAuthTokenFromDevice()
            const response = await submitStep2(adultCount, kidCount, token)
            const relocationData = unpackResponse(response)
            dispatch(updateStep2Data(relocationData.currentAdultsCount, relocationData.currentKidsCount))
            dispatch(navigate({ routeName: redirectTo }))
        } catch (error) {
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const asyncSubmitStep3Data = (type, bedCount, redirectTo) => {
    return async function(dispatch) {
        try {
            dispatch(addAsyncWorkingRequest())

            const token = await retrieveAuthTokenFromDevice()
            const response = await submitStep3(type, bedCount, token)
            const relocationData = unpackResponse(response)
            dispatch(updateStep3Data(relocationData.currentResidenceType, relocationData.currentBedroomCount))
            dispatch(navigate({ routeName: redirectTo }))
        } catch (error) {
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const asyncSaveAddress = (addressData, addressId, addressType) => {
    return async function(dispatch) {
        try {
            dispatch(addAsyncWorkingRequest())

            const token = await retrieveAuthTokenFromDevice()

            let response
            if (addressId) {
                response = await saveAddress(addressData, addressId, token)
            } else {
                if (addressType == 'destination') {
                    //Save new destination address
                    response = await saveNewDestinationAddress(addressData, token)
                } else {
                    //Save new origin address -- currently not necessary
                }
            }
            const addressResponseData = {
                data: response.data.attributes,
                id: response.data.id,
                type: response.data.type
            }
            //response.data = Object.assign({}, response.data.attributes)
            if (addressType == 'origin') {
                dispatch(setOriginAddress(addressResponseData))
            } else {
                dispatch(setDestAddress(addressResponseData))
            }
            //dispatch(updateAddress(relocationData.currentAdultsCount, relocationData.currentKidsCount))
        } catch (error) {
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        }  finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const asyncSignTerms = () => {
  return async function(dispatch) {
    try{
      const token = await retrieveAuthTokenFromDevice()
      const response = await signTermsAndConditions(token)
    }catch (error) {
        dispatch( handleError(error))
    }
  }
}

const initialState = {
    relocationData: null,
    weatherData: null,
    loaded: false,
    isLoading: false
}

const relocation = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_RELOCATION_DATA:
            return {
                ...state,
                isLoading: true,
            }
        case SET_RELOCATION_DATA:
            return {
                    ...state,
                    relocationData: action.relocationData,
                    loaded: true,
                    isLoading: false
                }
        case SET_WEATHER_DATA:
                return {
                    ...state,
                    weatherData: action.weatherData
                }
        case SET_BEDROOM_SIZE_NO_PERSIST:
            relocationData = Object.assign({}, state.relocationData)
            relocationData.currentBedroomCount = action.size
            return {
                    ...state,
                    relocationData: relocationData
                }
        case UPDATE_MOVE_DATE:
            relocationData = Object.assign({}, state.relocationData)
            relocationData.moveDate = action.moveDate
            return {
                ...state,
                relocationData: relocationData
            }
        case UPDATE_ACCEPT_DATE:
            relocationData = Object.assign({}, state.relocationData)
            relocationData.signedAgreementAt = action.date
            return {
                ...state,
                relocationData: relocationData
            }
        case UPDATE_STEP2_DATA:
            relocationData = Object.assign({}, state.relocationData)
            relocationData.currentAdultsCount = action.adults
            relocationData.currentKidsCount = action.kids
            return {
                ...state,
                relocationData: relocationData
            }
        case UPDATE_STEP3_DATA:
            relocationData = Object.assign({}, state.relocationData)
            relocationData.currentResidenceType = action.residenceType
            relocationData.currentBedroomCount = action.bedCount
            relocationData.setupCompleted = true
            return {
                ...state,
                relocationData: relocationData
            }
        case SET_ORIGIN_ADDRESS:
            relocationData = Object.assign({}, state.relocationData)
            relocationData.originAddressData = action.addressData

            return {
                    ...state,
                    relocationData: relocationData,
                }
        case SET_DEST_ADDRESS:
            relocationData = Object.assign({}, state.relocationData)
            relocationData.destinationAddressData = action.addressData
            return {
                    ...state,
                    relocationData: relocationData,
                }
        default:
            return state
    }
}

export const getRelocationDataSelector = ({ relocation }) => {
    return relocation.relocationData
}

export const getWeatherDataSelector = ({ relocation }) => {
    return relocation.weatherData
}

export const getOriginAddressSelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        return relocationData ? relocationData.originAddressData.data : null
    }
)

export const getDestinationAddressSelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        let address = null
        if (relocationData && relocationData.destinationAddressData) {
            address = relocationData.destinationAddressData.data
            address.id = relocationData.destinationAddressData.id
        }

        return address
    }
)

export const getStartDateSelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        return relocationData ? relocationData.startDate : null
    }
)

export const getMoveDateSelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        return relocationData ? relocationData.moveDate : null
    }
)

export const getBedroomCountSelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        return relocationData ? relocationData.currentBedroomCount : null
    }
)

export const getResidenceTypeSelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        return relocationData ? relocationData.currentResidenceType : null
    }
)

export const getInventoryItemCountSelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        return relocationData ? relocationData.totalItemsCount : null
    }
)

export const getCompanySelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        return relocationData ? relocationData.companyData.data : null
    }
)

export const getCompanyAddressSelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        return relocationData && relocationData.companyAddressData ?
            relocationData.companyAddressData.data : null
    }
)

export const getDestinationWeatherSelector = createSelector(
    getWeatherDataSelector,
    (weatherData) => {
        return weatherData ? weatherData : null
    }
)

export const getCounselorSelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        return relocationData && relocationData.relocationCounselorData ?
            relocationData.relocationCounselorData.data : null
    }
)

export const getHrContactSelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        return relocationData && relocationData.hrContactData ?
            relocationData.hrContactData.data : null
    }
)

export const getTransfereeSelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        return relocationData ? relocationData.transfereeData.data : null
    }
)

export const getSignedAgreementAtSelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        return relocationData ? relocationData.signedAgreementAt : null
    }
)

export const getSetupCompleteSelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        return relocationData ? relocationData.setupCompleted : null
    }
)

export const getCurrentAdultsSelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        return relocationData ? relocationData.currentAdultsCount : null
    }
)

export const getCurrentKidsSelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        return relocationData ? relocationData.currentKidsCount : null
    }
)

export const getCurrentResidenceTypeSelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        return relocationData ? relocationData.currentResidenceType : null
    }
)

export const getCurrentBedroomCountSelector = createSelector(
    getRelocationDataSelector,
    (relocationData) => {
        return relocationData ? relocationData.currentBedroomCount : null
    }
)

export default relocation;
