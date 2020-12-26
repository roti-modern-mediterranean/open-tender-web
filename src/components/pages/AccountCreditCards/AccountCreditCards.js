import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  fetchCustomerCreditCards,
  selectCustomerCreditCards,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'

import { selectAccountConfig, selectBrand, openModal } from '../../../slices'
import {
  Background,
  Container,
  Content,
  HeaderAccount,
  Loading,
  Main,
  PageTitle,
  PageContent,
} from '../..'
import { AppContext } from '../../../App'
import CreditCards from './CreditCards'
import { useHistory } from 'react-router-dom'

const AccountCreditCards = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const account = useSelector(selectAccountConfig)
  const { entities, loading, error } = useSelector(selectCustomerCreditCards)
  const isLoading = loading === 'pending'
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scroll(0, 0)
  }, [windowRef])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  useEffect(() => {
    dispatch(fetchCustomerCreditCards())
  }, [dispatch])

  return (
    <>
      <Helmet>
        {account.creditCards.title} | {siteTitle}
      </Helmet>
      {isBrowser && <Background imageUrl={account.background} />}
      <Content maxWidth="76.8rem">
        <HeaderAccount
          title={account.creditCards.title}
          maxWidth="76.8rem"
          text="Back to Settings"
          path="/account/settings"
        />
        <Main bgColor="secondary">
          <Container>
            <PageTitle {...account.creditCards} />
            <PageContent>
              <ButtonStyled
                onClick={() => dispatch(openModal({ type: 'creditCard' }))}
              >
                Add a New Credit Card
              </ButtonStyled>
              {entities.length ? (
                <CreditCards creditCards={entities} isLoading={isLoading} />
              ) : isLoading ? (
                <Loading text="Retrieving your cards on file..." />
              ) : error ? (
                <p>{error}</p>
              ) : (
                <p>Looks like you haven't added any credit cards yet.</p>
              )}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

AccountCreditCards.displayName = 'AccountCreditCards'
export default AccountCreditCards
