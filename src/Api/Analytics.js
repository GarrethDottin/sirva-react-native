import { apiUrls } from '../Config/Constants'
import { buildJsonPayload, doPost } from './Helper'

TYPE_EVENT = "event"

export async function submitEvent(name = '', metadata = {}, token) {
    const attributes = {
        name,
        metadata
    };
    const payload = buildJsonPayload(TYPE_EVENT, attributes);
    return await doPost(apiUrls.analyticEvent, payload, token);
}

