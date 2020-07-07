import React from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { resetRevenueCenter, resetOrderType } from 'open-tender-redux'
import { Button } from 'open-tender'

import { selectConfig, closeModal } from '../../slices'

const defaultText = {
  title: 'Location currently closed',
  msg: "We're sorry, but this location is currently closed.",
}

const ClosedModal = ({ status, isCancel }) => {
  const dispatch = useDispatch()
  const { revenueCenters: rcConfig } = useSelector(selectConfig)
  const { statusMessages } = rcConfig || {}
  const statusMsg = statusMessages[status] || defaultText

  const changeLocation = (evt) => {
    evt.preventDefault()
    dispatch(resetRevenueCenter())
    dispatch(closeModal())
    evt.target.blur()
  }

  const startOver = (evt) => {
    evt.preventDefault()
    dispatch(resetOrderType())
    dispatch(closeModal())
    evt.target.blur()
  }

  const cancel = (evt) => {
    evt.preventDefault()
    dispatch(closeModal())
    evt.target.blur()
  }

  return (
    <>
      <div className="modal__content">
        <div className="modal__header">
          <p className="modal__title ot-heading ot-font-size-h3">
            {statusMsg.title}
          </p>
        </div>
        <div className="modal__body">
          <p>{statusMsg.msg}</p>
        </div>
        <div className="modal__footer">
          <div className="modal__footer__buttons">
            <Button
              text="Change Location"
              classes="ot-btn ot-btn--highlight"
              onClick={changeLocation}
            />
            {isCancel ? (
              <Button text="Cancel" classes="ot-btn" onClick={cancel} />
            ) : (
              <Button text="Start Over" classes="ot-btn" onClick={startOver} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

ClosedModal.displayName = 'ClosedModal'
ClosedModal.propTypes = {
  title: propTypes.string,
  msg: propTypes.string,
}

export default ClosedModal
