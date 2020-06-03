import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { hideNotification } from '../slices/notificationSlice'

const Notification = ({ message, id }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideNotification(id))
    }, 3000)
    return () => clearTimeout(timer)
  }, [dispatch, id])

  return (
    <li className="notification bg-link-color border-radius-small ot-light-color font-size-small">
      {message}
    </li>
  )
}

Notification.displayName = 'Notification'
Notification.propTypes = {
  message: propTypes.string,
  id: propTypes.string,
}

export default Notification
