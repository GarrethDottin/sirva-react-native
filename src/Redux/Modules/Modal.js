import { createSelector } from 'reselect';

const OPEN_MODAL = 'OPEN_MODAL'
const OPEN_MODAL_CONFIG = 'OPEN_MODAL_CONFIG';
const CLOSE_MODAL = 'CLOSE_MODAL'

// action to push a modal into the state
export const openModalById = (modalId, overlayConfig,componentProps) => {
  return (dispatch)=> {
    dispatch(openModal({ modalId }))
  }
}

export const openModal = ({ modalId, overlayConfig = {}, componentProps = {} }) => {
  return {
    type: OPEN_MODAL_CONFIG,
    payload: {
      modalId,
      overlayConfig,
      componentProps
    }
  }
}

// pops a modal from the state
export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  }
}

const initialState = {
  modalStack: []
}

// reducer function to manage the modal state
export default function modal(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalStack: [...state.modalStack, { modalId: action.payload.modalId }]
      }
    case  OPEN_MODAL_CONFIG:
      return {
        ...state,
        modalStack: [...state.modalStack, action.payload]
      }
    case CLOSE_MODAL:
      return {
        ...state,
        modalStack: [...state.modalStack.filter((_, index) => index !== state.modalStack.length - 1)]
      }
    default:
      return state
  }
}

export const getModalStack = (state) => state.modal.modalStack

export const getActiveModal = createSelector([getModalStack], (stack) => stack[stack.length - 1]);
export const getActiveModalId = createSelector([getActiveModal], (activeModal) => {
  return activeModal ? activeModal.modalId : null
});
