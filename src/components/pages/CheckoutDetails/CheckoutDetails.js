import React, { useEffect, useContext, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectMenuSlug,
  selectOrder,
  selectCheckout,
  selectCustomer,
  selectTimezone,
  resetCheckout,
  selectCartValidate,
  validateOrder,
} from '@open-tender/redux'
import {
  makeServiceTypeName,
  isoToDateStr,
  currentLocalDateStr,
  todayDate,
  tomorrowDate,
} from '@open-tender/js'
import { useCheckout } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { openModal, selectBrand, selectOutpostName } from '../../../slices'
import { AppContext } from '../../../App'
import {
  CheckoutHeader,
  CheckoutLink,
  Content,
  Header,
  Main,
  PageContainer,
  RevenueCenter,
} from '../..'
import { Back, Cart } from '../../buttons'
import styled from '@emotion/styled'
import {} from '../../forms'
import { FormHeader, FormWrapper } from '../../inputs'
import CheckoutContact from './CheckoutContact'
import CheckoutOptions from './CheckoutOptions'

const CheckoutRevenueCenter = styled('div')`
  margin: 0 0 3rem;

  & > div:first-of-type {
    padding: 2rem;
    margin: 0 0 1rem;
    border-radius: ${(props) => props.theme.border.radius};
    background-color: ${(props) => props.theme.bgColors.secondary};
  }

  & > div:last-of-type {
    display: flex;
    justify-content: flex-end;
  }
`

const CheckoutOrderType = styled('div')`
  text-align: center;
  margin: 0 0 4rem;

  & > span {
    display: inline-block;
    margin: 0 0 2rem;
  }

  p {
    margin: 0 0 1rem;
  }
`

const makeOrderTimeStr = (requestedAt, tz) => {
  const orderDate =
    requestedAt === 'asap'
      ? currentLocalDateStr(tz, 'yyyy-MM-dd')
      : isoToDateStr(requestedAt, tz, 'yyyy-MM-dd')
  const isToday = todayDate() === orderDate
  const isTomorrow = tomorrowDate() === orderDate
  const requestedAtText =
    requestedAt === 'asap'
      ? `ASAP / ${currentLocalDateStr(tz, 'MMMM d')}`
      : isoToDateStr(requestedAt, tz, 'h:mma / MMMM d')
  const parenthetical = isToday ? ' (today)' : isTomorrow ? ' (tomorrow)' : ''
  return `${requestedAtText}${parenthetical}`
}

const makeOrderTypeName = (order, outpostName) => {
  const { serviceType, orderType, isOutpost, isCurbside } = order
  const isCatering = orderType === 'CATERING'
  const serviceTypeName = makeServiceTypeName(
    serviceType,
    isCatering,
    isOutpost,
    outpostName
  )
  return `${isCurbside ? 'Curbside ' : ''}${serviceTypeName}`
}

const CheckoutDetails = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { windowRef } = useContext(AppContext)
  const { title: siteTitle } = useSelector(selectBrand)
  const menuSlug = useSelector(selectMenuSlug)
  const order = useSelector(selectOrder)
  const { serviceType, revenueCenter, requestedAt } = order
  const outpostName = useSelector(selectOutpostName)
  const orderTypeName = makeOrderTypeName(order, outpostName)
  const tz = useSelector(selectTimezone)
  const requestedAtStr = makeOrderTimeStr(requestedAt, tz)
  const otherServiceType = serviceType === 'PICKUP' ? 'Delivery' : 'Pickup'
  const { auth } = useSelector(selectCustomer)
  const { check, form, loading, isGuest } = useSelector(selectCheckout)
  // const backSlug = isGuest
  //   ? '/checkout/guest'
  //   : auth
  //   ? menuSlug
  //   : '/checkout/register'
  // const backSlug = auth ? menuSlug : '/checkout/register'
  const cartValidate = useSelector(selectCartValidate)
  const validate = useCallback((order) => dispatch(validateOrder(order)), [
    dispatch,
  ])
  // const cartWithCustomer = { ...cartValidate, customer: form.customer }
  useCheckout(validate, cartValidate)

  // const data = {
  //   customer: contact,
  //   details:
  // }

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef, dispatch])

  // useEffect(() => {
  //   if (error) windowRef.current.scrollTop = 0
  // }, [error, windowRef])

  const changeRevenueCenter = () => {
    history.push('/locations')
  }

  const changeTime = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'requestedAt' }))
  }

  const changeServiceType = () => {
    dispatch(openModal({ type: 'orderType' }))
  }

  const reset = () => {
    dispatch(resetCheckout())
    history.push(menuSlug)
  }

  return (
    <>
      <Helmet>
        <title>Checkout Details | {siteTitle}</title>
      </Helmet>
      <Content>
        <Header
          left={<Back onClick={() => history.push(menuSlug)} />}
          right={<Cart />}
        />
        <Main>
          <PageContainer style={{ marginTop: '0' }}>
            <CheckoutHeader title={`${orderTypeName} Details`}>
              <CheckoutLink onClick={reset} text="Reset Checkout" />
            </CheckoutHeader>
            <FormWrapper>
              <FormHeader style={{ marginBottom: '2rem' }}>
                <h2>{orderTypeName} Location</h2>
              </FormHeader>
              <CheckoutRevenueCenter>
                <div>
                  <RevenueCenter revenueCenter={revenueCenter} type="div" />
                </div>
                <div>
                  <CheckoutLink onClick={changeRevenueCenter} text="Change" />
                </div>
              </CheckoutRevenueCenter>
              <CheckoutOrderType>
                <p>
                  Currently your order is set to {orderTypeName.toLowerCase()}
                </p>
                <CheckoutLink
                  onClick={changeServiceType}
                  text={`Switch to ${otherServiceType}`}
                />
                <FormHeader>
                  <h2>
                    {orderTypeName.replace('Curbside ', '')} Time
                    <button onClick={changeTime}>{requestedAtStr}</button>
                  </h2>
                </FormHeader>
              </CheckoutOrderType>
              <CheckoutContact />
              <CheckoutOptions />
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

CheckoutDetails.displayName = 'CheckoutDetails'
export default CheckoutDetails
