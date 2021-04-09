import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit, useOrderFulfillmentForm } from '@open-tender/components'
import { FormSubmit } from '../inputs'
import { ButtonGroupBig, Curbside } from '..'

const arrivedText =
  "Thanks for letting us know you've arrived! We'll be out with your order shortly."

const OrderFulfillmentForm = ({
  orderId,
  fulfillment,
  loading,
  error,
  update,
  settings,
  showAllFields,
}) => {
  const {
    submitRef,
    fields,
    data,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  } = useOrderFulfillmentForm(
    orderId,
    fulfillment,
    loading,
    error,
    update,
    settings,
    showAllFields
  )

  return (
    <form id="order-fulfillment-form" onSubmit={handleSubmit} noValidate>
      <Curbside
        fields={fields}
        data={data}
        errors={errors}
        handleChange={handleChange}
      />
      <FormSubmit>
        {data.has_arrived ? (
          <p>{arrivedText}</p>
        ) : (
          <ButtonGroupBig>
            <ButtonSubmit
              submitRef={submitRef}
              submitting={submitting}
              size="big"
            >
              {submitting ? 'Submitting' : settings.button}
            </ButtonSubmit>
          </ButtonGroupBig>
        )}
      </FormSubmit>
    </form>
  )
}

OrderFulfillmentForm.displayName = 'OrderFulfillmentForm'
OrderFulfillmentForm.propTypes = {
  orderId: propTypes.number,
  fulfillment: propTypes.object,
  loading: propTypes.string,
  error: propTypes.object,
  update: propTypes.func,
  settings: propTypes.object,
}

export default OrderFulfillmentForm
