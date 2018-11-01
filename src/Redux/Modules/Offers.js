import { createSelector } from 'reselect';
import { AsyncStorage } from 'react-native'
import { dsKeyAuthToken } from '../../Config/Constants'
import { retrieveAuthTokenFromDevice } from '../../Api/Helper'
import { getOffers } from '../../Api/Offers'
import { addAsyncWorkingRequest, removeAsyncWorkingRequest } from './SystemWorking'
import { handleError } from './SystemMessaging';

export const SET_OFFERS = "[OFFERS] SET_OFFERS"
export const SELECTED_CATEGORY = "[OFFERS] SELECTED_CATEGORY"

// fetches all the offers
export const asyncFetchOffers = () => {
    return async function (dispatch, getState) {
        try {
            dispatch(addAsyncWorkingRequest())

            const token = await AsyncStorage.getItem(dsKeyAuthToken)
            if (token !== null) {
                const response = await getOffers(token)
                dispatch(setOffers(response.data))
                const categories = getCategoriesSelector(getState())
                dispatch(selectedCategory(categories[0]))
            }
        }
        catch (e) {
            dispatch(handleError(e))
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

// sets the offer in the store
export const setOffers = (offers) => {
    return {
        type: SET_OFFERS,
        payload: { offers }
    }
}

// changes the selectedCategory
export const selectedCategory = (category) => {
    return {
        type: SELECTED_CATEGORY,
        payload: { category }
    }
}

const initialState = {
    ids: [],
    byId: {},
    selectedCategory: null
}

// reducer function to manage the offers state
export default function offers(state = initialState, action) {
    switch (action.type) {
        case SET_OFFERS:
            const ids = [];
            const byId = {};
            const offers = action.payload.offers
            for (let i = 0; i < offers.length; i++) {
                ids.push(offers[i].id)
                byId[offers[i].id] = { ...offers[i].attributes, id: offers[i].id }
            }
            return { ...state, ids: ids, byId: byId }
        case SELECTED_CATEGORY:
            const category = action.payload.category
            return { ...state, selectedCategory: category }
        default:
            return state
    }
}

// selector helpers
export const getIds = (state) => state.offers.ids
export const getAllOffers = (state) => state.offers.byId
export const getSelectedCategory = (state) => state.offers.selectedCategory

// selectors
export const getCategoriesSelector = createSelector([getAllOffers], (offers) => {
    const categories = []
    Object.keys(offers).forEach((key, index) => {
        const hasKey = categories.filter((element) => element === offers[key].category).length > 0
        if (!hasKey) {
            categories.push(offers[key].category)
        }
    })
    return categories
})

export const getCurrentCategoryOfferListSelector = createSelector([getSelectedCategory, getAllOffers], (category, offers) => {
    const currentOffers = []

    Object.keys(offers).forEach((key, index) => {
        if (offers[key].category === category) {
            currentOffers.push(offers[key])
        }
    })
    return currentOffers
})

export const hasDataSelector = createSelector([getIds], (ids) => {
    return ids.length > 0
})
