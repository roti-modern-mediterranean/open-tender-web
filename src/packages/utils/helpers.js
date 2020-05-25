export const isString = (str) => {
  return typeof str === 'string'
}

export const isObject = (obj) => {
  return typeof obj === 'object' && obj !== null
}

export const isEmpty = (obj) => {
  return (
    !obj || (obj.constructor === Object && Object.entries(obj).length === 0)
  )
}

export const isNum = (s) => /^\d+$/.test(s)
