import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { X } from 'react-feather'
import { hideMessage } from 'open-tender-redux'

const Message = ({ message, id }) => {
  const dispatch = useDispatch()

  const handleRemove = (evt) => {
    evt.preventDefault()
    dispatch(hideMessage(id))
    evt.target.blur()
  }

  return (
    <li className="message border-radius-small font-size-small ot-alert">
      <span className="message__container">
        <span>{message}</span>
        <button
          className="message__close ot-light-color"
          onClick={handleRemove}
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
