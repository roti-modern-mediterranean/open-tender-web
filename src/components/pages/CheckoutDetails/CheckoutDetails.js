import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react'
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
  selectCartTotal,
} from '@open-tender/redux'
import {
  makeServiceTypeName,
  isoToDateStr,
  currentLocalDateStr,
  todayDate,
  tomorrowDate,
  handleCheckoutErrors,
  isEmpty,
  formatDollars,
  prepareOrder,
} from '@open-tender/js'
import { ButtonStyled, useCheckout } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { openModal, selectBrand, selectOutpostName } from '../../../slices'
import { AppContext } from '../../../App'
import {
  CartFooter,
  CheckoutHeader,
  CheckoutLink,
  Content,
  Header,
  Loading,
  Main,
  PageContainer,
  RevenueCenter,
} from '../..'
import { Back, Cart } from '../../buttons'
import styled from '@emotion/styled'
import {} from '../../forms'
import { ErrMsg, FormHeader, FormWrapper } from '../../inputs'
import CheckoutContact from './CheckoutContact'
import CheckoutOptions from './CheckoutOptions'
import { useTheme } from '@emotion/react'

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
  margin: 0 0 3rem;

  & > span {
    display: inline-block;
  }

  p {
    margin: 0 0 1rem;
  }
`

const CheckoutDetailsFooter = styled('div')`
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  right: 0;
  height: 14.5rem;
`

const CheckoutDetailsErrors = styled('span')`
  display: block;
  font-family: ${(props) => props.theme.fonts.preface.family};
  text-transform: uppercase;
  font-size: 2.1rem;
  color: ${(props) => props.theme.colors.paprika};
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
  const parenthetical = isToday ? ' (today)' : isTomorrow ? ' (tmrw)' : ''
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
  const submitRef = useRef(null)
  const theme = useTheme()
  const [details, setDetails] = useState({})
  const [errors, setErrors] = useState(null)
  // const [submitting, setSubmitting] = useState(false)
  const { windowRef } = useContext(AppContext)
  const { title: siteTitle } = useSelector(selectBrand)
  const cartTotal = useSelector(selectCartTotal)
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
  const formErrors = errors ? handleCheckoutErrors({ params: errors }) : {}
  const cartValidate = useSelector(selectCartValidate)
  const validate = useCallback((order) => dispatch(validateOrder(order)), [
    dispatch,
  ])
  // const cartWithDetails = { ...cartValidate, ...details }
  useCheckout(validate, cartValidate)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef, dispatch])

  // useEffect(() => {
  //   if (loading === 'idle') {
  //     setSubmitting(false)
  //   }
  // }, [loading])

  useEffect(() => {
    if (hasDetails && loading === 'idle') {
      if (check.errors) {
        setErrors(check.errors)
        windowRef.current.scrollTop = 0
      } else {
        history.push('/checkout/payment')
      }
    }
  }, [hasDetails, loading, check.errors, windowRef, history])

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
    // setSubmitting(true)
    const data = {
      customer: form.customer,
      details: form.details,
    }
    const order = prepareOrder({ ...cartValidate, ...data })
    dispatch(validateOrder(order))
    setDetails(data)
    submitRef.current.blur()
  }

  return (
    <>
      <Helmet>
        <title>Checkout Details | {siteTitle}</title>
      </Helmet>
      <Content hasFooter={false}>
        <Header
          left={<Back onClick={() => history.push(menuSlug)} />}
          right={<Cart />}
        />
        <Main>
          <PageContainer style={{ margin: '0 auto 14.5rem' }}>
            <CheckoutHeader title={`${orderTypeName} Details`}>
              <CheckoutLink onClick={reset} text="Reset Checkout" />
            </CheckoutHeader>
            <FormWrapper>
              <ErrMsg errMsg={formErrors.form} style={{ margin: '0 0 2rem' }} />
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
                <FormHeader style={{ margin: '3rem 0 0' }}>
                  <h2>
                    {orderTypeName.replace('Curbside ', '')} Time
                    <button onClick={changeTime}>{requestedAtStr}</button>
                  </h2>
                </FormHeader>
              </CheckoutOrderType>
              <CheckoutContact errors={formErrors.customer} />
              <CheckoutOptions errors={formErrors.details} />
            </FormWrapper>
          </PageContainer>
          <CheckoutDetailsFooter>
            <CartFooter
              label={<span>Subtotal</span>}
              total={
                <span>
                  <span>{formatDollars(cartTotal)}</span>
                </span>
              }
              back={
                loading === 'pending' ? (
                  <Loading color={theme.colors.light} />
                ) : formErrors.form ? (
                  <CheckoutDetailsErrors>
                    1 or more errors
                  </CheckoutDetailsErrors>
                ) : null
              }
              add={
                <ButtonStyled
                  btnRef={submitRef}
                  onClick={handleSubmit}
                  disabled={loading === 'pending'}
                  size="big"
                  color="cart"
                >
                  Go To Pay
                </ButtonStyled>
              }
            />
          </CheckoutDetailsFooter>
        </Main>
      </Content>
    </>
  )
}

CheckoutDetails.displayName = 'CheckoutDetails'
export default CheckoutDetails
