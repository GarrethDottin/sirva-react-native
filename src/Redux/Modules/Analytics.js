import Config from 'react-native-config';
import {
    GoogleAnalyticsTracker
} from 'react-native-google-analytics-bridge';

let tracker = new GoogleAnalyticsTracker(Config.GA_TRACKING_ID);

export const EVENT_NAMES = {
    login: 'USER LOGIN',
    concierge_called: 'CONCIERGE CALLED',
    reset_password: 'RESET PASSWORD'
}

/*
METADATA KEYS (need to be whitelisted on the server)

    screen,
    action,
    timestamp
*/

const TRACK_EVENT = 'TRACK_EVENT'

export const trackEvent = (name, metadata = {}) => {
    return {
        type: TRACK_EVENT,
        name,
        metadata
    }
}

export const trackScreenView = (screenName) => {
    return (_) => {
        tracker.trackScreenView(screenName);
    }
}

export const asyncTrackEvent = ({ name, metadata = {} }) => {
    return async function (_) {
        const { category, action } = metadata;
        if (category && action) {
            tracker.trackEvent(category, action);
        }
    }
}

export const asyncTrackCallConciergeEvent = (screen) => {
    return asyncTrackEvent({
        name: EVENT_NAMES.concierge_called,
        metadata: {
            screen,
            category: 'Suport',
            action: EVENT_NAMES.concierge_called
        }
    })
}

getFormattedDateTime = () => {
    const currentdate = new Date();
    let datetime = (currentdate.getMonth() + 1) + "/"
                + currentdate.getDate() + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

    return datetime;
}

const initialState = {}

// reducer function to manage the modal state
export default function analytics(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}
