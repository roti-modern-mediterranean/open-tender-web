import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  updateCustomerAddress,
  removeCustomerAddress,
  setAddress,
} from '@open-tender/redux'
import { Button } from '@open-tender/components'

import { openModal } from '../slices'
import SectionRow from './SectionRow'
import OrderAddress from './OrderAddress'

const Addresses = ({ addresses, isLoading }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleEdit = (evt, address) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'address', args: { address } }))
    evt.target.blur()
  }

  const handleDefault = (evt, address) => {
    evt.preventDefault()
    const data = { ...address, is_default: true }
    const addressId = address.customer_address_id
    delete data.customer_address_id
    delete data.created_at
    delete data.last_used_at
    dispatch(updateCustomerAddress(addressId, data))
    evt.target.blur()
  }

  const handleDelete = (evt, address) => {
    evt.preventDefault()
    const addressId = address.customer_address_id
    dispatch(removeCustomerAddress(addressId))
    evt.target.blur()
  }

  const handleReorder = (evt, address) => {
    evt.preventDefault()
    dispatch(setAddress(address))
    history.push('/locations')
    evt.target.blur()
  }

  return (
    <div className="section__content ot-bg-color-primary ot-border-radius">
      <div className="section__rows">
        {addresses.map((address) => (
          <SectionRow
            key={address.customer_address_id}
            title={address.description || 'Address'}
          >
            <div className="section__row__container">
              <div className="section__row__container__content">
                {address.is_default && (
                  <p className="ot-preface ot-font-size-x-small ot-color-secondary">
                    Default
                  </p>
                )}
                <OrderAddress address={address} isDefault={address.is_default}>
                  <p className="ot-font-size-small ot-color-secondary">
                    <Button
                      text="edit"
                      classes="ot-btn-link"
                      onClick={(evt) => handleEdit(evt, address)}
                      disabled={isLoading}
                    />
                    <span className="link-separator">|</span>
                    <Button
                      text="make default"
                      classes="ot-btn-link"
                      onClick={(evt) => handleDefault(evt, address)}
                      disabled={address.is_default || isLoading}
                    />
                    <span className="link-separator">|</span>
                    <Button
                      text="remove"
                      classes="ot-btn-link"
                      onClick={(evt) => handleDelete(evt, address)}
                      disabled={isLoading}
                    />
                  </p>
                </OrderAddress>
              </div>
              <div className="section__row__container__buttons">
                <Button
                  text="Order from here"
                  icon="RefreshCw"
                  onClick={(evt) => handleReorder(evt, address)}
                  classes="ot-btn--small ot-font-size-small"
                  disabled={isLoading}
                />
              </div>
            </div>
          </SectionRow>
        ))}
      </div>
    </div>
  )
}

Addresses.displayName = 'Addresses'
Addresses.prototypes = {
  addresses: propTypes.array,
  token: propTypes.string,
  isLoading: propTypes.boolean,
}
export default Addresses
