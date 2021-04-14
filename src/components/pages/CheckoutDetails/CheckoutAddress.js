import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import debounce from 'lodash/debounce'
import { selectOrder, selectCheckout, updateForm } from '@open-tender/redux'
import { isString, makeFullAddress, makePhone, isEmpty } from '@open-tender/js'

import { CheckoutLink, RevenueCenter } from '../..'
import { FormHeader, Input } from '../../inputs'
import { useCallback, useEffect, useState } from 'react'
import { MapMarker, Phone, User } from '../../icons'

const iconMap = {
  address: <MapMarker />,
  unit: <MapMarker />,
  company: <MapMarker />,
  contact: <User />,
  phone: <Phone />,
}

const fields = [
  { config: 'unit', label: 'Apt / Suite', name: 'unit', type: 'text' },
  { config: 'company', label: 'Company', name: 'company', type: 'text' },
  { config: 'contact', label: 'Contact Person', name: 'contact', type: 'text' },
  { config: 'phone', label: 'Contact Phone', name: 'phone', type: 'text' },
]

const CheckoutRevenueCenter = styled('div')`
  margin: 0 0 3rem;

  & > div:first-of-type {
    padding: 2rem;
    margin: 0 0 1rem;
    border-radius: ${(props) => props.theme.border.radius};
    background-color: ${(props) => props.theme.bgColors.secondary};
  }

  & > div:last-of-type {
    display: flex;
    justify-content: flex-end;
  }
`

const CheckoutAddressChange = styled('div')`
  position: absolute;
  z-index: 3;
  top: 0;
  right: 0;
  padding: ${(props) => props.theme.inputs.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0;
    top: -1.3rem;
  }
`

const CheckoutAddress = ({ orderTypeName, errors = {} }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const order = useSelector(selectOrder)
  const { revenueCenter, serviceType } = order
  const fullAddress = makeFullAddress(order.address)
  const { check, form } = useSelector(selectCheckout)
  const checkAddress = check ? check.address || {} : {}
  const { unit, company, contact, phone } = checkAddress
  const [address, setAddress] = useState(form.address)
  const config = check ? check.config : {}
  const required = config.required ? config.required.address : []
  const displayed = config.displayed ? config.displayed.address : []
  const formFields = fields
    .filter((i) => displayed.includes(i.config) || required.includes(i.config))
    .map((i) => ({ ...i, required: required.includes(i.config) }))
  const errMsg = isString(errors) ? errors : null
  const emptyAddress = !form.address || isEmpty(form.address)

  useEffect(() => {
    if (emptyAddress && unit !== undefined) {
      const address = {
        unit,
        company,
        contact,
        phone,
      }
      setAddress(address)
      dispatch(updateForm({ address }))
    }
  }, [dispatch, emptyAddress, unit, company, contact, phone])

  const changeRevenueCenter = () => {
    history.push('/locations')
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    debounce((address) => dispatch(updateForm({ address })), 500),
    []
  )

  const handleChange = (evt) => {
    const { id, value } = evt.target
    const val = id === 'phone' ? makePhone(value) : value
    const data = { ...address, [id]: val }
    setAddress(data)
    debouncedUpdate(data)
  }

  return serviceType !== 'DELIVERY' ? (
    <>
      <FormHeader style={{ marginBottom: '2rem' }}>
        <h2>{orderTypeName} Location</h2>
      </FormHeader>
      <CheckoutRevenueCenter>
        <div>
          <RevenueCenter revenueCenter={revenueCenter} type="div" />
        </div>
        <div>
          <CheckoutLink onClick={changeRevenueCenter} text="Change" />
        </div>
      </CheckoutRevenueCenter>
    </>
  ) : (
    <>
      <FormHeader style={{ marginBottom: '3rem' }}>
        <h2>
          {formFields.length > 0
            ? 'Add Details To Your Address'
            : 'Confirm Your Delivery Address'}
        </h2>
      </FormHeader>
      <Input
        icon={iconMap.address}
        label="Address"
        name="address"
        type="text"
        value={fullAddress}
        error={errMsg}
        required={true}
        disabled={true}
      >
        <CheckoutAddressChange>
          <CheckoutLink onClick={changeRevenueCenter} text="Change" />
        </CheckoutAddressChange>
      </Input>
      {formFields.map((field) => (
        <Input
          key={field.name}
          icon={iconMap[field.name]}
          label={field.label}
          name={field.name}
          type={field.type}
          value={address[field.name] || ''}
          onChange={handleChange}
          error={errors[field.name]}
          required={field.required}
          autoComplete={field.autoComplete}
        />
      ))}
    </>
  )
}

CheckoutAddress.displayName = 'CheckoutAddress'
CheckoutAddress.propTypes = {
  orderTypeName: propTypes.string,
}

export default CheckoutAddress
