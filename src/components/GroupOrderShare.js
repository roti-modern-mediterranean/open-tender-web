import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartToken } from '@open-tender/redux'
import { Button } from '@open-tender/components'

const GroupOrderShare = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectCartToken)
  const origin = window.location.origin
  const url = `${origin}/group-order/${token}`

  const save = (evt) => {
    evt.preventDefault()
    evt.target.blur()
  }

  const cancel = (evt) => {
    evt.preventDefault()
    evt.target.blur()
  }

  return (
    <div className="modal__content">
      <div className="modal__header">
        <p className="modal__title ot-heading ot-font-size-h3">
          Spread the love!
        </p>
        <p className="modal__subtitle">
          Share the link below with your friends
        </p>
      </div>
      <div className="modal__body -message">
        <p>{url}</p>
      </div>
      <div className="modal__footer">
        <div className="modal__footer__buttons">
          <Button text="Save for Later" classes="ot-btn" onClick={save} />
          <Button text="Cancel Forever" classes="ot-btn" onClick={cancel} />
        </div>
      </div>
    </div>
  )
}

GroupOrderShare.displayName = 'GroupOrderShare'

export default GroupOrderShare
