import { AsyncStorage } from 'react-native'
import { dsKeyAuthEmail, dsKeyAuthToken } from '../../Config/Constants'
import { unpackResponse } from '../../Api/Helper'
import { loginUser, verifyLoginToken, verifyAccount,
    setPassword, resetPasswordRequest,
    verifyPasswordRequest, resetPassword } from '../../Api/Auth'
import { checkForFeedback } from './Feedback'
import { asyncFetchRelocationData, getSignedAgreementAtSelector, getSetupCompleteSelector } from './Relocation'
import { asyncTrackEvent, EVENT_NAMES } from './Analytics'
import { setEmailKey, introCompleted, getIntroCompleted } from './AppState'
import { handleError, handleSuccess } from './SystemMessaging'
import { addAsyncWorkingRequest, removeAsyncWorkingRequest} from './SystemWorking'
import { reduxPersistWhiteList } from '../../Redux/ReduxPersistWhiteList'

import { navigate } from '../../Redux/Modules/Routing';

export const IS_AUTHENTICATED = 'IS_AUTHENTICATED'
export const LOG_OFF = 'LOG_OFF'
const SET_CREDENTIALS = 'SET_CREDENTIALS'
const START_AUTH_CHECK = 'START_AUTH_CHECK';
const AUTH_CHECKED = 'AUTH_CHECKED';

export const isAuthenticated = (token) => {
    return {
        type: IS_AUTHENTICATED,
        token: token
    }
}

export const logOff = () => {
    return {
        type: LOG_OFF
    }
}

//used to pass universal link credentials from intro to login screen
export const setCredentials = (email, password) => {
    return {
        type: SET_CREDENTIALS,
        data: {
            email: email,
            password: password
        }
    }
}

export const authChecked = (isAuthenticated) => {
    return {
        type: AUTH_CHECKED,
        data: {
            isAuthenticated
        }
    }
}

const initialState = {
    isAuthenticated: false,
    isLoggingIn: false,
    isAuthChecked: false,
    token: '',
    email: '',
    password: '',
}

export const checkAuth = ()=> {
    return async function (dispatch) {
        //AsyncStorage.removeItem(dsKeyAuthToken)
        try {
            const token = await AsyncStorage.getItem(dsKeyAuthToken);

            if (token === null) {
                dispatch(authChecked(false));
            } else {
                try {
                    const response = await verifyLoginToken(token);
                    dispatch(authChecked(true))
                    dispatch(isAuthenticated(token))
                } catch (error) {
                    dispatch(authChecked(false))
                    //dispatch(handleError(error))
                    dispatch(
                        error.responseStatus !== 401 && handleError(error)
                    )
                }
            }
        } catch (error) {
            dispatch(authChecked(false))
        }
    }
}

export const asyncCheckAuth = () => {
    //AsyncStorage.removeItem(dsKeyAuthToken)
    return async function (dispatch, getState) {
        try {
            const token = await AsyncStorage.getItem(dsKeyAuthToken)

            console.log('asyncCheckAuth token', token)
            if (token === null) {
                const redirectTo = getIntroCompleted(getState()) ? 'Login' : 'Intro'

                dispatch(navigate({ routeName: redirectTo }))
            } else {
                const response = await verifyLoginToken(token)

                await dispatch(isAuthenticated(token))
                await dispatch(asyncFetchRelocationData())
                await dispatch(checkForFeedback())
                redirectOnAppOpen(dispatch, getState())
                //dispatch(NavigationActions.navigate({ routeName: 'App' }))
            }
        } catch (error) {
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        }
    }
}

export const asyncLoginWithToken = (token) => {
    //PENDING: If token expiry is added, need to async this to check if auth is stale
    return async (dispatch, getState) => {
        await dispatch(isAuthenticated(token))
        await dispatch(asyncFetchRelocationData())
        redirectOnAppOpen(dispatch, getState())
    }
}

