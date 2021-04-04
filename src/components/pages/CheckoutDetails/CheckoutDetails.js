import React, { useEffect, useContext, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectMenuSlug,
  selectOrder,
  selectCheckout,
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
  handleCheckoutErrors,
  isEmpty,
} from '@open-tender/js'
import { ButtonStyled, useCheckout } from '@open-tender/components'

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
import { ErrMsg, FormHeader, FormSubmit, FormWrapper } from '../../inputs'
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
  const [details, setDetails] = useState({})
  const [hasSubmit, setHasSubmit] = useState(false)
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
  const { check, form, loading } = useSelector(selectCheckout)
  const hasDetails = !isEmpty(details)
  const errors =
    hasDetails && check.errors
      ? handleCheckoutErrors({ params: check.errors })
      : {}
  const cartValidate = useSelector(selectCartValidate)
  const validate = useCallback((order) => dispatch(validateOrder(order)), [
    dispatch,
  ])
  const cartWithDetails = { ...cartValidate, ...details }
  useCheckout(validate, cartWithDetails)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef, dispatch])

  useEffect(() => {
    if (loading === 'idle') {
      setHasSubmit(false)
      if (errors.form) {
        windowRef.current.scrollTop = 0
      } else if (hasDetails) {
        history.push('/checkout/payment')
      }
    }
  }, [errors.form, hasSubmit, hasDetails, history, loading, windowRef])

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

  const handleSubmit = () => {
    setHasSubmit(true)
    const data = {
      customer: form.customer,
      details: form.details,
    }
    setDetails(data)
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
              <ErrMsg errMsg={errors.form} style={{ margin: '0 0 2rem' }} />
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
              <CheckoutContact errors={errors.customer} />
              <CheckoutOptions errors={errors.details} />
              <FormSubmit>
                <ButtonStyled
                  size="big"
                  color="secondary"
                  disabled={loading === 'pending'}
                  onClick={handleSubmit}
                >
                  Proceed to Payment
                </ButtonStyled>
              </FormSubmit>
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

CheckoutDetails.displayName = 'CheckoutDetails'
export default CheckoutDetails
