import { createSelector } from 'reselect';
import { getLocalizationForLanguage} from '../../Api/Localization'
import { retrieveAuthTokenFromDevice, unpackResponse } from '../../Api/Helper'
import { handleError } from './SystemMessaging'
import { addAsyncWorkingRequest, removeAsyncWorkingRequest} from './SystemWorking'
import { asyncLogOff } from './Authentication'

const SET_LOCALIZATION_DATA = 'SET_LOCALIZATION_DATA'

export const setLocalizationData = (languageJson) => {
    return {
        type: SET_LOCALIZATION_DATA,
        languageData: languageJson
    }
}

export const asyncGetLanguageData = () =>{
    return async function (dispatch) {
        try {
            dispatch(addAsyncWorkingRequest())
            const response = await getLocalizationForLanguage('en')
            //const response = tmpData

            dispatch(setLocalizationData(response))
        } catch(error) {
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

const initialState = {
    languageData: null
}

export default localization = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCALIZATION_DATA:
            return {
                    ...state,
                    languageData: action.languageData,
                }
        default:
            return state
    }
}

export const getLanguageDataSelector = (state, componentKey) => {
    return state.localization.languageData ?
        {
            ...state.localization.languageData['Global'],
            ...state.localization.languageData[componentKey],
        } :
        null
}

export const getLanguageDataForComponent = createSelector(
    getLanguageDataSelector,
    (languageData) => {
        return languageData
    }
)

export const getInlineOffersDataSelector = (state, key) => {
    return state.localization.languageData ?
        state.localization.languageData[`OffersInline_${key}`] :
        null
}
