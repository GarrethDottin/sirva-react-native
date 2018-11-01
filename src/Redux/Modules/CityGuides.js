import { AsyncStorage } from 'react-native';
import { dsKeyAuthToken } from '../../Config/Constants';
import { createSelector } from 'reselect'
import { getCityAreaInfo, getCityNeighbourhoods, getCity } from '../../Api/CityGuides';
import { percentage } from '../../Utils/ReactHelpers'
import { getOriginAddressSelector, getDestinationAddressSelector } from './Relocation';
import { asyncLogOff } from './Authentication';
import { handleError } from './SystemMessaging';
import { addAsyncWorkingRequest, removeAsyncWorkingRequest} from './SystemWorking'

const SET_DESTINATION_NEIGHBOURHOOD = '[CITY_GUIDE] SET_DESTINATION_NEIGHBOURHOOD';
const ORIGIN_CITY = '[CITY_GUIDE] ORIGIN_CITY';
const DESTINATION_CITY = '[CITY_GUIDE] DESTINATION_CITY';
const VISIBLE_KEY = '[CITY_GUIDE] VISIBLE_KEY';
const LOADED = '[CITY GUIDE] LOADED';
const LOADING = '[CITY GUIDE] LOADING';

export const setOriginCity = (originCity) => {
    return {
        type: ORIGIN_CITY,
        originCity
    }
}

export const setDestinationCity = (destinationCity) => {
    return {
        type: DESTINATION_CITY,
        destinationCity
    }
}

export const setDestinationNeighbourhood = (destinationNeighborhood) => {
    return {
        type: SET_DESTINATION_NEIGHBOURHOOD,
        destinationNeighborhood
    }
}

export const setVisibleKey = (visibleKey) => {
    return {
        type: VISIBLE_KEY,
        visibleKey
    }
}

export const setLoading = (loading) => {
    return {
        type: LOADING,
        loading
    }
}

export const setLoaded = (loaded) => {
    return {
      type: LOADED,
      loaded
    }
}

