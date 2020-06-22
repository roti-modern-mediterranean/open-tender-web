import React from 'react'
import { useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { selectNotifications } from '../slices/notificationSlice'
import Notification from './Notification'

const Notifications = () => {
  const messages = useSelector(selectNotifications)
  // const messages = [
  //   { id: 1, message: 'Item added to cart' },
  //   { id: 2, message: 'Item added to cart' },
  // ]

  return (
    <div className="notifications">
      <TransitionGroup component={'ul'}>
        {messages.map((message) => (
          <CSSTransition key={message.id} classNames="flash" timeout={500}>
            <Notification {...message} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}

Notifications.displayName = 'Notifications'

export default Notifications
