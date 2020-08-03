import React from 'react'
import { useDispatch } from 'react-redux'
import { shareCart } from '@open-tender/redux'
import { Button } from '@open-tender/components'

import { closeModal } from '../slices'
import GroupOrderSteps from './GroupOrderSteps'
import iconMap from './iconMap'

const GroupOrderStart = () => {
  const dispatch = useDispatch()

  const start = (evt) => {
    evt.preventDefault()
    dispatch(shareCart())
    evt.target.blur()
  }

  const cancel = (evt) => {
    evt.preventDefault()
    dispatch(closeModal())
    evt.target.blur()
  }

  return (
    <div className="modal__content">
      <div className="modal__header">
        <p className="modal__title ot-heading ot-font-size-h3">
          Start a group order
        </p>
        <p className="modal__subtitle">Here's how it works</p>
      </div>
      <div className="modal__body -message ot-font-size-small ot-line-height">
        <GroupOrderSteps />
      </div>
      <div className="modal__footer">
        <div className="modal__footer__buttons">
          <Button
            text="Start a Group Order"
            classes="ot-btn ot-btn--highlight"
            icon={iconMap['Users']}
            onClick={start}
          />
          <Button text="Nevermind" classes="ot-btn" onClick={cancel} />
        </div>
      </div>
    </div>
  )
}

GroupOrderStart.displayName = 'GroupOrderStart'

export default GroupOrderStart
