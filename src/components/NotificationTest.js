import React from 'react'
import propTypes from 'prop-types'

import { Button } from '@open-tender/components'
import { useDispatch } from 'react-redux'

const NotificationTest = ({ message }) => {
  return (
    <div className="notification-test">
      <Button text="Test Notification" onClick={() => dispatch()} />
    </div>
  )
}

Notification.displayName = 'Notification'
Notification.propTypes = {
  message: propTypes.string,
}

export default Notification
