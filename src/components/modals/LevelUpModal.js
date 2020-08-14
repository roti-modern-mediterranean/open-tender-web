import React, { useEffect, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  addCustomerLevelUp,
  resetCustomerLevelUpError,
  selectCustomerLevelUp,
  selectCustomer,
} from '@open-tender/redux'
import { LevelUpForm } from '@open-tender/components'

import { closeModal } from '../../slices'
import ModalClose from '../ModalClose'
import ModalTitle from '../ModalTitle'

const LevelUpModal = ({ windowRef }) => {
  const dispatch = useDispatch()
  const { profile } = useSelector(selectCustomer)
  const email = profile ? profile.email || '' : ''
  const { loading, error } = useSelector(selectCustomerLevelUp)
  const connect = useCallback(
    (data, callback) => dispatch(addCustomerLevelUp(data, callback)),
    [dispatch]
  )
  const callback = useCallback(() => dispatch(closeModal()), [dispatch])

  useEffect(() => {
    return () => dispatch(resetCustomerLevelUpError())
  }, [dispatch])

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

  return (
    <>
      <ModalClose />
      <div className="modal__content">
        <div className="modal__header">
          <ModalTitle title="Connect your LevelUp account" />
          <p className="modal__subtitle">
            Enter the email address associated with your LevelUp account and
            submit a connection request to LevelUp
          </p>
        </div>
        <div className="modal__body -message ot-line-height">
          <div className="">
            <p className="ot-font-size-small">
              Soon after you click Submit, you'll receive an email from LevelUp
              at the email address you submit below asking you to accept the
              connection request.
            </p>
            <p className="ot-font-size-small">
              Don't have a LevelUp account?{' '}
              <a
                className="no-link"
                href="https://www.thelevelup.com/users/new"
                rel="noopener noreferrer"
                target="_blank"
              >
                Click here to create one.
              </a>
            </p>
            <p className="ot-font-size-small ot-color-alert">
              Please update the email address below if you use a different email
              address with your LevelUp account.
            </p>
          </div>
          <LevelUpForm
            email={email}
            loading={loading}
            error={error}
            connect={connect}
            callback={callback}
          />
        </div>
      </div>
    </>
  )
}

LevelUpModal.displayName = 'LevelUpModal'
LevelUpModal.propTypes = {
  windowRef: propTypes.shape({ current: propTypes.any }),
}

export default LevelUpModal
