import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAccountConfigSections } from '../slices/configSlice'
import { selectCustomer, updateCustomer } from '../slices/customerSlice'
import SectionHeader from './SectionHeader'
import SectionError from './SectionError'
import { slugify } from '../packages/utils/helpers'
import { Input } from '../packages'
import { handleFormErrors } from '../utils/errors'
import SectionLoading from './SectionLoading'

const fields = [
  { label: 'First Name', name: 'first_name', type: 'text', required: true },
  { label: 'Last Name', name: 'last_name', type: 'text', required: true },
  { label: 'Email', name: 'email', type: 'email', required: true },
  { label: 'Phone', name: 'phone', type: 'tel', required: true },
  { label: 'Company', name: 'company', type: 'text' },
]

const AccountDetails = () => {
  const dispatch = useDispatch()
  const {
    accountDetails: { title, subtitle },
  } = useSelector(selectAccountConfigSections)
  const { auth, account, loading, error } = useSelector(selectCustomer)
  const token = auth.access_token
  const submitButton = useRef()
  const [data, setData] = useState({})
  // const [updated, setUpdated] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const formErrors = error && error.params ? handleFormErrors(error.params) : {}
  const errMsg = error && !error.params ? error.detail || error.message : null

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
  }, [loading])

  useEffect(() => {
    setData(account)
  }, [account])

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    const update = fields.reduce(
      (obj, i) => ({ ...obj, [i.name]: data[i.name] }),
      {}
    )
    dispatch(updateCustomer({ token, data: update }))
    submitButton.current.blur()
  }

  const isLoading = loading === 'pending'

  return (
    <div id={slugify(title)} className="section container ot-section">
      <div className="section__container">
        <SectionHeader title={title} subtitle={subtitle} />
        <SectionLoading loading={isLoading} />
        <SectionError error={errMsg} />
        <div className="section__content bg-color border-radius">
          <form
            id="account-form"
            className="form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="section__rows">
              {fields.map((field) => (
                <Input
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={data[field.name]}
                  onChange={handleChange}
                  error={formErrors[field.name]}
                  required={field.required}
                />
              ))}
            </div>
            <div className="section__submit">
              <input
                className="btn"
                type="submit"
                value="Update Account"
                disabled={submitting}
                ref={submitButton}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

AccountDetails.displayName = 'AccountDetails'
export default AccountDetails