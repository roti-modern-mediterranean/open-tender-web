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
  // resetCheckout,
  selectCartValidate,
  validateOrder,
  selectCartTotal,
  selectCustomer,
  selectGroupOrder,
} from '@open-tender/redux'
import {
  makeServiceTypeName,
  handleCheckoutErrors,
  isEmpty,
  formatDollars,
  prepareOrder,
} from '@open-tender/js'
import { ButtonStyled, Preface, useCheckout } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { openModal, selectBrand, selectOutpostName } from '../../../slices'
import { AppContext } from '../../../App'
import {
  CartFooter,
  CheckoutHeader,
  CheckoutLink,
  CheckoutSubtitle,
  Content,
  HeaderCheckout,
  Loading,
  Main,
  PageContainer,
} from '../..'
import { Back, Reopen } from '../../buttons'
import styled from '@emotion/styled'
import {} from '../../forms'
import { ErrMsg, FormWrapper } from '../../inputs'
import CheckoutContact from './CheckoutContact'
import CheckoutOptions from './CheckoutOptions'
import { useTheme } from '@emotion/react'
import CheckoutAddress from './CheckoutAddress'
import CheckoutOrderTime from './CheckoutOrderTime'

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
  // position: fixed;
  // z-index: 10;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // height: 14.5rem;
`

const CheckoutDetailsErrors = styled('span')`
  display: block;
  font-family: ${(props) => props.theme.fonts.preface.family};
  text-transform: uppercase;
  font-size: 2.1rem;
  color: ${(props) => props.theme.colors.paprika};
`

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

const validateCustomer = (customer) => {
  const errors = {}
  const { first_name, last_name, email, phone } = customer
  if (!first_name) {
    errors['$.customer.first_name'] = { message: 'Please enter a first name' }
  }
  if (!last_name) {
    errors['$.customer.last_name'] = { message: 'Please enter a last name' }
  }
  if (!email) {
    errors['$.customer.email'] = { message: 'Please enter an email address' }
  }
  if (!phone) {
    errors['$.customer.phone'] = { message: 'Please enter a phone number' }
  }
  return isEmpty(errors) ? null : errors
}

const CheckoutDetails = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const submitRef = useRef(null)
  const theme = useTheme()
  const [details, setDetails] = useState({})
  const [errors, setErrors] = useState(null)
  const { windowRef } = useContext(AppContext)
  const { title: siteTitle } = useSelector(selectBrand)
  const { cartId } = useSelector(selectGroupOrder)
  const { profile: customer } = useSelector(selectCustomer) || {}
  const cartTotal = useSelector(selectCartTotal)
  const menuSlug = useSelector(selectMenuSlug)
  const order = useSelector(selectOrder)
  const { serviceType, requestedAt, address, orderId } = order
  const outpostName = useSelector(selectOutpostName)
  const orderTypeName = makeOrderTypeName(order, outpostName)
  const tz = useSelector(selectTimezone)
  const otherServiceType = serviceType === 'PICKUP' ? 'Delivery' : 'Pickup'
  const { check, form, loading } = useSelector(selectCheckout)
  const validationErrors = check ? check.errors : null
  const hasDetails = !isEmpty(details)
  const formErrors = errors ? handleCheckoutErrors({ params: errors }) : {}
  const cartValidate = useSelector(selectCartValidate)
  const validate = useCallback(
    (order) => dispatch(validateOrder(order)),
    [dispatch]
  )
  const withCustomer = customer ? { ...cartValidate, customer } : cartValidate
  const withAddress = address ? { ...withCustomer, address } : withCustomer
  useCheckout(validate, withAddress)

  useEffect(() => {
    if (!serviceType) history.push('/')
  }, [serviceType, history])

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef, dispatch])

  useEffect(() => {
    if (hasDetails && loading === 'idle') {
      if (validationErrors) {
        setErrors(validationErrors)
        windowRef.current.scrollTop = 0
      } else {
        history.push('/checkout/payment')
      }
    }
  }, [hasDetails, loading, validationErrors, windowRef, history])

  const changeTime = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'requestedAt' }))
  }

  const changeServiceType = () => {
    dispatch(openModal({ type: 'orderType' }))
  }

  // const reset = () => {
  //   dispatch(resetCheckout())
  //   history.push(menuSlug)
  // }

  const handleSubmit = () => {
    // this is necessary so that missing customer data does not
    // result in a validation error at the OpenAPI spec level
    // all errors on this page should come from checkout.check.errors
    // and not checkout.errors
    const customerErrors = validateCustomer(form.customer)
    if (customerErrors) {
      setErrors(customerErrors)
      windowRef.current.scrollTop = 0
    } else {
      const fullAddress = { ...address, ...form.address }
      const data = {
        address: isEmpty(fullAddress) ? null : fullAddress,
        customer: form.customer,
        details: form.details,
      }
      const order = prepareOrder({ ...cartValidate, ...data })
      dispatch(validateOrder(order))
      setDetails(data)
      submitRef.current.blur()
    }
  }

  if (!serviceType) return null

  return (
    <>
      <Helmet>
        <title>Checkout Details | {siteTitle}</title>
      </Helmet>
      <Content hasFooter={false}>
        <HeaderCheckout
          left={
            cartId ? (
              <Reopen />
            ) : (
              <Back onClick={() => history.push(menuSlug)} />
            )
          }
        />
        <Main>
          <PageContainer style={{ margin: '0 auto' }}>
            <CheckoutHeader title={`${orderTypeName} Details`}>
              {/* <CheckoutLink onClick={reset} text="Reset Checkout" /> */}
              {orderId && (
                <CheckoutSubtitle style={{ margin: '0' }}>
                  <Preface as="p">Editing Order #{orderId}</Preface>
                </CheckoutSubtitle>
              )}
            </CheckoutHeader>
            <FormWrapper>
              <ErrMsg errMsg={formErrors.form} style={{ margin: '0 0 2rem' }} />
              <CheckoutAddress
                orderTypeName={orderTypeName}
                errors={formErrors.address}
              />
              <CheckoutOrderType>
                <p>
                  Currently your order is set to {orderTypeName.toLowerCase()}
                </p>
                <CheckoutLink
                  onClick={changeServiceType}
                  text={`Switch to ${otherServiceType}`}
                />
                <CheckoutOrderTime
                  serviceType={serviceType}
                  requestedAt={requestedAt}
                  tz={tz}
                  changeTime={changeTime}
                />
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
