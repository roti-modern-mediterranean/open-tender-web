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
  const config = useSelector(selectConfig)
  const { auth } = useSelector(selectCustomer)
  const { entities, loading } = useSelector(selectCustomerAddresses)
  const isLoading = loading === 'pending'
  const limit = 50
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
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
          {config.addresses.title} | {siteTitle}
        </title>
      </Helmet>
      {isBrowser && <Background imageUrl={config.account.background} />}
      <Content maxWidth="76.8rem">
        <HeaderAccount
          title={config.addresses.title}
          maxWidth="76.8rem"
          text="Back to Settings"
          path="/account/settings"
        />
        <Main bgColor="secondary">
          <Container>
            <PageTitle {...config.addresses} />
            <PageContent>
              {entities.length ? (
                <Addresses addresses={entities} isLoading={isLoading} />
              ) : isLoading ? (
                <Loading text="Retrieving your order history..." />
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
