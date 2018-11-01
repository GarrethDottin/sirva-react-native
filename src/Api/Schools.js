import { apiUrls } from '../Config/Constants'
import { get } from "./Helper";

export async function getSchools(category = null) {
  const url = apiUrls.getSchools.replace('{category}', category)
  return get(url)
}
