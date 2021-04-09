import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  fetchCustomerAddresses,
  selectCustomerAddresses,
} from '@open-tender/redux'
import { Helmet } from 'react-helmet'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import {
  CheckoutHeader,
  Content,
  HeaderDefault,
  Loading,
  Main,
  PageContainer,
} from '../..'
import { AppContext } from '../../../App'
import { FormWrapper } from '../../inputs'
import styled from '@emotion/styled'
import Address from './Address'

const AddressesView = styled('div')`
  margin: 3rem auto;
`

const AccountAddresses = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const config = useSelector(selectConfig)
  const { title, subtitle } = config.addresses
  const { auth } = useSelector(selectCustomer)
  const { entities, loading } = useSelector(selectCustomerAddresses)
  const isLoading = loading === 'pending'
  const limit = 50
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  useEffect(() => {
    dispatch(fetchCustomerAddresses(limit))
  }, [dispatch])

  return auth ? (
    <>
      <Helmet>
        <title>
          {title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer>
            <CheckoutHeader title={title} />
            <FormWrapper>
              {subtitle && <p>{subtitle}</p>}
              {entities.length ? (
                <AddressesView>
                  {entities.map((address) => (
                    <Address
                      key={address.customer_address_id}
                      address={address}
                    />
                  ))}
                </AddressesView>
              ) : isLoading ? (
                <Loading text="Retrieving your order history..." />
              ) : (
                <p>
                  Looks like you haven't added any addresses yet. Please place
                  an order to add one.
                </p>
              )}
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  ) : null
}

AccountAddresses.displayName = 'AccountAddresses'
export default AccountAddresses
