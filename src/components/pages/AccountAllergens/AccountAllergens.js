import React, { useEffect, useCallback, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  fetchAllergens,
  selectAllergens,
  selectCustomer,
  selectCustomerAllergens,
  setSelectedAllergens,
  updateCustomerAllergens,
} from '@open-tender/redux'
import { Helmet } from 'react-helmet'

import { maybeRefreshVersion } from '../../../app/version'
import { selectAccountConfig, selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import {
  AllergenForm,
  CheckoutHeader,
  Content,
  HeaderDefault,
  Loading,
  Main,
  PageContainer,
} from '../..'
import styled from '@emotion/styled'
import { FormWrapper } from '../../inputs'

const AccountAllergensView = styled('div')`
  max-width: 48rem;
  margin: 0 auto;
`

const AccountAllergens = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const account = useSelector(selectAccountConfig)
  const { title, subtitle } = account.allergens
  const brandAllergens = useSelector(selectAllergens)
  const customerAllergens = useSelector(selectCustomerAllergens)
  const isLoading =
    brandAllergens.loading === 'pending' ||
    customerAllergens.loading === 'pending'
  const error = brandAllergens.error || customerAllergens.error
  const setAllergens = useCallback(
    (data) => dispatch(setSelectedAllergens(data)),
    [dispatch]
  )
  const updateAllergens = useCallback(
    (data) => dispatch(updateCustomerAllergens(data)),
    [dispatch]
  )
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  useEffect(() => {
    dispatch(fetchAllergens())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>
          {account.allergens.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer>
            <CheckoutHeader title={title} />
            <FormWrapper>
              {brandAllergens.entities.length > 0 ? (
                <AccountAllergensView>
                  {subtitle && <p>{subtitle}</p>}
                  <AllergenForm
                    allergens={brandAllergens.entities}
                    selectedAllergens={customerAllergens.entities}
                    isLoading={isLoading}
                    error={error}
                    setAllergens={setAllergens}
                    updateAllergens={updateAllergens}
                  />
                </AccountAllergensView>
              ) : isLoading ? (
                <Loading text="Retrieving your dietary preferences..." />
              ) : (
                <p>Allergens aren't currently listed on our menu.</p>
              )}
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

AccountAllergens.displayName = 'AccountAllergens'
export default AccountAllergens
