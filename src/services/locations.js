import { request } from './requests'

export const getLocations = (rcType) => {
  return request(`/revenue-centers?revenue_center_type=${rcType}`)
}
