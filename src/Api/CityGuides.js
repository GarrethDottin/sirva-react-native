import { apiUrls } from '../Config/Constants';
import { buildJsonPayload, doPost, doGet, doPatch } from './Helper';

export async function getCityNeighbourhoods(cityId, token) {
    const url = apiUrls.getCityNeighbourhoods.replace('{city_id}', cityId);
    return await doGet(url, token);
}

export async function getCityAreaInfo(cityId, token){
    const url = apiUrls.getCityAreaInfo.replace('{city_id}', cityId);
    return await doGet(url, token);
}

export async function getCity(city, state, token){
    const url = apiUrls.citySearch.replace('{city}', city).replace('{state}', state);
    return await doGet(url, token);
}
