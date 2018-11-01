import { AsyncStorage } from 'react-native'
import { dsKeyAuthToken } from '../../Config/Constants'
import { submitEmail } from '../../Api/Concierge'
import { closeModal } from './Modal'
import { handleSuccessNonModal } from './SystemMessaging'

const SHOW_BELL = 'SHOW_BELL'
const HIDE_BELL = 'HIDE_BELL'
const SHOW_MODAL = 'SHOW_MODAL'
const HIDE_MODAL = 'HIDE_MODAL'

export const SEND_CONCIERGE_MESSAGE = 'SEND CONCIERGE MESSAGE';
export const SEND_CONCIERGE_MESSAGE_SUCCESS = 'SEND CONCIERGE MESSAGE SUCCESS';
const TOGGLE_WORKING = 'TOGGLE_WORKING'

export const showBell = () => {
    return {
        type: SHOW_BELL
    }
}

export const hideBell = () => {
    return {
        type: HIDE_BELL
    }
}

export const toggleWorking = (turnOn) => {
    return {
        type: TOGGLE_WORKING,
        working: turnOn
    }
}

const sendConciergeMessage = () => {
    return {
        type: SEND_CONCIERGE_MESSAGE
    }
}

const sendConciergeMessageSuccess = () => {
    return {
        type: SEND_CONCIERGE_MESSAGE_SUCCESS
    }
}

export const asyncSubmitEmail = (emailText) => {
    return async function (dispatch) {
        dispatch(sendConciergeMessage())
        try {  
            const token = await AsyncStorage.getItem(dsKeyAuthToken)
            const response = await submitEmail(emailText, token)
            dispatch(sendConciergeMessageSuccess())
            dispatch(closeModal())
            dispatch(handleSuccessNonModal('Your email was successfully sent!'))
        } catch(error){
            console.error(error)
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        }
    }
}

const initialState = {
    message: '',
    visible: false,
    modalVisible: false,
    working: false,
}

// reducer function to manage the modal state
export default function concierge(state = initialState, action) {
    switch (action.type) {
        case SHOW_BELL:
            return {
                ...state,
                visible: true
            }
        case HIDE_BELL:
            return {
                ...state,
                visible: false
            }
        case TOGGLE_WORKING:
            return {
                ...state,
                working: action.working
            }
        case SEND_CONCIERGE_MESSAGE: 
            return {
                ...state,
                working: true
            }
        case SEND_CONCIERGE_MESSAGE_SUCCESS:
            return {
                ...state,
                working: false
            }
        default:
            return state
    }
}
