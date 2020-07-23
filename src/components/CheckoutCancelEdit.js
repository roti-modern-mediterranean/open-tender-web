import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder, resetOrder, resetCheckout } from '@open-tender/redux'
import { Button } from '@open-tender/components'

const CheckoutCancelEdit = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { orderId } = useSelector(selectOrder)

  const handleCancelEdit = (evt) => {
    evt.preventDefault()
    dispatch(resetOrder())
    dispatch(resetCheckout())
    history.push(`/account`)
    evt.target.blur()
  }

  return orderId ? (
    <div className="checkout__cancel slide-up">
      <p className="ot-line-height ot-color-secondary">
        You're currently editing order #{orderId}.{' '}
        <Button
          text="Click here to cancel this edit."
          classes="ot-btn-link"
          onClick={handleCancelEdit}
        />
      </p>
    </div>
  ) : null
}

CheckoutCancelEdit.displayName = 'CheckoutCancelEdit'
CheckoutCancelEdit.propTypes = {
  text: propTypes.string,
  classes: propTypes.string,
  icon: propTypes.element,
}

export default CheckoutCancelEdit
