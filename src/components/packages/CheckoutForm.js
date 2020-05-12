import React, { useState, useEffect, useRef, useCallback } from 'react'
import propTypes from 'prop-types'
import ContactInfo from './ContactInfo'
import AddressInfo from './AddressInfo'

// const useForm = () => {
//   const [inputs, setInputs] = useState({})
//   const [isWorking, setIsWorking] = useState(false)
//   const [errors, setErrors] = useState({})

//   // useEffect(() => setInputs(data), [data])

//   const handleChange = (evt) => {
//     const { id, type, value, checked } = evt.target
//     const inputValue = type === 'checkbox' ? checked : value
//     setInputs({ ...inputs, [id]: inputValue })
//   }

//   const handleSubmit = (evt) => {
//     evt.preventDefault()
//     setIsWorking(true)
//   }

//   return { inputs, handleChange, handleSubmit, isWorking, errors }
// }

const CheckoutForm = ({ order, updateOrder, config }) => {
  const [isWorking, setIsWorking] = useState(false)
  const submitButton = useRef()
  const hasCustomer = order.customer && order.customer.customer_id
  const { required_fields: required } = order.config
  // const { inputs, handleChange, handleSubmit, isWorking, errors } = useForm()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setIsWorking(true)
  }

  return (
    <form id="checkout-form" className="form" onSubmit={handleSubmit}>
      {!hasCustomer && (
        <ContactInfo
          updateOrder={updateOrder}
          requiredFields={required.customer}
          title={config.contact_info_title}
        />
      )}
      <AddressInfo
        updateOrder={updateOrder}
        requiredFields={required.address}
        title={config.address_info_title}
      />
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
  order: propTypes.object,
  updateOrder: propTypes.func,
}

export default CheckoutForm
