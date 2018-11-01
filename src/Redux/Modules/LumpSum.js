import { verifyRoutingNumber, submitAchTransferRequest, getAchTransfer } from '../../Api/LumpSum'
import { retrieveAuthTokenFromDevice, unpackResponse } from '../../Api/Helper'
import { asyncLogOff } from './Authentication'
import { handleError } from './SystemMessaging'
import { addAsyncWorkingRequest, removeAsyncWorkingRequest} from './SystemWorking'
import { ErrorCodes } from '../../Config/ErrorCodes'

import { navigate } from '../../Redux/Modules/Routing'

const SET_ROUTING_BANK = 'SET_ROUTING_BANK'
const SET_TRANSFER_DATA = 'SET_TRANSFER_DATA'
export const SUBMIT_TRANSFER = 'SUBMIT TRANSFER';
export const SUBMIT_TRANSFER_SUCCESS = 'SUBMIT TRANSFER SUCCESS';
export const SUBMIT_TRANSFER_ERROR = 'SUBMIT TRANSFER ERROR';

export const setRoutingBank = (bankName) => {
    return {
        type: SET_ROUTING_BANK,
        bankName: bankName
    }
}

export const setTransferData = (transferData) => {
    return {
        type: SET_TRANSFER_DATA,
        transferData: transferData
    }
}

export const asyncVerifyRoutingNumber = (routingNumber) => {
    return async function (dispatch) {
        try {
            if (routingNumber.length === 9) {
                const token = await retrieveAuthTokenFromDevice()
                const response = await verifyRoutingNumber(routingNumber, token)
                const data = unpackResponse(response)

                dispatch(setRoutingBank(data.bankName))
            } else {
                dispatch(setRoutingBank(null))
            }
            
        } catch(error) {
            dispatch(setRoutingBank(null))
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(ErrorCodes['routing_number_invalid'])
            )
        }
    }
}

export const asyncGetTransfer = () =>{
    return async function (dispatch) {
        try {
            dispatch(addAsyncWorkingRequest())

            const token = await retrieveAuthTokenFromDevice()
            const response = await getAchTransfer(token)
            const data = response.data === null ? { } : unpackResponse(response)
            dispatch(setTransferData(data))
        } catch(error) {
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const asyncSubmitTransfer = (routingNumber, accountNumber) =>{
    return async function (dispatch) {
        dispatch({ type: SUBMIT_TRANSFER });
        try {
            dispatch(addAsyncWorkingRequest())

            const token = await retrieveAuthTokenFromDevice()
            const response = await submitAchTransferRequest(routingNumber, accountNumber, token)
            const data = unpackResponse(response)

            dispatch(setTransferData(data))
            dispatch({ type: SUBMIT_TRANSFER_SUCCESS, data });
            dispatch(navigate({ routeName: 'LumpSumStatus' }))
        } catch(error) {
            dispatch({ type: SUBMIT_TRANSFER_ERROR });
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

const initialState = {
    bankName: null,
    submitting: false,
    transferData: null
}

//Relocation Reducer
const lumpSum = (state = initialState, action) => { 
    switch (action.type) {
        case SET_ROUTING_BANK:  
            return {
                    ...state,
                    bankName: action.bankName,
                }
        case SET_TRANSFER_DATA:
            return {
                ...state,
                transferData: action.transferData
            }
        default:
            return state
    }
}

export default lumpSum;