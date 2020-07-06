import React, { useEffect, useRef } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  fetchCustomerAddresses,
  selectCustomerAddresses,
} from 'open-tender-redux'

import { selectConfig } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import Addresses from './Addresses'

const AccountAddressesPage = () => {
  const sectionRef = useRef()
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    addresses: { title, subtitle },
  } = useSelector(selectConfig)
  const { auth } = useSelector(selectCustomer)
  const addresses = useSelector(selectCustomerAddresses)
  const isLoading = addresses.loading === 'pending'
  const error = addresses.error
  const showAddresses = addresses.entities.length
  const limit = 50

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  useEffect(() => {
    if (error) window.scrollTo(0, sectionRef.current.offsetTop)
  }, [error])

  useEffect(() => {
    dispatch(fetchCustomerAddresses(limit))
  }, [dispatch])

  return auth ? (
    <>
      <h1 className="sr-only">{title}</h1>
      <div className="sections bg-secondary-color">
        <div ref={sectionRef} className="section container">
          <div className="section__container">
            <SectionHeader title={title} subtitle={subtitle}>
              <div className="section__header__back">
                <p className="font-size-small">
                  <Link to="/account">Head back to your account page</Link>
                </p>
              </div>
            </SectionHeader>
            <SectionLoading loading={isLoading} />
            <SectionError error={error} />
            {showAddresses && (
              <Addresses addresses={addresses.entities} isLoading={isLoading} />
            )}
            <div className="section__footer">
              <p className="font-size-small">
                <Link to="/account">Head back to your account page</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null
}

AccountAddressesPage.displayName = 'AccountAddressesPage'
export default AccountAddressesPage
