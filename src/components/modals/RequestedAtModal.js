import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { selectOrder, setRequestedAt } from '../../slices/orderSlice'
import { closeModal } from '../../slices/modalSlice'
import ModalClose from '../ModalClose'
import { RequestedAtPicker } from '../../packages'

const RequestedAtModal = () => {
  const dispatch = useDispatch()
  const { requestedAt, location } = useSelector(selectOrder)

  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleRequestedAt = (requestedAt) => {
    dispatch(setRequestedAt(requestedAt))
    dispatch(closeModal())
  }

  return (
    <>
      <ModalClose onClick={handleClose} />
      <div className="modal__content">
        <div className="modal__header">
          <p className="modal__title heading ot-font-size-h3">
            Adjust your order time
          </p>
          <p className="modal__subtitle">
            Your current order time is {requestedAt}
          </p>
        </div>
        <RequestedAtPicker
          requestedAt={requestedAt}
          setRequestedAt={handleRequestedAt}
          location={location}
        />
      </div>
    </>
  )
}

RequestedAtModal.displayName = 'RequestedAtModal'
RequestedAtModal.propTypes = {
  close: propTypes.func,
}

export default RequestedAtModal
