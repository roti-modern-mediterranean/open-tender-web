import { request } from './requests'

export const getLocations = (rcType) => {
  // const params =
  //   '&with_related=delivery_zones&with_settings=address&expand=store'
  const params = ''
  return request(`/locations?location_type=${rcType}${params}`)
}
