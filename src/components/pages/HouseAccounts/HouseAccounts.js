import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  selectCustomer,
  selectCustomerHouseAccounts,
  fetchCustomerHouseAccounts,
} from '@open-tender/redux'
import { Helmet } from 'react-helmet'

import { maybeRefreshVersion } from '../../../app/version'
import { selectAccountConfig, selectBrand } from '../../../slices'
import {
  CheckoutHeader,
  Content,
  HeaderDefault,
  Loading,
  Main,
  PageContainer,
} from '../..'
import { AppContext } from '../../../App'
import HouseAccountsList from './HouseAccountsList'
import { ErrMsg, FormWrapper } from '../../inputs'

const AccountHouseAccounts = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const account = useSelector(selectAccountConfig)
  const { title, subtitle } = account.houseAccounts
  const { entities, loading, error } = useSelector(selectCustomerHouseAccounts)
  const isLoading = loading === 'pending'
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  useEffect(() => {
    dispatch(fetchCustomerHouseAccounts())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>
          {account.houseAccounts.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer>
            <CheckoutHeader title={title} />
            <FormWrapper>
              {subtitle && <p>{subtitle}</p>}
              <ErrMsg errMsg={error} />
              {entities.length ? (
                <HouseAccountsList houseAccounts={entities} />
              ) : isLoading ? (
                <Loading text="Retrieving your house accounts..." />
              ) : (
                <p>{account.houseAccounts.empty}</p>
              )}
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

AccountHouseAccounts.displayName = 'AccountHouseAccounts'
export default AccountHouseAccounts
