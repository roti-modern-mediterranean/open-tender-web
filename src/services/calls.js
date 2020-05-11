import { request } from './requests'

export const postOrder = (order) => {
  return request(`/orders`, 'POST', order)
}
