import { combineReducers, createStore, applyMiddleware, compose  } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import authentication, { LOG_OFF } from './Modules/Authentication'
import relocation from './Modules/Relocation'
import nav from './Modules/Nav'
import inventory from './Modules/Inventory'
import moving from './Modules/Moving'
import modal from './Modules/Modal'
import systemMessaging from './Modules/SystemMessaging'
import offers from './Modules/Offers'
import packing from './Modules/Packing';
import lumpSum from './Modules/LumpSum'
import appState from './Modules/AppState'
import concierge from './Modules/Concierge'
import housing from './Modules/Housing'
import localization from './Modules/Localization'
import labor from './Modules/Labor'
import cityGuides from './Modules/CityGuides'
import schools from './Modules/Schools'
import analytics from './Modules/Analytics'
import systemWorking from './Modules/SystemWorking'
import feedback from './Modules/Feedback'
import errors from './Modules/Errors';
import drawer from './Modules/Drawer';
import tempHousing from './Modules/TempHousing';


import { AnalyticsMiddlewere } from './Analytics/Middleware';
import { reduxPersistWhiteList } from './ReduxPersistWhiteList'
import { composeWithDevTools } from 'redux-devtools-extension';

const appReducer = combineReducers({
    nav,
    authentication,
    relocation,
    inventory,
    moving,
    modal,
    systemMessaging,
    offers,
    packing,
    lumpSum,
    appState,
    concierge,
    housing,
    cityGuides,
    localization,
    labor,
    schools,
    analytics,
    feedback,
    errors,
    systemWorking,
    drawer,
    tempHousing,
})

const reduxLogoffWhiteList = ['localization'];

const rootReducer = (state, action) => {
    if (action.type === LOG_OFF) {
        state = Object.keys(state).reduce(function(accum, key) {
            if (reduxLogoffWhiteList.includes(key) || reduxPersistWhiteList.includes(key) || key == '_persist') {
                return {
                    ...accum,
                    [key]: state[key]
                }
            } else {
                return {
                    ...accum,
                    [key]: undefined
                };
            }
        }, {});
    }
    return appReducer(state, action);
}

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: reduxPersistWhiteList
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(
    persistedReducer,
    {},
    composeWithDevTools(
        applyMiddleware(thunk, AnalyticsMiddlewere)
    )
)
export const persistor = persistStore(store)
//persistor.purge()
