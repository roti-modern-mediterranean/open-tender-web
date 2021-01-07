import { isObject } from '@open-tender/js'
import { Message } from '@open-tender/components'

const PageError = ({ error }) => {
  const errMsg = error && isObject(error) ? Object.values(error)[0] : error
  return errMsg ? (
    <Message color="error" style={{ width: '100%', margin: '0 0 4rem' }}>
      {errMsg}
    </Message>
  ) : null
}

export default PageError
