import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCustomer, updateCustomer } from 'open-tender-redux'
import { slugify, handleFormErrors } from 'open-tender-js'
import { Input } from 'open-tender'

import { selectConfigAccountSections } from '../slices'
import SectionHeader from './SectionHeader'
import SectionError from './SectionError'
import SectionLoading from './SectionLoading'

const fields = [
  { label: 'First Name', name: 'first_name', type: 'text', required: true },
  { label: 'Last Name', name: 'last_name', type: 'text', required: true },
  { label: 'Email', name: 'email', type: 'email', required: true },
  { label: 'Phone', name: 'phone', type: 'tel', required: true },
  { label: 'Company', name: 'company', type: 'text' },
]

const AccountProfile = () => {
  const dispatch = useDispatch()
  const {
    accountDetails: { title, subtitle },
  } = useSelector(selectConfigAccountSections)
  const { profile, loading, error } = useSelector(selectCustomer)
  const submitButton = useRef()
  const [data, setData] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const formErrors = error && error.params ? handleFormErrors(error.params) : {}
  const errMsg = error && !error.params ? error.detail || error.message : null

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
  }, [loading])

  useEffect(() => {
    setData(profile)
  }, [profile])

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
    dispatch(updateCustomer(update))
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

AccountProfile.displayName = 'AccountProfile'
export default AccountProfile
