import React from 'react'
import propTypes from 'prop-types'
import Button from './Button'
import ButtonSignUp from './ButtonSignUp'

const CheckoutSignUp = ({ config, handleGuest }) => {
  return (
    <div className="form__fieldset">
      <div className="form__legend">
        <p className="form__legend__title heading ot-font-size-h4">
          {config.title}
        </p>
        <p className="form__legend__subtitle">{config.subtitle}</p>
      </div>
      <div className="form__inputs">
        <div className="form__input">
          <ButtonSignUp />
          <Button
            classes="btn-link"
            text="or checkout as a guest"
            onClick={handleGuest}
          />
        </div>
      </div>
    </div>
  )
}

CheckoutSignUp.displayName = 'CheckoutSignUp'
CheckoutSignUp.propTypes = {
  handleGuest: propTypes.func,
}

export default CheckoutSignUp
