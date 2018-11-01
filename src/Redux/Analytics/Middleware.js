import { asyncTrackEvent } from '../Modules/Analytics';
import * as fromRouting from '../Modules/Routing';
import * as fromConcierge from '../Modules/Concierge';
import * as fromAuth from '../Modules/Authentication';
import * as fromMoving from '../Modules/Moving';
import * as fromLabor from '../Modules/Labor';
import * as fromPacking from '../Modules/Packing';
import * as fromHousing from '../Modules/Housing';
import * as fromTempHousing from '../Modules/TempHousing';
import * as fromLumpSum from '../Modules/LumpSum';

const EVENT_NAMES = {
    login: 'USER LOGIN',
    concierge_called: 'CONCIERGE CALLED',
    reset_password: 'RESET PASSWORD',
    moving_quotes_request: 'Moving Quotes Request',
    startLaborPurchase: 'Start Labor Purchase',
    completeLaborPurchase: 'Complete labor purchase',
    startPackingMaterialsPurchase: 'Start Packing Materials Purchase',
    completePackingMaterialsPurchase: 'Complete Packing Materials Purchase',
    requestRealtor: 'Request realtor',
    requestRealtorSuccess: 'Request realtor success',
    requestRealtorError: 'Request realtor error',
    requestTempHousing: 'Request temp housing',
    requestTempHousingSuccess: 'Request temp housing success',
    requestTempHousingError: 'Request temp housing error',
    submitTransferRequest: 'Submit transfer request',
    transferRequestSuccess: 'Transfer Request Success',
    transferRequestError: 'Transfer Request Error'
}

const trackedEvents = {
    [fromAuth.IS_AUTHENTICATED]: {
        name: EVENT_NAMES.login,
        metadata: {
            screen: 'Login Screen',
            category: 'Auth',
            action: EVENT_NAMES.login
        }
    },
    [fromConcierge.SEND_CONCIERGE_MESSAGE_SUCCESS]: {
        name: EVENT_NAMES.concierge_called,
        metadata: {
            screen: 'Concierge Modal',
            category: 'Suport',
            action: EVENT_NAMES.concierge_called
        }
    },
    [fromMoving.QUOTE_REQUEST_SUBMITTED]: {
        name: EVENT_NAMES.moving_quotes_request,
        metadata: {
            screen: 'Moving Quote Estimate Detail',
            category: 'Moving Quotes',
            action: EVENT_NAMES.moving_quotes_request
        }
    },
    [fromLabor.START_PURCHASE]: {
        name: EVENT_NAMES.startLaborPurchase,
        metadata: {
            screen: 'Labor Review Page',
            category: 'Labor',
            action: EVENT_NAMES.startLaborPurchase
        }
    },
    [fromLabor.COMPLETE_PURCHASE]: {
        name: EVENT_NAMES.completeLaborPurchase,
        metadata: {
            screen: 'Labor Review Page',
            category: 'Labor',
            action: EVENT_NAMES.completeLaborPurchase
        }
    },
    [fromPacking.START_PURCHASE]: {
        name: EVENT_NAMES.startPackingMaterialsPurchase,
        metadata: {
            screen: 'Packing Material Detail Page',
            category: 'Packing Materials',
            action: EVENT_NAMES.startPackingMaterialsPurchase
        }
    },
    [fromPacking.COMPLETE_PURCHASE]: {
        name: EVENT_NAMES.completePackingMaterialsPurchase,
        metadata: {
            screen: 'Packing Material Detail Page',
            category: 'Packing Materials',
            action: EVENT_NAMES.completePackingMaterialsPurchase
        }
    },
    [fromHousing.REQUEST_REALTOR]: {
        name: EVENT_NAMES.requestRealtor,
        metadata: {
            screen: 'Realtor Agent detail page',
            category: 'Real Estate',
            action: EVENT_NAMES.requestRealtor
        }
    },
    [fromHousing.REQUEST_REALTOR_SUCCESS]: {
        name: EVENT_NAMES.requestRealtorSuccess,
        metadata: {
            screen: 'Realtor Agent detail page',
            category: 'Real Estate',
            action: EVENT_NAMES.requestRealtorSuccess
        }
    },
    [fromTempHousing.REQUEST_TEMP_HOUSING]: {
        name: EVENT_NAMES.requestTempHousing,
        metadata: {
            screen: 'Temp housing request screen',
            category: 'Temp Housing',
            action: EVENT_NAMES.requestTempHousing
        }
    },
    [fromTempHousing.REQUEST_TEMP_HOUSING_SUCCESS]: {
        name: EVENT_NAMES.requestTempHousingSuccess,
        metadata: {
            screen: 'Temp housing request screen success',
            category: 'Temp Housing',
            action: EVENT_NAMES.requestTempHousingSuccess
        }
    },
    [fromTempHousing.REQUEST_TEMP_HOUSING_ERROR]: {
        name: EVENT_NAMES.requestTempHousingError,
        metadata: {
            screen: 'Temp housing request screen error',
            category: 'Temp Housing',
            action: EVENT_NAMES.requestTempHousingError
        }
    },
    [fromLumpSum.SUBMIT_TRANSFER]: {
        name: EVENT_NAMES.submitTransferRequest,
        metadata: {
            screen: 'Ach transfer request',
            category: 'Lump Sum',
            action: EVENT_NAMES.submitTransferRequest
        }
    },
    [fromLumpSum.SUBMIT_TRANSFER_SUCCESS]: {
        name: EVENT_NAMES.transferRequestSuccess,
        metadata: {
            screen: 'Ach transfer request success',
            category: 'Lump Sum',
            action: EVENT_NAMES.transferRequestSuccess
        }
    },
    [fromLumpSum.SUBMIT_TRANSFER_ERROR]: {
        name: EVENT_NAMES.transferRequestError,
        metadata: {
            screen: 'Ach transfer request error',
            category: 'Lump Sum',
            action: EVENT_NAMES.transferRequestError
        }
    }
}

const trackEvent = (event_or_fn, store) => {
    let event = event_or_fn;
    if (typeof event_or_fn === 'function') {
        // This allows us to have events that need data from the store
        event = event_or_fn(store.getState());
    }
    store.dispatch(asyncTrackEvent(event));
}

export const AnalyticsMiddlewere = store => next => action => {
    const event = trackedEvents[action.type];
    if (event) {
        trackEvent(event, store);
    }

    return next(action);
}
