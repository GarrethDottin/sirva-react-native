import { apiUrls } from '../Config/Constants'
import { buildJsonPayload, doPost, doGet, doPatch } from './Helper'

const TYPE_TRANSEREE = 'transferee'
const TYPE_LOGIN_WITH_CREDS = 'transferee_token'
const TYPE_RESET_PASSWORD_REQ = 'reset_password_request'

export function loginWithToken(jwtToken) {
    setTimeout(function () {
        return true;
    }, 3000)
}

export async function loginUser(email, password) {    
    const attributes = {
        email: email,
        password: password
    }
    const payload = buildJsonPayload(TYPE_LOGIN_WITH_CREDS, attributes)
    
    return await doPost(apiUrls.login, payload);
}

export async function verifyLoginToken(token) {    
    return await doGet(apiUrls.verifyLoginToken, token);
}

export async function verifyAccount(email, password, phone) {    
    const attributes = {
        email: email,
        password: password,
        mobilePhoneNumber: phone
    }
    const payload = buildJsonPayload(TYPE_TRANSEREE, attributes)
    
    return await doPost(apiUrls.verification, payload);
}

export async function resetPasswordRequest(email) {    
    const attributes = {
        email: email
    }
    const payload = buildJsonPayload(TYPE_RESET_PASSWORD_REQ, attributes)

    return await doPost(apiUrls.resetPasswordRequest, payload)
}

export async function verifyPasswordRequest(token) {
    return await doPost(apiUrls.verifyPasswordRequest, {}, token)
}

export async function setPassword(password, token) {
    const attributes = {
        password: password
    }
    const payload = buildJsonPayload(TYPE_TRANSEREE, attributes)

    return await doPatch(apiUrls.updatePassword, payload, token)
}

export async function resetPassword(password, token) {
    const attributes = {
        password: password
    }
    const payload = buildJsonPayload(TYPE_TRANSEREE, attributes)

    return await doPatch(apiUrls.resetPassword, payload, token)
}

export async function logout() {
    //TODO
}