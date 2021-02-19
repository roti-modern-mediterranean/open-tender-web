import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import {
  selectCustomer,
  fetchCustomerCreditCards,
  selectCustomerCreditCards,
} from '@open-tender/redux'
import { ButtonStyled, Message } from '@open-tender/components'
import { Helmet } from 'react-helmet'

import { maybeRefreshVersion } from '../../../app/version'
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
  SectionTitle,
} from '../..'
import { AppContext } from '../../../App'
import CreditCards from './CreditCards'

const AccountCreditCards = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { windowRef } = useContext(AppContext)
  const { title: siteTitle, applePayMerchantId } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const account = useSelector(selectAccountConfig)
  const { entities, loading } = useSelector(selectCustomerCreditCards)
  const isLoading = loading === 'pending'
  const savedCards = entities.filter((i) => i.has_profile)
  const linkedCards = entities.filter((i) => !i.has_profile)
  const hasLinkedCards = !!applePayMerchantId || linkedCards.length > 0

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  useEffect(() => {
    const includeLinked = true
    dispatch(fetchCustomerCreditCards(includeLinked))
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>
          {account.creditCards.title} | {siteTitle}
        </title>
      </Helmet>
      <Background imageUrl={account.background} />
      <Content maxWidth="76.8rem">
        <HeaderAccount
          title={isBrowser ? null : account.creditCards.title}
          maxWidth="76.8rem"
          text="Back to Account"
          path="/account/settings"
          bgColor="secondary"
          borderColor="secondary"
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
              {savedCards.length > 0 && (
                <CreditCards creditCards={savedCards} isLoading={isLoading} />
              )}
              {hasLinkedCards && (
                <>
                  <SectionTitle
                    title="Linked Cards"
                    subtitle="These are cards you have saved in either Apple Pay or
                        Google Pay that have been linked with your account for
                        loyalty recognition at the point of sale in our
                        restaurants."
                  />
                  <ButtonStyled
                    onClick={() =>
                      dispatch(openModal({ type: 'creditCardLinked' }))
                    }
                  >
                    Add a New Linked Card
                  </ButtonStyled>
                  {linkedCards.length > 0 && (
                    <Message
                      color="alert"
                      size="small"
                      style={{ width: '100%', margin: '3rem 0' }}
                    >
                      PLEASE NOTE: To pay with these cards ONLINE, use the Apple
                      Pay or Google Pay option on the checkout page.
                    </Message>
                  )}
                  <CreditCards
                    creditCards={linkedCards}
                    isLoading={isLoading}
                    style={{ margin: '0' }}
                    showDefault={false}
                  />
                </>
              )}
              {entities.length === 0 && (
                <>
                  {isLoading ? (
                    <Loading text="Retrieving your cards on file..." />
                  ) : (
                    <p>Looks like you haven't added any credit cards yet.</p>
                  )}
                </>
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
