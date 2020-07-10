import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { hideNotification } from '@open-tender/redux'

const Notification = ({ message, id }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideNotification(id))
    }, 3000)
    return () => clearTimeout(timer)
  }, [dispatch, id])

  return (
    <li className="notification ot-highlight ot-font-size-small">{message}</li>
  )
}

Notification.displayName = 'Notification'
Notification.propTypes = {
  message: propTypes.string,
  id: propTypes.string,
}

export default Notification
