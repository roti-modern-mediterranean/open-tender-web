import { request } from './requests'

export const getConfig = () => {
  return request(`/config`)
}
