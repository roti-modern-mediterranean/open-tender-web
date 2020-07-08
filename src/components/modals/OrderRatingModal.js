import React, { useState, useRef } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { updateOrderRating } from '@open-tender/redux'
import { Textarea, iconMap } from 'open-tender'

import { closeModal } from '../../slices'
import ModalClose from '../ModalClose'

const OrderRatingModal = ({ orderId, orderRating }) => {
  const [rating, setRating] = useState(orderRating.rating || 0)
  const [comments, setComments] = useState(orderRating.comments || '')
  const submitButton = useRef()
  const dispatch = useDispatch()
  const stars = [1, 2, 3, 4, 5]

  const handleRating = (evt, star) => {
    evt.preventDefault()
    setRating(star)
    evt.target.blur()
  }

  const handleComments = (evt) => {
    setComments(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const data = { rating, comments }
    dispatch(updateOrderRating(orderId, data))
    dispatch(closeModal())
    submitButton.current.blur()
  }

  return (
    <>
      <ModalClose />
      <div className="modal__content">
        <div className="modal__header">
          <p className="modal__title ot-heading ot-font-size-h3">
            Rate your order
          </p>
          <p className="modal__subtitle">
            Please add a rating and an any additional comments below
          </p>
        </div>
        <div className="modal__body">
          <form
            id="rating-form"
            className="form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="form__inputs">
              <div className="order__stars">
                {stars.map((star) => {
                  const classes = star <= rating ? 'ot-color-link' : ''

                  return (
                    <button
                      key={star}
                      type="button"
                      className={classes}
                      onClick={(evt) => handleRating(evt, star)}
                    >
                      <span>{iconMap['Star']}</span>
                    </button>
                  )
                })}
              </div>
              <Textarea
                label="Comments"
                name="commments"
                value={comments}
                onChange={handleComments}
                classes="form__input"
                showLabel={false}
                placeholder="add comments (optional)"
              />
            </div>
            <div className="form__submit">
              <input
                className="ot-btn"
                type="submit"
                value="Submit"
                ref={submitButton}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

OrderRatingModal.displayName = 'OrderRatingModal'
OrderRatingModal.propTypes = {
  orderId: propTypes.number,
  orderRating: propTypes.object,
}

export default OrderRatingModal
