import { AsyncStorage } from 'react-native'
import { dsKeyAuthToken, feedbackCounter, feedbackNeverShow } from '../../Config/Constants'
import { submitFeedback, submitMood, submitFeedbackAndMood } from '../../Api/Feedback'
import { openModalById, closeModal } from './Modal'

import { navigate } from '../../Redux/Modules/Routing';


// get location where moddtracker is openeing from
export const getFeedbackText = (state) => state.feedback;


// Submit text only user feedback
export const submitUserFeedback = (userFeedbackText) => {
  return async function (dispatch) {
    try {
      const token = await AsyncStorage.getItem(dsKeyAuthToken)
      if (token !== null) {
        const response = submitFeedback(userFeedbackText, token)
        if (response) {
          dispatch(navigate({ routeName: "ThankYouFeedback" }))
        }
      }
    }
    catch (e) {
      console.error(e)
    }
  }
}
export const submitUserFeedbackAndMood = (userFeedbackText, mood) => {
  return async function (dispatch) {
    try {
      const token = await AsyncStorage.getItem(dsKeyAuthToken)
      if (token !== null) {
        const response = submitFeedbackAndMood(userFeedbackText, mood, token)
        if (response) {
          navigate({ routeName: "ThankYouFeedback" })
        }
      }
    }
    catch (e) {
      console.error(e)
    }
  }
}

// Submit user mood feedback
export const submitUserMood = (userMood) => {
  return async function (dispatch) {
    try {
      const token = await AsyncStorage.getItem(dsKeyAuthToken)
      if (token !== null) {
        const response = await submitMood(userMood, token)
        dispatch(closeModal())
      }
    }
    catch (e) {
      console.error(e)
    }
  }
}


const setStorageValue = (key,value) =>{
  AsyncStorage.setItem(key, value).then((e) => {
    if (e !== null) {
      console.error(e)
    } else {
    }
  })  
}

// checks if the user should receive a modal asking for feedback
export const checkForFeedback = (location) => {
  return async function (dispatch) {
    try {
      const key = await AsyncStorage.getItem(location)
      const showModal = await AsyncStorage.getItem(feedbackNeverShow, (err, result) => {
        return result
      });
      if (!showModal){
       if (key === null) {
          setStorageValue(location,'0')
          dispatch(openModalById("feedback"))
        }
      }

    }
    catch (e) {
      console.error(e)
    }
  }
}

// dont show mood tracker if set
export const setHideMoodTracker = () =>{
  try {
     AsyncStorage.setItem(feedbackNeverShow, "true");
  } catch (error) {
    // Error saving data
  }
  return null

  
}


const SET_FEEDBACK_LOCATION_TEXT = 'SET_FEEDBACK_LOCATION_TEXT'

const initialState = {
  title: null,
  text: null,
}

// mood tracker Reducer
const feedback = (state = initialState, action) => {
  switch (action.type) {
    case SET_FEEDBACK_LOCATION_TEXT:
      return {
        ...state,
        title:action.title,
        text:action.text,
      }
    default:
      return state
  }
}

export default feedback;

// set location of modal to get text
export const setFeedbackLocationText = (title,text) => {
  return {
    type: SET_FEEDBACK_LOCATION_TEXT,
    title,
    text
  }
}
