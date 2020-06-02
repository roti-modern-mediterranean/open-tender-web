export const handleError = (err) => {
  return err.detail || err.message
}

export const handleFormErrors = (params) => {
  return Object.entries(params).reduce((obj, error) => {
    const [field, msg] = error
    return { ...obj, [field.replace('$.', '')]: msg }
  }, {})
}
