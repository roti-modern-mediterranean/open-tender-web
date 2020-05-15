import React, { useState, useRef, useEffect } from 'react'
// import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../../slices/modalSlice'
import { loginCustomer, selectCustomer } from '../../slices/customerSlice'
import ModalClose from '../ModalClose'
import { Input } from '../../packages'

const LoginModal = () => {
  const [data, setData] = useState({})
  const submitButton = useRef()
  const dispatch = useDispatch()
  const customer = useSelector(selectCustomer)
  const { loading, error, account } = customer

  useEffect(() => {
    if (account) dispatch(closeModal())
  }, [account, dispatch])

  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    dispatch(loginCustomer(data))
    submitButton.current.blur()
  }

  return (
    <>
      <ModalClose classes="btn-link" onClick={handleClose} />
      <div className="modal__content">
        <div className="modal__header">
          <p className="modal__title heading ot-font-size-h3">
            Log into your account
          </p>
          <p className="modal__subtitle">
            Please enter the email address and password associated with your
            account below
          </p>
        </div>
        <div className="modal__body">
          <form
            id="checkout-form"
            className="form"
            onSubmit={handleSubmit}
            noValidate
          >
            {error && <div className="form__error form-error">{error}</div>}
            <div className="form__inputs">
              <Input
                label="Email"
                name="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                required={true}
                classes="form__input"
              />
              <Input
                label="Password"
                name="password"
                type="password"
                value={data.password}
                onChange={handleChange}
                required={true}
                classes="form__input"
              />
            </div>
            <input
              className="btn"
              type="submit"
              value="Submit"
              disabled={loading === 'pending'}
              ref={submitButton}
            />
          </form>
        </div>
      </div>
    </>
  )
}

LoginModal.displayName = 'LoginModal'

export default LoginModal
