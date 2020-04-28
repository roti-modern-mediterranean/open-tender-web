const baseUrl = process.env.REACT_APP_API_URL
const token = process.env.REACT_APP_TOKEN
const brandId = process.env.REACT_APP_BRAND_ID

const requestException = (message, response, exception, extracted) => {
  this.message = `${message || 'An unknown exception was triggered.'}`
  this.stack = new Error().stack
  this.response = response
  this.exception = exception
  this.extracted = extracted
}

const fiveHundredError = {
  status: 500,
  code: 'errors.server.internal',
  title: 'Internal Server Error',
  detail: 'Internal server error. Please contact support.',
}

const handleReponse = (response) => {
  const { status, statusText } = response
  if (status >= 500) {
    throw fiveHundredError
  }
  if (statusText === 'NO CONTENT' || status === 204) {
    return true
  }
  const requestWasSuccessful = status >= 200 && status < 300
  try {
    return response.json().then((parsed) => {
      if (requestWasSuccessful) return parsed
      throw parsed
    })
  } catch (err) {
    throw new requestException('Response could not be parsed', response, err)
  }
}

export const request = (
  endpoint,
  method = 'GET',
  data = null,
  timeout = null
) => {
  let didTimeOut = false
  return new Promise((resolve, reject) => {
    let timer
    if (timeout) {
      timer = setTimeout(() => {
        didTimeOut = true
        reject(new Error('Request timed out'))
      }, timeout)
    }
    let options = {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'brand-id': `${brandId}`,
      },
    }
    if (data) options.body = JSON.stringify(data)
    fetch(`${baseUrl}${endpoint}`, options)
      .then(handleReponse)
      .then((json) => {
        if (didTimeOut) return
        resolve(json)
      })
      .catch((err) => {
        if (didTimeOut) return
        reject(err)
      })
      .finally(() => {
        if (timeout) clearTimeout(timer)
      })
  })
}
