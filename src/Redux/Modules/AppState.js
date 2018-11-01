import { createSelector } from 'reselect';
import { purgeStoredState } from 'redux-persist'

export const protipIdentifiers = {
    MqLandingScreen: 'MQ_LANDING',
    HomeScreen: 'HOME',
    HousingLandingScreen: 'HOUSING_LANDING',
    TempHousingIntroScreen: 'TEMP_HOUSING_INTRO',
    TempHousingExitScreen: 'TEMP_HOUSING_EXIT',
    FsQuoteListScreen: 'FS_QUOTE_LIST',
    TruckQuoteListScreen: 'TRUCK_QUOTE_LIST',
    AgentListScreen: 'AGENT_LIST',
    LaborLandingScreen: 'LABOR_LANDING'
}

const HOME_SCREEN_VIEW = 'HOME_SCREEN_VIEW'
const TEMP_HOUSING_INTRO_SCREEN_VIEW = 'TEMP_HOUSING_INTRO_SCREEN_VIEW'
const HOUSING_LANDING_SCREEN_VIEW = 'HOUSING_LANDING_SCREEN_VIEW'
const TEMP_HOUSING_EXIT_SCREEN_VIEW = 'TEMP_HOUSING_EXIT_SCREEN_VIEW'
const CONCIERGE_CLICKED = 'CONCIERGE_CLICKED'
const DISMISS_PROTIP = 'DISMISS_PROTIP'
const SET_EMAIL_KEY = 'SET_EMAIL_KEY'
const SET_INTRO_COMPLETED = 'SET_INTRO_COMPLETED'

export const homeScreenView = () => {
    return {
        type: HOME_SCREEN_VIEW,
    }
}

export const conciergeClicked = () => {
    return {
        type: CONCIERGE_CLICKED
    }
}

export const introCompleted = () => {
    return {
        type: SET_INTRO_COMPLETED
    }
}

export const tempHousingIntroScreenView = () => {
    return {
        type: TEMP_HOUSING_INTRO_SCREEN_VIEW
    }
}

export const housingLandingScreenView = () => {
    return {
        type: HOUSING_LANDING_SCREEN_VIEW
    }
}

export const tempHousingExitScreenView = () => {
    return {
        type: TEMP_HOUSING_EXIT_SCREEN_VIEW
    }
}

export const dismissProtip = (identifier) => {
    return {
        type: DISMISS_PROTIP,
        identifier
    }
}

export const setEmailKey = (email) => {
    const emailStripped = email.replace(/\W/g, '')
    return {
        type: SET_EMAIL_KEY,
        email: emailStripped
    }
}

const initialStateForEmail = {
    homeScreenView: false,
    conciergeClicked: false,
    introCompleted: false,
    tempHousingIntroScreenView: false,
    housingLandingScreenView: false,
    tempHousingExitScreenView: false,
    dismissedProtips: []
}

const initialState = {
    emailKeys: {},
    currentEmailKey: ''
}

