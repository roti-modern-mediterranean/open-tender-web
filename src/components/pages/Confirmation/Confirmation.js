import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectConfirmationOrder,
  resetConfirmation,
  resetGroupOrder,
  resetOrderFulfillment,
} from '@open-tender/redux'
import { ButtonStyled, Preface } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig, selectOptIns } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Content,
  Main,
  OrderFulfillment,
  HeaderDefault,
  PageContainer,
  CheckoutHeader,
  CheckoutTitle,
  Loading,
} from '../..'
import ConfirmationProfile from './ConfirmationProfile'
import CheckoutCart from '../CheckoutPayment/CheckoutCart'
import { FormHeader, FormSubmit, FormWrapper } from '../../inputs'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

const ConfirmationSubtitle = styled('div')`
  margin: 2rem 0 0;
  text-align: center;
  line-height: 1;

  p:first-of-type {
    font-weight: normal;
    font-size: 2.3rem;
    margin: 0 0 0.5rem;
  }

  p:last-of-type {
    font-weight: 500;
    font-size: 2.8rem;
    margin: 0 0 2.5rem;
  }
`

const Confirmation = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const theme = useTheme()
  const { confirmation: config } = useSelector(selectConfig)
  const brand = useSelector(selectBrand)
  const order = useSelector(selectConfirmationOrder)
  const {
    order_fulfillment,
    order_id,
    revenue_center,
    service_type,
    customer,
    cart,
    gift_cards,
    surcharges,
    discounts,
    taxes,
    totals,
    details,
  } = order || {}
  const check = {
    cart,
    gift_cards,
    surcharges,
    discounts,
    taxes,
    totals,
    details,
  }
  const { auth, profile } = useSelector(selectCustomer)
  const isNew = auth && profile && profile.order_notifications === 'NEW'
  const optIns = useSelector(selectOptIns)
  const { accepts_marketing, order_notifications } = optIns
  const showOptIns = isNew && (accepts_marketing || order_notifications)
  const hasFulfillment =
    brand.fulfillment &&
    revenue_center &&
    revenue_center.has_order_fulfillment &&
    service_type === 'PICKUP'
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!order) history.push('/')
    dispatch(resetGroupOrder())
    return () => {
      dispatch(resetConfirmation())
    }
  }, [order, auth, dispatch, history])

  useEffect(() => {
    if (!hasFulfillment) dispatch(resetOrderFulfillment())
  }, [hasFulfillment, dispatch])

  return order ? (
    <>
      <Helmet>
        <title>Confirmation | {brand.title}</title>
      </Helmet>
      <Content>
        <HeaderDefault
          title={isBrowser ? null : 'Confirmation'}
          isLogo={false}
        />
        <Main>
          <PageContainer style={{ margin: '4rem auto 8rem' }}>
            <CheckoutHeader title="Confirm & Pay">
              <CheckoutTitle>{config.title}</CheckoutTitle>
              <CheckoutTitle>{customer.first_name}'s Order</CheckoutTitle>
              <ConfirmationSubtitle>
                <Preface as="p">Payment Approved</Preface>
                <Preface as="p">{config.subtitle}</Preface>
                <div>
                  <Loading type="Puff" size={60} color={theme.colors.light} />
                </div>
              </ConfirmationSubtitle>
            </CheckoutHeader>
            <FormWrapper>
              {showOptIns && <ConfirmationProfile />}
              {hasFulfillment && (
                <OrderFulfillment
                  orderId={order_id}
                  order_fulfillment={order_fulfillment}
                />
              )}
              <FormHeader style={{ margin: '4rem 0 2rem' }}>
                <h2>Order Summary</h2>
              </FormHeader>
              {order && <CheckoutCart check={check} />}
              <FormSubmit style={{ margin: '-2rem 0 0' }}>
                <ButtonStyled
                  size="big"
                  color="secondary"
                  onClick={() => history.push('/')}
                >
                  Back Home
                </ButtonStyled>
              </FormSubmit>
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  ) : null
}

Confirmation.displayName = 'Confirmation'
export default Confirmation
