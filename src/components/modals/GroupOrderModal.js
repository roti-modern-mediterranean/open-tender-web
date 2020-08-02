import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'
import { Button } from '@open-tender/components'

import { openModal, closeModal } from '../../slices'

const GroupOrderModal = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(selectCustomer)

  const login = (evt, type) => {
    evt.preventDefault()
    dispatch(closeModal())
    console.log(type)
    setTimeout(() => {
      dispatch(openModal({ type }))
    }, 250)
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
            Start a group order
          </p>
        </div>
        {!auth ? (
          <>
            <div className="modal__body -message">
              <p>You must be logged into your accout to start a group order.</p>
              <Button
                text="Click here to login"
                classes="ot-btn-link"
                onClick={(evt) => login(evt, 'login')}
              />
              <p>Don't have an accout?</p>
              <Button
                text="Click here to create an account"
                classes="ot-btn-link"
                onClick={(evt) => login(evt, 'signUp')}
              />
            </div>
            <div className="modal__footer">
              <div className="modal__footer__buttons">
                <Button
                  text="Nevermind"
                  classes="ot-btn ot-btn--highlight"
                  onClick={cancel}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="modal__body -message">
            <p>Let's start a group order!</p>
          </div>
        )}
      </div>
    </>
  )
}

GroupOrderModal.displayName = 'OrderTypeModal'

export default GroupOrderModal
