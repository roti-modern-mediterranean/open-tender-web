import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { X } from 'react-feather'
import { removeMessage } from '@open-tender/redux'

const Message = ({ message, id }) => {
  const dispatch = useDispatch()

  const handleRemove = (evt) => {
    evt.preventDefault()
    dispatch(removeMessage(id))
    evt.target.blur()
  }

  return (
    <li className="message ot-font-size-small ot-warning">
      <span className="message__container">
        <span>{message}</span>
        <button
          className="message__close ot-color-light"
          onClick={handleRemove}
          aria-label="Remove message"
        >
          <X size={14} />
        </button>
      </span>
    </li>
  )
}

Message.displayName = 'Message'
Message.propTypes = {
  message: propTypes.string,
  id: propTypes.string,
}

export default Message
