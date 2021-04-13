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
import { Back } from '../../buttons'
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

const CheckoutDetails = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const submitRef = useRef(null)
  const theme = useTheme()
  const [details, setDetails] = useState({})
  const [errors, setErrors] = useState(null)
  const { windowRef } = useContext(AppContext)
  const { title: siteTitle } = useSelector(selectBrand)
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
  const validate = useCallback((order) => dispatch(validateOrder(order)), [
    dispatch,
  ])
  const withCustomer = customer ? { ...cartValidate, customer } : cartValidate
  const withAddress = address ? { ...withCustomer, address } : withCustomer
  useCheckout(validate, withAddress)

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

  return (
    <>
      <Helmet>
        <title>Checkout Details | {siteTitle}</title>
      </Helmet>
      <Content hasFooter={false}>
        <HeaderCheckout
          left={<Back onClick={() => history.push(menuSlug)} />}
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
