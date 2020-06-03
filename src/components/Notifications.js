import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectNotification,
  hideNotification,
} from '../slices/notificationSlice'

const Notification = () => {
  const message = useSelector(selectNotification)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      if (message) dispatch(hideNotification())
    }, 3000)
  }, [dispatch, message])

  return (
    <TransitionGroup component={null}>
      {message ? (
        <CSSTransition key="notification" classNames="flash" timeout={500}>
          <div className="ot-top notification bg-link-color border-radius-small">
            <p className="ot-light-color font-size-small">{message}</p>
          </div>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

Notification.displayName = 'Notification'
Notification.propTypes = {
  message: propTypes.string,
}

export default Notification
