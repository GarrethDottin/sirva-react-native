import { createSelector } from 'reselect';
import { ErrorCodes, DefaultErrorCode } from '../../Config/ErrorCodes'
import * as fromErrors from './Errors';
import * as fromModal from './Modal';

const HANDLE_ERROR = 'HANDLE_ERROR'
const HANDLE_NONMODAL_ERROR = 'HANDLE_NONMODAL_ERROR'
const HANDLE_SUCCESS = 'HANDLE_SUCCESS'
const HANDLE_NONMODAL_SUCCESS = 'HANDLE_NONMODAL_SUCCESS'
const DISMISS_MESSAGE = 'DISMISS_MESSAGE'

export const handleError = (error) => {
    return (dispatch) => {
        console.log('error', error)
        let message = ErrorCodes[DefaultErrorCode]
        if (typeof error === 'string') {
            message = error
        } else if (typeof error === 'object') {
            if (error.hasOwnProperty('errorCodes')) {
                const code = error.errorCodes[0].code
                if (ErrorCodes.hasOwnProperty(code)) {
                    message = ErrorCodes[code]
                }
            }
        }

        if (error.errorCode == 'server_error') {
            dispatch(
                fromErrors.serverError()
            )
        } else if (error.errorCode == 'connection_error') {
            dispatch(
                fromErrors.connectionError()
            )
        } else {
            dispatch({ type: HANDLE_ERROR, message: message, visible: (message !== '')})
            dispatch(fromModal.openModal({
                modalId: 'SystemMessage',
                overlayConfig: { verticalAlignment: 'bottom', isOverlayBlocking: true }
            }))
        }
    }
}

export const handleErrorNonModal = (error) => {
    return (dispatch) => {
        let message = ErrorCodes[DefaultErrorCode]
        if (typeof error === 'string') {
            message = error
        } else if (typeof error === 'object') {
            if (error.hasOwnProperty('errorCodes')) {
                const code = error.errorCodes[0].code
                if (ErrorCodes.hasOwnProperty(code)) {
                    message = ErrorCodes[code]
                }
            }
        }

        dispatch({ type: HANDLE_NONMODAL_ERROR, message: message, visible: (message !== '') })
        dispatch(fromModal.openModal({
            modalId: 'SystemMessage',
            overlayConfig: { verticalAlignment: 'bottom', isOverlayBlocking: false, dismissTimeout: 3000 }
        }))
    }
}

export const handleSuccess = (message) => {
    return (dispatch)=> {
        dispatch({ type: HANDLE_SUCCESS, message: message, visible: (message !== '') });
        dispatch(fromModal.openModal({ modalId: 'SystemMessage', overlayConfig: { verticalAlignment: 'bottom', isOverlayBlocking: true } }));
    }
}

export const handleSuccessNonModal = (message) => {
    return (dispatch) => {
        dispatch({ type: HANDLE_NONMODAL_SUCCESS, message: message, visible: (message !== '') });
        dispatch(fromModal.openModal({ modalId: 'SystemMessage', overlayConfig: { verticalAlignment: 'bottom', isOverlayBlocking: false, dismissTimeout: 3000 } }));
    }
}

export const dismissMessage = () => {
    return (dispatch) => {
        dispatch({ type: DISMISS_MESSAGE, message: '', visible: false });
        dispatch(fromModal.closeModal());
    }
}

const initialState = {
    message: '',
    visible: false,
}

// reducer function to manage the modal state
export default function systemMessaging(state = initialState, action) {
    switch (action.type) {
        case HANDLE_ERROR:
            return {
                ...state,
                message: action.message,
                visible: action.visible,
                isSuccess: false,
                nonModal: false,
                showDismissLink: true
            }
        case HANDLE_NONMODAL_ERROR:
            return {
                ...state,
                message: action.message,
                visible: action.visible,
                isSuccess: false,
                nonModal: true,
                showDismissLink: false
            }
        case HANDLE_SUCCESS:
            return {
                ...state,
                message: action.message,
                visible: action.visible,
                isSuccess: true,
                nonModal: false,
                showDismissLink: true
            }
        case HANDLE_NONMODAL_SUCCESS:
            return {
                ...state,
                message: action.message,
                visible: action.visible,
                isSuccess: true,
                nonModal: true,
                showDismissLink: false
            }
        case DISMISS_MESSAGE:
            return {
                ...state,
                message: action.message,
                visible: action.visible,
            }
        default:
            return state
    }
}


export const getMessage = (state) => state.systemMessaging.message;
export const isSuccess = (state) => state.systemMessaging.isSuccess;
export const shouldShowDismissLink = (state)=> state.systemMessaging.showDismissLink;
