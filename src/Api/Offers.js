import { apiUrls } from '../Config/Constants'
import { doGet } from './Helper'

export async function getOffers(token) {
  return await doGet(apiUrls.getOffers, token)
}