import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTheme } from '@emotion/react'
import {
  selectCustomer,
  fetchCustomerCreditCards,
  selectCustomerCreditCards,
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
  PaymentTypes,
} from '../..'
import { AppContext } from '../../../App'
import { FormWrapper } from '../../inputs'
import { CreditCard, Roti } from '../../icons'
import LevelUpLoyalty from '../Rewards/LevelUpLoyalty'
import PaymentCreditCards from './PaymentCreditCards'
import PaymentLinkedCards from './PaymentLinkedCards'

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
  const theme = useTheme()
  const [tenderType, setTenderType] = useState('CREDIT')
  const { windowRef } = useContext(AppContext)
  const { title: siteTitle, applePayMerchantId, has_levelup } = useSelector(
    selectBrand
  )
  const { auth } = useSelector(selectCustomer)
  const account = useSelector(selectAccountConfig)
  const ccConfig = account.creditCards
  const { entities, loading } = useSelector(selectCustomerCreditCards)
  const savedCards = entities.filter((i) => i.has_profile)
  const linkedCards = entities.filter((i) => !i.has_profile)
  const hasLinkedCards = !!applePayMerchantId || linkedCards.length > 0
  const filteredTenderTypes = !has_levelup
    ? tenderTypes.filter((i) => i.tender_type !== 'LEVELUP')
    : tenderTypes
  const showLoading =
    loading === 'pending' && savedCards.length === 0 && !hasLinkedCards

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
                showLoading ? (
                  <Loading type="Puff" size={60} color={theme.colors.light} />
                ) : (
                  <>
                    <PaymentCreditCards savedCards={savedCards} />
                    {hasLinkedCards && (
                      <PaymentLinkedCards linkedCards={linkedCards} />
                    )}
                  </>
                )
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
