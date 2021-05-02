import React from 'react'
import { useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'
import { selectNotifications } from '@open-tender/redux'

import Notification from './Notification'

const NotificationsView = styled('div')`
  position: fixed;
  z-index: 15;
  top: ${(props) => props.theme.layout.navHeight};
  right: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    top: ${(props) => props.theme.layout.navHeightMobile};
    left: ${(props) => props.theme.layout.paddingMobile};
    right: ${(props) => props.theme.layout.paddingMobile};
    text-align: center;
  }
`

const Notifications = () => {
  const messages = useSelector(selectNotifications)
  // const messages = [
  //   { id: 1, message: 'Item added to cart' },
  //   { id: 2, message: 'Item added to cart' },
  // ]

  return (
    <NotificationsView>
      <TransitionGroup component={'ul'}>
        {messages.map((message) => (
          <CSSTransition key={message.id} classNames="flash" timeout={250}>
            <Notification {...message} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </NotificationsView>
  )
}

Notifications.displayName = 'Notifications'

export default Notifications
