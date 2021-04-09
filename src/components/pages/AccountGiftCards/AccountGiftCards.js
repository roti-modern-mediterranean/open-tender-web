import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectCustomerGiftCards,
  fetchCustomerGiftCards,
  fetchCustomerCreditCards,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { openModal, selectAccountConfig, selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Content,
  HeaderDefault,
  Loading,
  Main,
  PageContainer,
  CheckoutHeader,
  ButtonGroupBig,
} from '../..'
import GiftCardsList from './GiftCardsList'
import { FormWrapper } from '../../inputs'

const AccountGiftCards = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const config = useSelector(selectAccountConfig)
  const { title, subtitle } = config.giftCards
  const { entities, loading } = useSelector(selectCustomerGiftCards)
  const isLoading = loading === 'pending'
  const { auth } = useSelector(selectCustomer)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  useEffect(() => {
    dispatch(fetchCustomerGiftCards())
    dispatch(fetchCustomerCreditCards())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>
          {config.giftCards.title} | {siteTitle}
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
                <GiftCardsList giftCards={entities} isLoading={isLoading} />
              ) : isLoading ? (
                <Loading text="Retrieving your gift cards..." />
              ) : (
                <p>{config.giftCards.empty}</p>
              )}
              <ButtonGroupBig>
                <ButtonStyled
                  size="big"
                  onClick={() => dispatch(openModal({ type: 'giftCard' }))}
                >
                  Buy a New Gift Card
                </ButtonStyled>
                <ButtonStyled
                  onClick={() => history.push('/gift-cards')}
                  size="big"
                  color="secondary"
                >
                  Buy Gift Cards For Others
                </ButtonStyled>
                <ButtonStyled
                  onClick={() =>
                    dispatch(openModal({ type: 'giftCardAssign' }))
                  }
                  size="big"
                  color="secondary"
                >
                  Add Gift Card To Account
                </ButtonStyled>
              </ButtonGroupBig>
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

AccountGiftCards.displayName = 'AccountGiftCards'
export default AccountGiftCards
