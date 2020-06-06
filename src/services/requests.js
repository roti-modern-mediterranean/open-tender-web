import { request, authRequest } from './request'

export const getConfig = () => {
  return request(`/config`)
}

export const getLocations = (revenue_center_type, lat, lng) => {
  let params = `revenue_center_type=${revenue_center_type}`
  if (lat && lng) params += `&lat=${lat}&lng=${lng}`
  return request(`/revenue-centers?${params}`)
}

export const getLocation = (revenue_center_type_id) => {
  return request(`/revenue-centers/${revenue_center_type_id}`)
}

export const getAllergens = () => {
  return request(`/allergens`)
}

export const getMenu = (locationId, serviceType, requestedAt) => {
  const params = `revenue_center_id=${locationId}&service_type=${serviceType}&requested_at=${requestedAt}`
  return request(`/menus?${params}`)
}

export const postOrderValidate = (order) => {
  return request(`/orders/validate`, 'POST', order)
}

export const postOrder = (order) => {
  return request(`/orders`, 'POST', order)
}

export const getCustomer = (token) => {
  return request(`/customer?with_related=true`, 'GET', null, null, token)
}

export const putCustomer = (token, data) => {
  return request(`/customer`, 'PUT', data, null, token)
}

export const postLogin = (email, password) => {
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

export const postLogout = (token) => {
  return authRequest('/revoke', { token })
}

export const getCustomerOrders = (token, timing, limit) => {
  let params = []
  if (limit) params.push(`limit=${limit}`)
  if (timing) params.push(`requested_type=${timing}`)
  params = params.length ? `?${params.join('&')}` : ''
  return request(`/customer/orders${params}`, 'GET', null, null, token)
}

export const getCustomerOrder = (token, orderId) => {
  return request(`/customer/orders/${orderId}`, 'GET', null, null, token)
}

export const getCustomerAllergens = (token) => {
  return request(`/customer/allergens`, 'GET', null, null, token)
}

// replace all existing allergens with a new list of allergens
export const putCustomerAllergens = (token, data) => {
  return request(`/customer/allergens`, 'PUT', data, null, token)
}

// add new allergens incrementally without affecting existing allergens
export const postCustomerAllergens = (token, data) => {
  return request(`/customer/allergens`, 'POST', data, null, token)
}

export const getCustomerAddresses = (token, limit = 10) => {
  const params = limit ? `?limit=${limit}` : ''
  return request(`/customer/addresses${params}`, 'GET', null, null, token)
}

export const putCustomerAddress = (token, addressId, data) => {
  return request(`/customer/addresses/${addressId}`, 'PUT', data, null, token)
}

export const deleteCustomerAddress = (token, addressId) => {
  return request(
    `/customer/addresses/${addressId}`,
    'DELETE',
    null,
    null,
    token
  )
}

export const getCustomerCreditCards = (token) => {
  return request(`/customer/credit-cards`, 'GET', null, null, token)
}

export const postCustomerCreditCard = (token, data) => {
  return request(`/customer/credit-cards`, 'POST', data, null, token)
}

export const putCustomerCreditCard = (token, cardId, data) => {
  return request(`/customer/credit-cards/${cardId}`, 'PUT', data, null, token)
}

export const deleteCustomerCreditCard = (token, cardId) => {
  return request(
    `/customer/credit-cards/${cardId}`,
    'DELETE',
    null,
    null,
    token
  )
}

export const postCustomerFavorite = (token, data) => {
  return request(`/customer/favorites`, 'POST', data, null, token)
}
