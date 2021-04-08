import React, { useContext, useEffect, useState } from 'react'
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
  CheckoutHeader,
  Content,
  HeaderDefault,
  Loading,
  Main,
  PageContainer,
  PageContent,
  PageSection,
  PageTitle,
  PageTitleButtons,
  PaymentTypes,
} from '../..'
import { AppContext } from '../../../App'
// import CreditCards from './CreditCards'
import styled from '@emotion/styled'
import { FormWrapper } from '../../inputs'
import { CreditCard, Roti } from '../../icons'
import LevelUpLoyalty from '../Rewards/LevelUpLoyalty'
import PaymentCreditCards from './PaymentCreditCards'

const CreditCardMessage = styled('div')`
  text-align: center;
  margin: ${(props) => props.theme.layout.padding} auto;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.paddingMobile} auto;
  }
`

const tenderTypes = [
  {
    icon: <CreditCard size="3.4rem" color="#FBF8EA" />,
    text: 'Credit Card',
    tenderType: 'CREDIT',
  },
  { icon: <Roti />, text: 'Roti', tenderType: 'LEVELUP' },
]

const Payment = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [tenderType, setTenderType] = useState('CREDIT')
  const { windowRef } = useContext(AppContext)
  const { title: siteTitle, applePayMerchantId, has_levelup } = useSelector(
    selectBrand
  )
  const { auth } = useSelector(selectCustomer)
  const account = useSelector(selectAccountConfig)
  const ccConfig = account.creditCards
  const { entities, loading } = useSelector(selectCustomerCreditCards)
  const isLoading = loading === 'pending'
  const savedCards = entities.filter((i) => i.has_profile)
  const linkedCards = entities.filter((i) => !i.has_profile)
  const hasLinkedCards = !!applePayMerchantId || linkedCards.length > 0
  const filteredTenderTypes = !has_levelup
    ? tenderTypes.filter((i) => i.tender_type !== 'LEVELUP')
    : tenderTypes

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
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer>
            <CheckoutHeader title={ccConfig.title} />
            <FormWrapper>
              <PaymentTypes
                tenderTypes={filteredTenderTypes}
                tenderType={tenderType}
                setTenderType={setTenderType}
              />
              {tenderType === 'CREDIT' ? (
                <>
                  <PaymentCreditCards savedCards={savedCards} />
                  {hasLinkedCards && (
                    <PageSection
                      title="Linked Cards"
                      subtitle="These are cards you have saved in either Apple Pay or
                        Google Pay that have been linked with your account for
                        loyalty recognition at the point of sale in our
                        restaurants."
                    >
                      <PageTitleButtons>
                        <ButtonStyled
                          onClick={() =>
                            dispatch(openModal({ type: 'creditCardLinked' }))
                          }
                        >
                          Add a New Linked Card
                        </ButtonStyled>
                      </PageTitleButtons>
                      {linkedCards.length > 0 && (
                        <CreditCardMessage>
                          <Message color="alert" size="small" as="div">
                            PLEASE NOTE: To pay with these cards ONLINE, use the
                            Apple Pay or Google Pay option on the checkout page.
                          </Message>
                        </CreditCardMessage>
                      )}
                      {/* <CreditCards
                    creditCards={linkedCards}
                    isLoading={isLoading}
                    showDefault={false}
                  /> */}
                    </PageSection>
                  )}
                </>
              ) : tenderType === 'LEVELUP' ? (
                <LevelUpLoyalty />
              ) : null}
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

Payment.displayName = 'Payment'
export default Payment
