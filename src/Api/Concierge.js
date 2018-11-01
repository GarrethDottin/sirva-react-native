import { apiUrls } from '../Config/Constants'
import { buildJsonPayload, doPost, doGet, doPatch } from './Helper'

const TYPE_MESSAGE = "relocation_message"

export async function submitEmail(content, token) {
    const attributes = {
        content
    }
    const payload = buildJsonPayload(TYPE_MESSAGE, attributes)

    return await doPost(apiUrls.sendMessageToReloSpecialists, payload, token)
}