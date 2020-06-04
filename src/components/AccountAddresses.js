import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { slugify } from '../packages/utils/helpers'
import { selectAccountConfigSections } from '../slices/configSlice'
import {
  selectToken,
  fetchCustomerAddresses,
  selectCustomerAddresses,
} from '../slices/customerSlice'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import Addresses from './Addresses'

const AccountAddresses = () => {
  const dispatch = useDispatch()
  const {
    addresses: { title, subtitle },
  } = useSelector(selectAccountConfigSections)
  const token = useSelector(selectToken)
  const addresses = useSelector(selectCustomerAddresses)

  useEffect(() => {
    dispatch(fetchCustomerAddresses({ token, limit: 5 }))
  }, [dispatch, token])

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
          <Addresses
            addresses={addresses.entities}
            token={token}
            isLoading={isLoading}
          />
        )}
        <div className="section__footer">
          <p className="font-size-small">
            <Link to="/addresses" className="">
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
