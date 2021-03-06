import React, { useEffect, useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { deviceType } from 'react-device-detect'
import styled from '@emotion/styled'
import {
  selectCheckout,
  selectOrder,
  updateForm,
  setDeviceType,
  submitOrder,
  setSubmitting,
  setConfirmationOrder,
  resetCompletedOrder,
  resetOrder,
  resetCheckout,
  resetErrors,
} from '@open-tender/redux'
import {
  formatDollars,
  checkAmountRemaining,
  updateTenders,
} from '@open-tender/js'
import { ButtonStyled, Preface } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { openModal, selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import {
  CheckoutHeader,
  CheckoutLink,
  CheckoutSubtitle,
  CheckoutTitle,
  Container,
  Content,
  HeaderCheckout,
  Main,
  PageContainer,
} from '../..'
import { Back } from '../../buttons'
import {} from '../../forms'
import { ErrMsg, FormWrapper } from '../../inputs'
import CheckoutCart from './CheckoutCart'
import CheckoutPromoCode from './CheckoutPromoCode'
import CheckoutTenders from './CheckoutTenders'
import BorderBox from '../../BorderBox'
import { useTheme } from '@emotion/react'
import CheckoutGiftCards from './CheckoutGiftCards'

const CheckoutPaymentFooter = styled('div')`
  position: relative;
  width: 100%;
  height: 8rem;
  background-color: ${(props) => props.theme.bgColors.dark};

  & > div:last-of-type {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    width: 100%;
    max-width: 40rem;
    margin: 0 auto;
    border-radius: 2.4rem;

    span span:first-of-type {
      font-weight: normal;
      padding-right: 1rem;
    }
  }
`

const makeDeviceType = (deviceType) => {
  switch (deviceType) {
    case 'tablet':
      return 'TABLET'
    case 'mobile':
      return 'MOBILE'
    case 'browser':
      return 'DESKTOP'
    default:
      return 'DESKTOP'
  }
}

const CheckoutPayment = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const theme = useTheme()
  const submitRef = useRef(null)
  const { windowRef } = useContext(AppContext)
  const { title: siteTitle } = useSelector(selectBrand)
  const { orderId, serviceType } = useSelector(selectOrder)
  const checkout = useSelector(selectCheckout)
  const { check, form, completedOrder, errors, submitting, loading } = checkout
  const total = check && check.totals ? check.totals.total : 0.0
  const { has_tip } = check ? check.config.gratuity : {}
  let amountRemaining = checkAmountRemaining(total, form.tenders)
  const submitDisabled =
    submitting || amountRemaining > 0 || loading === 'pending'
  const deviceTypeName = makeDeviceType(deviceType)

  useEffect(() => {
    if (!serviceType) history.push('/')
  }, [serviceType, history])

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef, dispatch])

  useEffect(() => {
    dispatch(setDeviceType(deviceTypeName))
    return () => {
      dispatch(resetErrors())
      // dispatch(resetTip())
    }
  }, [dispatch, deviceTypeName])

  useEffect(() => {
    const tenders = updateTenders(form.tenders, total)
    if (tenders) {
      dispatch(updateForm({ tenders }))
    }
  }, [form.tenders, total, dispatch])

  useEffect(() => {
    if (!submitting) {
      if (errors.form) {
        windowRef.current.scrollTop = 0
      } else if (completedOrder) {
        dispatch(setConfirmationOrder(completedOrder))
        dispatch(resetCompletedOrder())
        dispatch(resetOrder())
        return history.push('/confirmation')
      }
    }
  }, [dispatch, history, submitting, windowRef, errors.form, completedOrder])

  const handleSubmit = () => {
    dispatch(setSubmitting(true))
    dispatch(submitOrder())
  }

  const cancelEdit = () => {
    dispatch(resetOrder())
    dispatch(resetCheckout())
    history.push(`/`)
  }

  const editTip = () => {
    dispatch(openModal({ type: 'gratuity', args: { focusFirst: true } }))
  }

  if (!serviceType) return null

  return (
    <>
      <Helmet>
        <title>Checkout Payment | {siteTitle}</title>
      </Helmet>
      <Content hasFooter={false}>
        <HeaderCheckout
          left={<Back onClick={() => history.push('/checkout/details')} />}
        />
        <Main>
          <PageContainer style={{ margin: '0 auto' }}>
            <CheckoutHeader title="Confirm & Pay">
              <CheckoutTitle>{form.customer.first_name}'s Order</CheckoutTitle>
              {orderId && (
                <>
                  <CheckoutSubtitle style={{ margin: '1rem 0 0' }}>
                    <Preface as="p">Editing Order #{orderId}</Preface>
                  </CheckoutSubtitle>
                  <CheckoutLink onClick={cancelEdit} text="Cancel Edit" />
                </>
              )}
            </CheckoutHeader>
            {check && (
              <FormWrapper>
                <ErrMsg errMsg={errors.form} style={{ margin: '0 0 2rem' }} />
                <CheckoutCart
                  check={check}
                  editTip={has_tip ? editTip : null}
                />
                <CheckoutPromoCode />
                <CheckoutGiftCards />
                <CheckoutTenders />
              </FormWrapper>
            )}
          </PageContainer>
          <CheckoutPaymentFooter>
            <BorderBox color={theme.bgColors.dark} />
            <BorderBox color={theme.bgColors.primary} position="right" />
            <Container>
              <ButtonStyled
                btnRef={submitRef}
                onClick={handleSubmit}
                disabled={submitDisabled}
                size="big"
                color="cart"
              >
                {amountRemaining > 0 ? (
                  <>
                    <span>Amount Due:</span>
                    <span>{formatDollars(amountRemaining)}</span>
                  </>
                ) : (
                  <>
                    <span>{orderId ? 'Update' : 'Place'} Order:</span>
                    <span>{formatDollars(total)}</span>
                  </>
                )}
              </ButtonStyled>
            </Container>
          </CheckoutPaymentFooter>
        </Main>
      </Content>
    </>
  )
}

CheckoutPayment.displayName = 'CheckoutPayment'
export default CheckoutPayment
