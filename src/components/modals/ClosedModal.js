import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
// import { closeModal } from '../../slices/modalSlice'
import { Button } from '../../packages'
import { resetRevenueCenter, resetOrderType } from '../../slices/orderSlice'
import { closeModal } from '../../slices/modalSlice'
// import ModalClose from '../ModalClose'

const defaultText = {
  title: 'Location currently closed',
  msg: "We're sorry, but this location is currently closed.",
}

const ClosedModal = ({ title = defaultText.title, msg = defaultText.msg }) => {
  const dispatch = useDispatch()

  // const handleClose = () => {
  //   dispatch(closeModal())
  // }

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

  return (
    <>
      {/* <ModalClose classes="btn-link" onClick={handleClose} /> */}
      <div className="modal__content">
        <div className="modal__header">
          <p className="modal__title heading ot-font-size-h3">{title}</p>
        </div>
        <div className="modal__body">{msg}</div>
        <div className="modal__footer">
          <div className="modal__footer__buttons">
            <Button
              text="Change Location"
              classes="btn btn--highlight"
              onClick={changeLocation}
            />
            <Button text="Start Over" classes="btn" onClick={startOver} />
          </div>
        </div>
      </div>
    </>
  )
}

ClosedModal.displayName = 'ClosedModal'
ClosedModal.propTypes = {
  close: propTypes.func,
}

export default ClosedModal
