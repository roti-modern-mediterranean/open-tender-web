import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectToken,
  fetchCustomerAddresses,
  selectCustomerAddresses,
} from 'open-tender-redux'
import { slugify } from 'open-tender-js'

import { selectConfigAccountSections } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import Addresses from './Addresses'

const AccountAddresses = () => {
  const sectionRef = useRef()
  const dispatch = useDispatch()
  const {
    addresses: { title, subtitle },
  } = useSelector(selectConfigAccountSections)
  const token = useSelector(selectToken)
  const addresses = useSelector(selectCustomerAddresses)
  const isLoading = addresses.loading === 'pending'
  const error = addresses.error
  const showAddresses = addresses.entities.length
  const limit = 5

  useEffect(() => {
    dispatch(fetchCustomerAddresses(limit))
  }, [dispatch, token])

  useEffect(() => {
    if (error) window.scrollTo(0, sectionRef.current.offsetTop)
  }, [error])

  return (
    <div
      id={slugify(title)}
      ref={sectionRef}
      className="section container ot-section"
    >
      <div className="section__container">
        <SectionHeader title={title} subtitle={subtitle} />
        <SectionLoading loading={isLoading} />
        <SectionError error={error} />
        {showAddresses && (
          <Addresses addresses={addresses.entities} isLoading={isLoading} />
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
