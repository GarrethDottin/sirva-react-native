import { createSelector } from "../../../node_modules/reselect";
import { get } from '../../Api/Helper';
import { getSchools } from "../../Api/Schools";
import { handleError } from "./SystemMessaging";
import { addAsyncWorkingRequest, removeAsyncWorkingRequest } from './SystemWorking'
import { asyncLogOff } from './Authentication';

const LOAD_SCHOOLS = "[Schools] LOAD SCHOOLS";
const LOAD_SCHOOLS_SUCCESS = "[Schools] LOAD SCHOOLS SUCCESS";
const LOAD_MORE = "[Schools] LOAD MORE";
const LOAD_MORE_SUCCESS = "[Schools] LOAD MORE SUCCESS";
const SELECT_SCHOOL_CATEGORY = "[Schools] SELECT SCHOOL CATEGORY";

export const loadSchools = (category = null) => {
    return async (dispatch) => {
        dispatch(addAsyncWorkingRequest());
        dispatch({ type: LOAD_SCHOOLS });

        try {
            const schoolsResponse = await getSchools(category);
            const schools = schoolsResponse.data;
            const links = schoolsResponse.links;
            dispatch(loadSchoolsSuccess(schools, links));
        }  catch (error) {
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const loadMore = () => {
    return async (dispatch, getState) => {
        dispatch(addAsyncWorkingRequest());
        dispatch({ type: LOAD_MORE });
        try {
            const currentLinks = getLinksSelector(getState());
            if (!currentLinks || !currentLinks.next) { return }
            const schoolsResponse = await get(currentLinks.next);
            const schools = schoolsResponse.data;
            const links = schoolsResponse.links;
            dispatch(loadMoreSuccess(schools, links));
        } catch(error) {
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const loadSchoolsSuccess = (schoolList, links) => {
    return {
        type: LOAD_SCHOOLS_SUCCESS,
        schoolList,
        links
    }
}

export const loadMoreSuccess = (schoolList, links) => {
    return {
        type: LOAD_MORE_SUCCESS,
        schoolList,
        links
    }
}

export const selectSchoolCategory = (schoolCategory) => {
    return async function (dispatch) {
        dispatch({ type: SELECT_SCHOOL_CATEGORY, schoolCategory });
        dispatch(loadSchools(schoolCategory));
    }
}

const initialState = {
    schoolList: [],
    links: {},
    categories: ['all', 'preschool', 'elementary', 'highschool'],
    selectedCategory: 'all',
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SCHOOLS: {
            return {
                ...state,
                loading: true,
            }
        }
        case LOAD_SCHOOLS_SUCCESS: {
            return {
                ...state,
                loading: false,
                schoolList: action.schoolList,
                links: action.links || {}
            }
        }
        case LOAD_MORE_SUCCESS: {
            return {
                ...state,
                schoolList: [
                    ...state.schoolList,
                    ...action.schoolList
                ],
                links: action.links || {}
            }
        }
        case SELECT_SCHOOL_CATEGORY: {
            return {
                ...state,
                selectedCategory: action.schoolCategory
            }
        }
        default: {
            return state;
        }
    }
}

export const getSchoolsState = (state) => state.schools

export const isLoading = createSelector(
    getSchoolsState,
    (schoolsState) => schoolsState.loading
)

export const getSchoolCategories = createSelector(
    getSchoolsState,
    (schoolsState) => schoolsState.categories
)

export const getSchoolsList = createSelector(
    getSchoolsState,
    (schoolsState) => schoolsState.schoolList
)

export const getSelectedSchoolCategory = createSelector(
    getSchoolsState,
    (schoolsState) => schoolsState.selectedCategory
)

export const getSelectedSchoolList = getSchoolsList

export const getLinksSelector = createSelector(
    getSchoolsState,
    (schoolsState) => schoolsState.links
)

export const hasMore = createSelector(
    getLinksSelector,
    (links) => !!links && links.next
)
