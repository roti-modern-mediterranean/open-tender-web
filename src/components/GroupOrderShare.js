import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectCartToken } from '@open-tender/redux'
import { Button } from '@open-tender/components'
import iconMap from './iconMap'

const GroupOrderShare = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector(selectCartToken)
  const origin = window.location.origin
  const url = `${origin}/group-order/${token}`

  const proceed = (evt) => {
    evt.preventDefault()
    history.push('/review')
    evt.target.blur()
  }

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
          Share the link below with your friends so they can add their items to
          your group order
        </p>
      </div>
      <div className="modal__body -message ot-line-height">
        <div className="modal__body__section">
          <p>{url}</p>
        </div>
        <div className="modal__body__section">
          <p>
            Once you've added your own items, proceed to the next page to review
            the orders that have been submitted before you proceed to the
            checkout page
          </p>
          <p>
            <Button
              text="Review All Orders"
              classes="ot-btn ot-btn--highlight"
              icon={iconMap['ShoppingBag']}
              onClick={proceed}
            />
          </p>
        </div>
      </div>
      <div className="modal__footer">
        <p className="ot-font-size-small">
          Change your mind? Save this order for later or cancel it altogether.
        </p>
        <div className="modal__footer__buttons">
          <Button
            text="Save for Later"
            classes="ot-btn ot-btn--small"
            icon={iconMap['Save']}
            onClick={save}
          />
          <Button
            text="Delete Forever"
            classes="ot-btn ot-btn--small"
            icon={iconMap['Trash2']}
            onClick={cancel}
          />
        </div>
      </div>
    </div>
  )
}

GroupOrderShare.displayName = 'GroupOrderShare'

export default GroupOrderShare
