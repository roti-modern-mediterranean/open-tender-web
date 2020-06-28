import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { Button, ButtonSignUp } from 'open-tender'
import { FormContext } from './CheckoutForm'
import { openModal } from '../../slices/modalSlice'

const CheckoutSignUp = () => {
  const dispatch = useDispatch()
  const formContext = useContext(FormContext)
  const { config, login } = formContext

  const handleSignUp = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'signUp' }))
    evt.target.blur()
  }

  return (
    <div className="form__fieldset">
      <div className="form__legend">
        <p className="form__legend__title heading ot-font-size-h3">
          {config.sign_up.title}
        </p>
        <p className="form__legend__subtitle">{config.sign_up.subtitle}</p>
      </div>
      <div className="form__inputs">
        <div className="form__input">
          <ButtonSignUp signUp={handleSignUp} />
          <Button
            classes="btn-link"
            text="or log into an existing account"
            onClick={login}
          />
        </div>
      </div>
    </div>
  )
}

CheckoutSignUp.displayName = 'CheckoutSignUp'

export default CheckoutSignUp