export const loadCityGuideInfo = () => {
    return async function(dispatch, getState) {
        try {
            dispatch(addAsyncWorkingRequest())
            dispatch(setLoading(true));

            const token = await AsyncStorage.getItem(dsKeyAuthToken);

            //Get the origin and destination address that is associated with the relocation.
            const originAddress = getOriginAddressSelector(getState());
            const destinationAddress = getDestinationAddressSelector(getState());

            let originData = { id: '', city: '', stateCode: '', info: '' };
            let destinationData = { id: '', city: '', stateCode: '', info: '' };

            dispatch(setOriginCity(originData));
            dispatch(setDestinationCity(destinationData));
            dispatch(setDestinationNeighbourhood([]));

            //Get the the id of each city in the database
            const [originCityResponse, destinationCityResponse] = await Promise.all([
                getCity(originAddress.city, originAddress.state, token),
                getCity(destinationAddress.city, destinationAddress.state, token)
            ])

            //Store the cities information in the City Guides Redux State
            originData = { id: originCityResponse.data.id, city: originCityResponse.data.attributes.name, stateCode: originCityResponse.data.attributes.stateCode, info: '' };
            destinationData = { id: destinationCityResponse.data.id, city: destinationCityResponse.data.attributes.name, stateCode: destinationCityResponse.data.attributes.stateCode, info: '' };
            dispatch(setOriginCity(originData));
            dispatch(setDestinationCity(destinationData));

            //Get the neighbourhoods of the destination city
            let response = await getCityNeighbourhoods(destinationData.id, token);
            let cities = response.data.map((item) => {
                return { value: item.attributes.name + ", " + item.attributes.stateCode }
            })

            //Store the neighbouhoods of the destination city in the City Guides Redux State
            dispatch(setDestinationNeighbourhood(cities));

            //Get the information of the cities so that we can compare later
            const [originAreaInfo, destinationAreaInfo] = await Promise.all([
                getCityAreaInfo(originData.id, token),
                getCityAreaInfo(destinationData.id, token)
            ])

            originData.info = originAreaInfo.data.attributes;
            destinationData.info = destinationAreaInfo.data.attributes;

            //Store this new data in the City Guides Redux State for the destination and origin cities
            dispatch(setOriginCity(originData));
            dispatch(setDestinationCity(destinationData));

            dispatch(setLoading(false));
            dispatch(setLoaded(true));
        } catch(error) {
            dispatch(setLoading(false));
            dispatch(setLoaded(true));
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const asyncGetDestinationCity = (city, stateCode) => {
    return async function(dispatch){
        try {
            dispatch(addAsyncWorkingRequest())
            dispatch(setLoading(true));

            const token = await AsyncStorage.getItem(dsKeyAuthToken);
            const response = await getCity(city, stateCode, token);

            let data = { id: response.data.id, city: response.data.attributes.name, stateCode: response.data.attributes.stateCode, info: '' };

            await asyncGetDestinationCityAreaInfo(data, data.id)(dispatch);

            dispatch(setLoading(false));
        } catch(error) {
            dispatch(setLoading(false));
        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const fetchNeighbourhoodForCity = (city, stateCode) => {
    return async (dispatch)=> {
        try{
            dispatch(addAsyncWorkingRequest())
            const token = await AsyncStorage.getItem(dsKeyAuthToken);
            const cityResponse = await getCity(city, stateCode, token);
            console.log(cityResponse);
            const neighbouhoodResponse = await getCityNeighbourhoods(cityResponse.data.id, token);
            let neighbouhood = neighbouhoodResponse.data.map((city) => (
                {
                    value: `${city.attributes.name}, ${city.attributes.stateCode}`,
                    lat: city.attributes.lat,
                    lng: city.attributes.lng
                }
            ))
            dispatch(setDestinationNeighbourhood(neighbouhood))

        } finally {
            dispatch(removeAsyncWorkingRequest())
        }
    }
}

export const asyncGetDestinationCityAreaInfo = (data, cityId) => {
    return async function(dispatch){
        try {
            const token = await AsyncStorage.getItem(dsKeyAuthToken);
            const response = await getCityAreaInfo(cityId, token);

            data.info = response.data.attributes;

            dispatch(setDestinationCity(data));
        } catch(error) {
            data.info = '';
            dispatch(setDestinationCity(data))
        }
    }
}

export const asyncSetVisibleKey = (visibleKey) => {
    return async function(dispatch){
        try {
            dispatch(setVisibleKey(visibleKey))
        } catch(error) {
            console.log(error);
            dispatch(
                error.responseStatus === 401 ? asyncLogOff() : handleError(error)
            )
        }
    }
}

const initialState = {
    originCity: { id: '', city: '', stateCode: '', info: '' },
    destinationCity: { id: '', city: '', stateCode: '', info: '' },
    destinationNeighborhood: [],
    isDestinationNeighborhoodLoaded: false,
    selectedInfoKey: null,
    loaded: false,
    loading: false

}

export default function cityGuides(state = initialState, action) {
    switch(action.type) {
        case SET_DESTINATION_NEIGHBOURHOOD:
            return {
                ...state,
                destinationNeighborhood: action.destinationNeighborhood,
                isDestinationNeighborhoodLoaded: true
            }
        case ORIGIN_CITY:
            return {
                ...state,
                originCity: action.originCity
            }
        case DESTINATION_CITY:
            return {
                ...state,
                destinationCity: action.destinationCity
            }
        case VISIBLE_KEY:
            return {
                ...state,
                selectedInfoKey: action.visibleKey
            }
        case LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case LOADED:
            return {
                ...state,
                loaded: action.loaded
            }
        default:
            return state
    }
}

export const getCityGuidesDataSelector = ({ cityGuides }) => {
    return cityGuides
}

export const getSelectedInfoKey = ({ cityGuides}) => {
    return cityGuides.selectedInfoKey;
}

export const getOriginCitySelector = createSelector(
    getCityGuidesDataSelector,
    (cityGuidesData) => {
        return cityGuidesData ? cityGuidesData.originCity : null
    }
)

export const getDestinationCitySelector = createSelector(
    getCityGuidesDataSelector,
    (cityGuidesData) => {
        return cityGuidesData ? cityGuidesData.destinationCity : null
    }
)

export const getDestinationNeighbourhoodSelector = createSelector(
    getCityGuidesDataSelector,
    (cityGuidesData) => {
        return cityGuidesData ? cityGuidesData.destinationNeighborhood : null
    }
)

export const isDestinationNeighborhoodLoadedSelector = createSelector(
    getCityGuidesDataSelector,
    (cityGuidesData) => cityGuidesData.isDestinationNeighborhoodLoaded
)

export const getLoadingSelector = createSelector(
    getCityGuidesDataSelector,
    (cityGuidesData) => {
      return  cityGuidesData ? cityGuidesData.loading : null
    }
)

export const getLoadedSelector = createSelector(
    getCityGuidesDataSelector,
    (cityGuidesData) => {
      return cityGuidesData ? cityGuidesData.loaded : null
    }
)

export const headersSelectors = createSelector(
    getCityGuidesDataSelector,
    (cityGuidesData) => {

        let data = null;

        if(cityGuidesData) {
            if (cityGuidesData.originCity.info !== '' && cityGuidesData.destinationCity.info !== '') {

                let oriInfo = cityGuidesData.originCity.info;
                let destInfo = cityGuidesData.destinationCity.info;

                data = {
                    houseCostPercentage: percentage(oriInfo.costOfLiving["householdCost"], destInfo.costOfLiving["householdCost"]),
                    houseCostUpDown: oriInfo.costOfLiving["householdCost"] > destInfo.costOfLiving["householdCost"] ? true : false,
                    oriPopulation: oriInfo.demographic["population"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    destPopulation: destInfo.demographic["population"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    oriCommuteTime: oriInfo.commute["travelTime"] + " min",
                    destCommuteTime: destInfo.commute["travelTime"] + " min",
                    crimePercentage: percentage(oriInfo.safety["crimeRiskIndex"], destInfo.safety["crimeRiskIndex"]),
                    crimeUpDown: oriInfo.safety["crimeRiskIndex"] > destInfo.safety["crimeRiskIndex"] ? true : false,
                    averageJuly: [oriInfo.weather["avg_max_temp_jul"] + "°", destInfo.weather["avg_max_temp_jul"] + "°"],
                    averageJanuary: [oriInfo.weather["avg_min_temp_jan"] + "°", destInfo.weather["avg_min_temp_jan"] + "°"]
                }
            }
        }

        return data;
    }
)
