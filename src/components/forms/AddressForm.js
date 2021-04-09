import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit, useAddressForm } from '@open-tender/components'

import { ErrMsg, Input, FormSubmit, Switch, Textarea } from '../inputs'
import { Phone, User } from '../icons'

const iconMap = {
  description: <User />,
  company: <User />,
  contact: <User />,
  phone: <Phone />,
  notes: <User />,
}

const AddressForm = ({ address, loading, error, update, callback }) => {
  const {
    submitRef,
    inputRef,
    fields,
    data,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  } = useAddressForm(address, loading, error, update, callback)
  const description = fields.find((i) => i.name === 'description')
  const other = fields.filter((i) => i.name !== 'description')
  const formFields = [description, ...other]

  return (
    <form id="address-form" onSubmit={handleSubmit} noValidate>
      <ErrMsg errMsg={errors.form} style={{ margin: '0 0 2rem' }} />
      <div>
        {formFields.map((field, index) => {
          switch (field.type) {
            case 'textarea':
              return (
                <Textarea
                  key={field.name}
                  icon={iconMap[field.name]}
                  label={field.label}
                  name={field.name}
                  value={data[field.name]}
                  onChange={handleChange}
                  error={errors[field.name]}
                  required={field.required}
                />
              )
            case 'checkbox':
              return (
                <Switch
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  value={data[field.name]}
                  onChange={handleChange}
                />
              )
            default:
              return (
                <Input
                  ref={index === 0 ? inputRef : null}
                  key={field.name}
                  icon={iconMap[field.name]}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={data[field.name]}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  error={errors[field.name]}
                  required={field.required}
                />
              )
          }
        })}
      </div>
      <FormSubmit>
        <ButtonSubmit
          size="big"
          color="secondary"
          submitRef={submitRef}
          submitting={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Updates'}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

AddressForm.displayName = 'AddressForm'
AddressForm.propTypes = {
  profile: propTypes.object,
  loading: propTypes.string,
  error: propTypes.object,
  update: propTypes.func,
  optIns: propTypes.object,
  showFields: propTypes.bool,
  id: propTypes.string,
  buttonText: propTypes.string,
}

export default AddressForm
