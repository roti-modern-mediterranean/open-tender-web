import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'open-tender'
import { serviceTypeNamesMap } from 'open-tender-js'
import { resetOrderType, selectOrder } from '../../slices/orderSlice'
import { closeModal } from '../../slices/modalSlice'

const OrderTypeModal = ({ startOver }) => {
  const dispatch = useDispatch()
  const { serviceType } = useSelector(selectOrder)
  const serviceTypeName = serviceTypeNamesMap[serviceType]

  const changeOrderType = (evt) => {
    evt.preventDefault()
    dispatch(resetOrderType())
    dispatch(closeModal())
    startOver()
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
          <p className="modal__title heading ot-font-size-h3">
            Change your order type
          </p>
        </div>
        <div className="modal__body -message">
          <p>Are you sure you want to change your order type?</p>
          <p>
            This will start you over at the beginning, but the items in your
            cart will not be affected.
          </p>
        </div>
        <div className="modal__footer">
          <div className="modal__footer__buttons">
            <Button
              text={`Keep ${serviceTypeName}`}
              classes="btn btn--highlight"
              onClick={cancel}
            />
            <Button
              text="Change Order Type"
              classes="btn"
              onClick={changeOrderType}
            />
          </div>
        </div>
      </div>
    </>
  )
}

OrderTypeModal.displayName = 'OrderTypeModal'

export default OrderTypeModal
