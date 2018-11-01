import { createSelector } from 'reselect'

const SET_DRAWER_STATE = "SET_DRAWER_STATE"

export const setDrawerState = (drawerState) => {
  return {
    type: SET_DRAWER_STATE,
    drawerState
  }
}


export const getDrawerState = (state)=>{
  return state.drawer.isDrawerOpen
}
const initialDrawerState = {
  isDrawerOpen: false
}

const drawer = (state = initialDrawerState, action) => {
  switch (action.type) {
    case SET_DRAWER_STATE:
      return {
        ...state,
        isDrawerOpen: action.drawerState
      }
    default:
      return state
  }
}
export default drawer