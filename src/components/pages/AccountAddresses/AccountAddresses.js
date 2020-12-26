import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  fetchCustomerAddresses,
  selectCustomerAddresses,
} from '@open-tender/redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'

import { selectBrand, selectConfig } from '../../../slices'
import Addresses from './Addresses'
import {
  Container,
  Content,
  Loading,
  Main,
  PageTitle,
  PageContent,
  HeaderAccount,
  Background,
} from '../..'
import { AppContext } from '../../../App'

const AccountAddresses = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { account, addresses } = useSelector(selectConfig)
  // const { title, subtitle } = config.addresses
  const { auth } = useSelector(selectCustomer)
  const { entities, loading, error } = useSelector(selectCustomerAddresses)
  const isLoading = loading === 'pending'
  const limit = 50
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scroll(0, 0)
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
        {addresses.title} | {siteTitle}
      </Helmet>
      {isBrowser && <Background imageUrl={account.background} />}
      <Content maxWidth="76.8rem">
        <HeaderAccount title={addresses.title} maxWidth="76.8rem" />
        <Main bgColor="secondary">
          <Container>
            <PageTitle {...addresses} />
            <PageContent>
              {entities.length ? (
                <Addresses addresses={entities} isLoading={isLoading} />
              ) : isLoading ? (
                <Loading text="Retrieving your order history..." />
              ) : error ? (
                <p>{error}</p>
              ) : (
                <p>
                  Looks like you haven't added any addresses yet. Please place
                  an order to add one.
                </p>
              )}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  ) : null
}

AccountAddresses.displayName = 'AccountAddresses'
export default AccountAddresses
