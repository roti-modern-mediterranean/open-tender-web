import { request } from './requests'

export const postOrder = (order) => {
  return request(`/orders/validate`, 'POST', order)
}
