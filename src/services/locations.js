import { request } from './requests'

export const getLocations = (rcType) => {
  const params =
    '&with_related=delivery_zones&with_settings=address&expand=store'
  return request(`/revenue-centers?revenue_center_type=${rcType}${params}`)
}
