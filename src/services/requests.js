import { request, authRequest } from './request'

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

export const getCustomer = (token) => {
  return request(`/customer`, 'GET', null, null, token)
}

export const loginCustomer = (email, password) => {
  let auth
  const data = {
    grant_type: 'password',
    username: email,
    password: password,
  }
  return authRequest('/token', data)
    .then((resp) => {
      auth = resp
      return getCustomer(auth.access_token)
    })
    .then((customer) => ({ auth, customer }))
}

export const logoutCustomer = (token) => {
  return authRequest('/revoke', { token })
}
