import { createSelector } from 'reselect';
import { ErrorCodes, DefaultErrorCode } from '../../Config/ErrorCodes'
import * as fromModal from './Modal';

const INCREMENT_REQUEST_COUNT = 'INCREMENT_REQUEST_COUNT'
const DECREMENT_REQUEST_COUNT = 'DECREMENT_REQUEST_COUNT'

export const addAsyncWorkingRequest = (message=null) => {
    return {
        type: INCREMENT_REQUEST_COUNT,
        message
    }
}

export const removeAsyncWorkingRequest = (message=null) => {
    return {
        type: DECREMENT_REQUEST_COUNT,
        message
    }
}

const initialState = {
    messages: [],
    requestCount: 0,
    visible: false,
}

// reducer function to manage the modal state
export default function systemWorking(state = initialState, action) {
    let requestCount, messages

    switch (action.type) {
        case INCREMENT_REQUEST_COUNT:
            requestCount = state.requestCount + 1
            
            messages = state.messages.slice(0)
            messages.push(action.message)
            
            return {
                ...state,
                requestCount,
                messages,
            }
        case DECREMENT_REQUEST_COUNT:
            requestCount = state.requestCount - 1
            messages = state.messages.slice(0)

            toRemoveIdx = state.messages.lastIndexOf(action.message)
            if (toRemoveIdx > -1) {
                messages.splice(toRemoveIdx, 1)
            }

            return {
                ...state,
                requestCount,
                messages,
            }
        default:
            return state
    }
}


export const getSystemWorkingSelector = ({ systemWorking }) => {
    return systemWorking
}

export const getIsVisibleSelector = createSelector(
    getSystemWorkingSelector,
    (systemWorking) => {
        return systemWorking.requestCount > 0
    }
)

export const getMessageSelector = createSelector(
    getSystemWorkingSelector,
    (systemWorking) => {
        const msgs = systemWorking.messages

        return msgs.length > 0 ? msgs[msgs.length - 1] : null
    }
)
