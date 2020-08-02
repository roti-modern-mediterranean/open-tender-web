import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, selectCartToken, shareCart } from '@open-tender/redux'
import { Button } from '@open-tender/components'

import { closeModal } from '../../slices'
import GroupOrderGuest from '../GroupOrderGuest'
import GroupOrderSteps from '../GroupOrderSteps'
import ModalClose from '../ModalClose'

const GroupOrderModal = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(selectCustomer)
  const token = useSelector(selectCartToken)
  const origin = window.location.origin
  const url = `${origin}/group-order/${token}`

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
    <>
      <ModalClose />
      <div className="modal__content">
        <div className="modal__header">
          <p className="modal__title ot-heading ot-font-size-h3">
            Start a group order
          </p>
          {auth && <p className="modal__subtitle">Here's how it works</p>}
        </div>
        {!auth ? (
          <GroupOrderGuest />
        ) : token ? (
          <div className="modal__body -message">
            <p>{url}</p>
          </div>
        ) : (
          <>
            <div className="modal__body -message ot-font-size-small ot-line-height">
              <GroupOrderSteps />
            </div>
            <div className="modal__footer">
              <div className="modal__footer__buttons">
                <Button
                  text="Start a Group Order"
                  classes="ot-btn ot-btn--highlight"
                  onClick={start}
                />
                <Button text="Nevermind" classes="ot-btn" onClick={cancel} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

GroupOrderModal.displayName = 'GroupOrderModal'

export default GroupOrderModal
