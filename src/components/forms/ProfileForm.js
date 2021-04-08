import React from 'react'
import propTypes from 'prop-types'
import { optionsOrderNotificationsTemp } from '@open-tender/js'
import { ButtonSubmit, useProfileForm } from '@open-tender/components'

import { Checkbox, ErrMsg, Input, FormSubmit, RadioGroup } from '../inputs'
import { Lock, Mail, Phone, User } from '../icons'

const iconMap = {
  first_name: <User />,
  last_name: <User />,
  email: <Mail />,
  password: <Lock />,
  phone: <Phone />,
  company: <User />,
}

const ProfileForm = ({
  profile,
  loading,
  error,
  update,
  optIns = {},
  showFields = true,
  id = 'account-form',
  buttonText = 'Update Account',
}) => {
  const {
    submitRef,
    formRef,
    order_notifications,
    accepts_marketing,
    data,
    errors,
    submitting,
    fields,
    errMsg,
    handleChange,
    handleRadio,
    handleSubmit,
  } = useProfileForm(profile, loading, error, update, optIns)
  const emptyRequired =
    fields.filter((i) => i.required && !data[i.name]).length > 0

  return (
    <form id={id} ref={formRef} onSubmit={handleSubmit} noValidate>
      <ErrMsg errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <div>
        {showFields &&
          fields.map((field) => (
            <Input
              key={field.name}
              icon={iconMap[field.name]}
              label={field.label}
              name={field.name}
              type={field.type}
              value={data[field.name]}
              placeholder={field.placeholder}
              onChange={handleChange}
              error={errors ? errors[field.name] : ''}
              required={field.required}
              autoComplete={field.autoComplete}
            />
          ))}
        {order_notifications && (
          <RadioGroup
            label={order_notifications.title}
            name="order_notifications"
            value={data.order_notifications}
            options={optionsOrderNotificationsTemp}
            onChange={handleRadio}
            showLabel={true}
            required={true}
            description={order_notifications.description}
          />
        )}
        {accepts_marketing && (
          <Checkbox
            label={accepts_marketing.description}
            id="accepts_marketing"
            on={data.accepts_marketing}
            onChange={handleChange}
          />
        )}
      </div>
      <FormSubmit>
        <ButtonSubmit
          size="big"
          color="secondary"
          disabled={emptyRequired}
          submitRef={submitRef}
          submitting={submitting}
        >
          {submitting ? 'Submitting...' : buttonText}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

ProfileForm.displayName = 'ProfileForm'
ProfileForm.propTypes = {
  profile: propTypes.object,
  loading: propTypes.string,
  error: propTypes.object,
  update: propTypes.func,
  optIns: propTypes.object,
  showFields: propTypes.bool,
  id: propTypes.string,
  buttonText: propTypes.string,
}

export default ProfileForm
