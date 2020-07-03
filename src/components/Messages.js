import React from 'react'
import { useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { selectMessages } from 'open-tender-redux'

import Message from './Message'

const Messages = () => {
  const messages = useSelector(selectMessages)
  // const messages = [
  //   { id: 1, message: 'Requested time updated' },
  //   { id: 2, message: 'Requested time updated' },
  // ]

  return (
    <div className="ot-top messages">
      <TransitionGroup component={'ul'}>
        {messages.map((message) => (
          <CSSTransition
            key={message.id}
            classNames="flash-message"
            timeout={500}
          >
            <Message {...message} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}

Messages.displayName = 'Messages'

export default Messages
