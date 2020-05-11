import React, { useState, useEffect, useRef } from 'react'
import propTypes from 'prop-types'
import { Input } from './Inputs'

const useForm = () => {
  const [inputs, setInputs] = useState({})
  const [isWorking, setIsWorking] = useState(false)
  const [errors, setErrors] = useState({})

  // useEffect(() => setInputs(data), [data])

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const inputValue = type === 'checkbox' ? checked : value
    setInputs({ ...inputs, [id]: inputValue })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setIsWorking(true)
  }

  return { inputs, handleChange, handleSubmit, isWorking, errors }
}

const CheckoutForm = ({ order, postSubmit }) => {
  const submitButton = useRef()
  const { inputs, handleChange, handleSubmit, isWorking, errors } = useForm()
  // console.log(inputs)
  return (
    <form id="checkout-form" className="form" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <legend className="form__legend heading ot-font-size-h5">
          Contact Info
        </legend>
        <div className="form__inputs">
          <Input
            label="First Name"
            name="first_name"
            type="text"
            value={inputs.first_name}
            onChange={handleChange}
            error={errors.first_name}
            required={true}
            classes="form__input--left"
          />
          <Input
            label="Last Name"
            name="last_name"
            type="text"
            value={inputs.last_name}
            onChange={handleChange}
            error={errors.last_name}
            required={true}
            classes="form__input--right"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={inputs.email}
            onChange={handleChange}
            error={errors.email}
            required={true}
          />
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={inputs.phone}
            onChange={handleChange}
            error={errors.phone}
            required={true}
          />
        </div>
      </fieldset>
      <input
        className="btn btn--big"
        type="submit"
        value="Submit Order"
        disabled={isWorking}
        ref={submitButton}
      />
    </form>
  )
}

CheckoutForm.displayName = 'CheckoutForm'
CheckoutForm.propTypes = {
  cart: propTypes.array,
  postSubmit: propTypes.func,
}

export default CheckoutForm
