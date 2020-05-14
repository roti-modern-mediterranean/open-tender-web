import { request } from './request'

export const getConfig = () => {
  return request(`/config`)
}

export const getLocations = (rcType) => {
  // const params =
  //   '&with_related=delivery_zones&with_settings=address&expand=store'
  const params = ''
  return request(`/locations?location_type=${rcType}${params}`)
}

export const getMenu = (locationId, serviceType, requestedAt) => {
  const params = `revenue_center_id=${locationId}&service_type=${serviceType}&requested_at=${requestedAt}`
  return request(`/menus?${params}`)
}

export const postOrder = (order) => {
  return request(`/orders/validate`, 'POST', order)
}
