import React, { useEffect, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomerAddresses,
  updateCustomerAddress,
  resetCustomerAddressesError,
} from '@open-tender/redux'
import { AddressForm } from '@open-tender/components'

import { closeModal } from '../../slices'
import ModalClose from '../ModalClose'
import ModalTitle from '../ModalTitle'

const AddressModal = ({ windowRef, address }) => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(selectCustomerAddresses)
  const update = useCallback(
    (id, data, callback) => dispatch(updateCustomerAddress(id, data, callback)),
    [dispatch]
  )
  const callback = useCallback(() => dispatch(closeModal()), [dispatch])

  useEffect(() => {
    return () => dispatch(resetCustomerAddressesError())
  }, [dispatch])

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

  return (
    <>
      <ModalClose />
      <div className="modal__content">
        <div className="modal__header">
          <ModalTitle title="Update this address" />
        </div>
        <div className="modal__body">
          <AddressForm
            address={address}
            loading={loading}
            error={error}
            update={update}
            callback={callback}
          />
        </div>
      </div>
    </>
  )
}

AddressModal.displayName = 'AddressModal'
AddressModal.propTypes = {
  address: propTypes.object,
  windowRef: propTypes.shape({ current: propTypes.any }),
}

export default AddressModal
