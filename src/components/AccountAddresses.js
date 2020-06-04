import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { slugify } from '../packages/utils/helpers'
import { selectAccountConfigSections } from '../slices/configSlice'
import {
  selectToken,
  fetchCustomerAddresses,
  selectCustomerAddresses,
  updateCustomerAddress,
} from '../slices/customerSlice'
import { openModal } from '../slices/modalSlice'
import { setCurrentAddress } from '../slices/accountSlice'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionRow from './SectionRow'
import OrderAddress from './OrderAddress'
import { Button } from '../packages'
import { setAddress } from '../slices/orderSlice'

const AccountAddresses = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    addresses: { title, subtitle },
  } = useSelector(selectAccountConfigSections)
  const token = useSelector(selectToken)
  const addresses = useSelector(selectCustomerAddresses)
  console.log(addresses)

  useEffect(() => {
    dispatch(fetchCustomerAddresses({ token, limit: 5 }))
  }, [dispatch, token])

  const handleEdit = (evt, address) => {
    evt.preventDefault()
    dispatch(setCurrentAddress(address))
    dispatch(openModal('address'))
    evt.target.blur()
  }

  const handleDefault = (evt, address) => {
    evt.preventDefault()
    const data = { ...address, is_default: true }
    const addressId = address.customer_address_id
    delete data.customer_address_id
    delete data.created_at
    delete data.last_used_at
    dispatch(updateCustomerAddress({ token, addressId, data }))
    evt.target.blur()
  }

  const handleDelete = (evt, address) => {
    evt.preventDefault()
    const data = { ...address, is_active: false }
    const addressId = address.customer_address_id
    delete data.customer_address_id
    delete data.created_at
    delete data.last_used_at
    dispatch(updateCustomerAddress({ token, addressId, data }))
    evt.target.blur()
  }

  const handleReorder = (evt, address) => {
    evt.preventDefault()
    dispatch(setAddress(address))
    history.push('/')
    evt.target.blur()
  }

  const isLoading = addresses.loading === 'pending'
  const error = addresses.error
  const showAddresses = addresses.entities.length

  return (
    <div id={slugify(title)} className="section container ot-section">
      <div className="section__container">
        <SectionHeader title={title} subtitle={subtitle} />
        <SectionLoading loading={isLoading} />
        <SectionError error={error} />
        {showAddresses && (
          <div className="section__content bg-color border-radius">
            <div className="section__rows">
              {addresses.entities.map((address) => (
                <SectionRow
                  key={address.customer_address_id}
                  title={address.description || 'Address'}
                >
                  <div className="section__row__container">
                    <div className="section__row__container__content">
                      <OrderAddress address={address}>
                        <p className="font-size-small secondary-color">
                          <Button
                            text="edit"
                            classes="btn-link"
                            onClick={(evt) => handleEdit(evt, address)}
                            disabled={isLoading}
                          />
                          <span className="btn-link-separator">|</span>
                          <Button
                            text="make default"
                            classes="btn-link"
                            onClick={(evt) => handleDefault(evt, address)}
                            disabled={address.is_default || isLoading}
                          />
                          <span className="btn-link-separator">|</span>
                          <Button
                            text="delete"
                            classes="btn-link"
                            onClick={(evt) => handleDelete(evt, address)}
                            disabled={isLoading}
                          />
                        </p>
                      </OrderAddress>
                    </div>
                    <div className="section__row__container__buttons">
                      <Button
                        text="Reorder from here"
                        icon="RefreshCw"
                        onClick={(evt) => handleReorder(evt, address)}
                        classes="btn--small font-size-small"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </SectionRow>
              ))}
            </div>
          </div>
        )}
        <div className="section__footer">
          <p className="font-size-small">
            <Link to="/account/addresses" className="">
              See all addresses you've used in the past
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

AccountAddresses.displayName = 'AccountAddresses'
export default AccountAddresses
