import { NetInfo } from 'react-native';
import { createSelector } from "../../../node_modules/reselect";

const ADD_ERROR = 'ADD ERROR';
const RESET_ERROR = 'RESET ERROR';

export const addError = (error) => {
  return {
    type: ADD_ERROR,
    error: error
  }
}

export const setupConnectionCheck = ()=> {
  return function (dispatch) {
    function checkConnection(isConnected) {
      if (isConnected) {
        dispatch(resetError())
      } else {
        dispatch(connectionError());
      }
    }
    NetInfo.isConnected.addEventListener('connectionChange', checkConnection)
  }
}

export const serverError = () => {
  return addError('server_error');
}

export const connectionError = () => {
  return addError('connection_error');
}

export const resetError = () => {
  return {
    type: RESET_ERROR
  }
}

const initialState = {
  error: null
}

export default (state = initialState, action) => {
  const { type, error } = action;
  
  switch(type) {
    case ADD_ERROR:
      return {
        ...state,
        error
      }
    case RESET_ERROR:
      return initialState
    default:
      return state
  }
}

export const getErrorsState = (state) => {
  return state.errors;
}

export const hasConnectionError = createSelector(
  getErrorsState,
  (errors) => {
    return errors.error == 'connection_error'
  }
)

export const hasServerError = createSelector(
  getErrorsState,
  (errors) => {
    return errors.error == 'server_error'
  }
)
