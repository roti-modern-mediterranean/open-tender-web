import React, { useEffect, useRef } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  selectToken,
  fetchCustomerAddresses,
  selectCustomerAddresses,
} from '../slices/customerSlice'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import Addresses from './Addresses'
import { selectConfig } from '../slices/configSlice'

const AccountAddressesPage = () => {
  const sectionRef = useRef()
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    addresses: { title, subtitle },
  } = useSelector(selectConfig)
  const token = useSelector(selectToken)
  const { account } = useSelector(selectCustomer)
  const addresses = useSelector(selectCustomerAddresses)
  const isLoading = addresses.loading === 'pending'
  const error = addresses.error
  const showAddresses = addresses.entities.length

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (error) window.scrollTo(0, sectionRef.current.offsetTop)
  }, [error])

  useEffect(() => {
    if (!account) return history.push('/')
  }, [account, history])

  useEffect(() => {
    dispatch(fetchCustomerAddresses({ token, limit: 50 }))
  }, [dispatch, token])

  return account ? (
    <>
      <h1 className="sr-only">{title}</h1>
      <div className="sections bg-secondary-color">
        <div ref={sectionRef} className="section container ot-section">
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
              <Addresses
                addresses={addresses.entities}
                token={token}
                isLoading={isLoading}
              />
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
