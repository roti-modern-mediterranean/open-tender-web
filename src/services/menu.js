import { request } from './requests'

export const getMenu = (locationId, serviceType, requestedAt) => {
  const params = `revenue_center_id=${locationId}&service_type=${serviceType}&requested_at=${requestedAt}`
  return request(`/menus?${params}`)
}
