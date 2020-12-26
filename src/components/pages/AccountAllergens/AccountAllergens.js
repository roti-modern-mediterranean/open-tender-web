import React, { useEffect, useCallback, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchAllergens,
  selectAllergens,
  selectCustomerAllergens,
  setSelectedAllergens,
  updateCustomerAllergens,
} from '@open-tender/redux'
import { AllergenForm } from '@open-tender/components'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'

import { selectAccountConfig, selectBrand } from '../../../slices'
import {
  Container,
  Content,
  Loading,
  Main,
  PageTitle,
  PageContent,
  HeaderAccount,
  Background,
  FormWrapper,
} from '../..'
import { AppContext } from '../../../App'

const AccountAllergens = () => {
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const account = useSelector(selectAccountConfig)
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
    windowRef.current.scroll(0, 0)
  }, [windowRef])

  useEffect(() => {
    dispatch(fetchAllergens())
  }, [dispatch])

  return (
    <>
      <Helmet>
        {account.allergens.title} | {siteTitle}
      </Helmet>
      {isBrowser && <Background imageUrl={account.background} />}
      <Content maxWidth="76.8rem">
        <HeaderAccount
          title={account.allergens.title}
          maxWidth="76.8rem"
          text="Back to Settings"
          path="/account/settings"
        />
        <Main bgColor="secondary">
          <Container>
            <PageTitle {...account.allergens} />
            <PageContent>
              {brandAllergens.entities.length ? (
                <FormWrapper>
                  <AllergenForm
                    allergens={brandAllergens.entities}
                    selectedAllergens={customerAllergens.entities}
                    isLoading={isLoading}
                    error={error}
                    setAllergens={setAllergens}
                    updateAllergens={updateAllergens}
                  />
                </FormWrapper>
              ) : isLoading ? (
                <Loading text="Retrieving your order history..." />
              ) : error ? (
                <p>{error}</p>
              ) : (
                <p>Allergens aren't currently listed on our menu.</p>
              )}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

AccountAllergens.displayName = 'AccountAllergens'
export default AccountAllergens