export default appState = (state = initialState, action) => {
    const emailKeys = (state.emailKeys && Object.assign({}, state.emailKeys)) || {}

    switch (action.type) {
        case HOME_SCREEN_VIEW:
            if (emailKeys[state.currentEmailKey]) emailKeys[state.currentEmailKey].homeScreenView = true

            return {
                ...state,
                emailKeys: emailKeys
            }

        case TEMP_HOUSING_INTRO_SCREEN_VIEW:
            if (emailKeys[state.currentEmailKey]) emailKeys[state.currentEmailKey].tempHousingIntroScreenView = true

            return {
                ...state,
                emailKeys: emailKeys
            }

        case HOUSING_LANDING_SCREEN_VIEW:
            if(emailKeys[state.currentEmailKey]) emailKeys[state.currentEmailKey].housingLandingScreenView = true

            return {
                ...state,
                emailKeys: emailKeys
            }

        case TEMP_HOUSING_EXIT_SCREEN_VIEW:
            if(emailKeys[state.currentEmailKey]) emailKeys[state.currentEmailKey].tempHousingExitScreenView = true

            return {
                ...state,
                emailKets: emailKeys
            }

        case CONCIERGE_CLICKED:
            if (emailKeys[state.currentEmailKey]) emailKeys[state.currentEmailKey].conciergeClicked = true

            return {
                ...state,
                emailKeys: emailKeys
            }
        case SET_INTRO_COMPLETED:
            if (emailKeys[state.currentEmailKey]) emailKeys[state.currentEmailKey].introCompleted = true

            return {
                ...state,
                emailKeys: emailKeys
            }
        case DISMISS_PROTIP:
            let dismissedProtips = []
            if (emailKeys[state.currentEmailKey]) dismissedProtips = emailKeys[state.currentEmailKey].dismissedProtips

            dismissedProtips.push(action.identifier)
            emailKeys[state.currentEmailKey].dismissedProtips = dismissedProtips
            return {
                ...state,
                emailKeys: emailKeys
            }
        case SET_EMAIL_KEY:
            const email = action.email

            if (!emailKeys.hasOwnProperty(email)) {
                const initialEmailState = Object.assign({}, initialStateForEmail)
                emailKeys[email] = initialEmailState
            }
            return {
                ...state,
                currentEmailKey: email,
                emailKeys: emailKeys
            }
        case 'persist/REHYDRATE':
            console.log('action', action)
            const appState = action.payload && action.payload.appState
            const keys =  appState && action.payload.appState.emailKeys || {}
            const currentEmail = appState && action.payload.appState.currentEmailKey || ''

            return {
                ...state,
                emailKeys: keys,
                currentEmailKey: currentEmail
            }

        default :
            return state
    }
}

export const getAppState = ({ appState }) => appState

export const getHomeScreenView = ({ appState }) => {
    //const appState = state.appState
    const email = appState.currentEmailKey
    let viewed = false

    if (appState.emailKeys[email]) {
        viewed = appState.emailKeys[email].homeScreenView
    }

    return viewed
}

export const getTempHousingIntroScreenView = ({ appState }) => {
    const email = appState.currentEmailKey
    let viewed = false

    if (appState.emailKeys[email]) {
        viewed = appState.emailKeys[email].tempHousingIntroScreenView
    }

    return viewed
}

export const getHousingLandingScreenView = ({ appState }) => {
    const email = appState.currentEmailKey
    let viewed = false

    if (appState.emailKeys[email]) {
        viewed = appState.emailKeys[email].housingLandingScreenView
    }
}

export const getTempHousingExitScreenView = ({ appState }) =>  {
    const email = appState.currentEmailKey
    let viewed = false

    if(appState.emailKeys[email]) {
        viewed = appState.emailKeys[email].tempHousingExitScreenView
    }
}

export const getConciergeClicked = ({ appState }) => {
    const email = appState.currentEmailKey
    let clicked = false

    if (!appState.emailKeys) {
        return clicked
    }

    if (appState.emailKeys[email]) {
        clicked = appState.emailKeys[email].conciergeClicked
    }

    return clicked
}

export const getIntroCompleted = createSelector(
    getAppState,
    (appState) => {
        const email = appState.currentEmailKey
        let introCompleted = false

        if (appState.emailKeys[email]) {
            introCompleted = appState.emailKeys[email].introCompleted
        }
        return introCompleted
    }
)

export const getProtipDismissedSelector = (identifier, { appState } ) => {
    const email = appState.currentEmailKey
    let dismissedProtips = []

    if (!appState.emailKeys) {
        return false
    }

    if (appState.emailKeys[email]) {
        dismissedProtips = appState.emailKeys[email].dismissedProtips ?
            appState.emailKeys[email].dismissedProtips : []
    }

    return dismissedProtips.includes(identifier)
}