export const asyncLoginWithCreds = (email, password) => {
    return async function (dispatch, getState) {

        try {
            dispatch(addAsyncWorkingRequest())

            const response = await loginUser(email, password)
            const data = unpackResponse(response)

            await AsyncStorage.setItem(dsKeyAuthEmail, email)
            await AsyncStorage.setItem(dsKeyAuthToken, data.token)
            dispatch(isAuthenticated(data.token))

            await dispatch(asyncFetchRelocationData())
            dispatch(setEmailKey(email))
            dispatch(introCompleted())

            redirectOnAppOpen(dispatch, getState())
        } catch (error) {
            //look for verification needed error and redirect to register page
            if (typeof error === 'object' &&
                error.hasOwnProperty('errorCodes') &&
                error.errorCodes[0].code === 'verification_needed') {
                dispatch(navigate({ routeName: 'Register', params: { email: email, password: password } }))
            } else {
                dispatch(handleError(error))
            }
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const asyncVerifyAccount = (email, password, phone) => {
    return async function (dispatch) {
        try {
            dispatch(addAsyncWorkingRequest())

            const response = await verifyAccount(email, password, phone)
            const data = unpackResponse(response)

            await AsyncStorage.setItem(dsKeyAuthToken,  data.token)

            await dispatch(asyncFetchRelocationData())
            dispatch(setEmailKey(email))
            dispatch(isAuthenticated(data.token))
            dispatch(navigate({ routeName: 'TermsOfUse' }))
            
        } catch (error) {
            dispatch(handleError(error))
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const asyncLogOff = () => {
    return async function (dispatch, getState) {
        await AsyncStorage.removeItem(dsKeyAuthEmail)
        await AsyncStorage.removeItem(dsKeyAuthToken)

        dispatch(navigate({ routeName: 'Login' }))
        dispatch(logOff())
    }
}

export const asyncForgotPassword = (email) => {
    return async function (dispatch) {
        try {
            dispatch(addAsyncWorkingRequest())

            await resetPasswordRequest(email)

            dispatch(navigate({ routeName: 'ForgotPasswordSuccess' }))
        } catch (error) {
            dispatch(handleError(error))
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const asyncSetPassword = (password) => {
    return async function (dispatch) {
        try {
            dispatch(addAsyncWorkingRequest())

            const token = await AsyncStorage.getItem(dsKeyAuthToken)

            if (token !== null) {
                await setPassword(password, token)

                dispatch(navigate({ routeName: 'RepaymentAgreement' }))
            }
        } catch (error) {
            dispatch(handleError(error))
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const asyncVerifyResetPassword = (token) => {
    return async function (dispatch) {
        try {
            dispatch(addAsyncWorkingRequest())
            if (token !== null) {
                await verifyPasswordRequest(token)
                dispatch(navigate({ routeName: 'ResetPassword' }))
            }
        } catch (error) {
            dispatch(navigate({ routeName: 'ForgotPassword' }))
            dispatch(handleError(error))
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const asyncResetPassword = (password, token) => {
    return async function (dispatch) {
        try {
            dispatch(addAsyncWorkingRequest())

            if (token !== null) {
                dispatch(asyncTrackEvent({
                    name: EVENT_NAMES.reset_password,
                    metadata: {
                        screen: 'Reset Password Screen',
                        action: EVENT_NAMES.reset_password
                    }})
                )

                await resetPassword(password, token)
                dispatch(navigate({ routeName: 'Login' }))
                dispatch(handleSuccess('Your password has been reset successfully.'))
            }
        } catch (error) {
            dispatch(handleError(error))
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

const redirectOnAppOpen = (dispatch, state) => {
    const signedAgreementAt = getSignedAgreementAtSelector(state)
    const setupComplete = getSetupCompleteSelector(state)
    dispatch(navigate({ routeName: 'Authenticated' }))
}

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case AUTH_CHECKED:
            return {
                ...state,
                isAuthChecked: true,
                isAuthenticated: action.data.isAuthenticated
            }
        case IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true,
                isLoggingIn: false,
                token: action.token,
            }
        case LOG_OFF:
            return {
                ...state,
                isAuthenticated: false,
                isLoggingIn: true,
                token: null,
            }
        case SET_CREDENTIALS:
            return {
                ...state,
                email : action.data.email,
                password : action.data.password,
            }
        default:
            return state
    }
}
