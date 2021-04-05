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
  selectCheckout,
  setSubmitting,
  submitOrder,
  setConfirmationOrder,
  resetCompletedOrder,
  resetOrder,
} from '@open-tender/redux'
import { ButtonStyled, Check, useCheckout } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import {
  CartFooter,
  CheckoutHeader,
  Content,
  Header,
  Main,
  PageContainer,
} from '../..'
import { Back, Cart } from '../../buttons'
import styled from '@emotion/styled'
import {} from '../../forms'
import { ErrMsg, FormHeader, FormWrapper } from '../../inputs'

const CheckoutPaymentFooter = styled('div')`
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  right: 0;
  height: 14.5rem;
`

const CheckoutPayment = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const submitRef = useRef(null)
  const { windowRef } = useContext(AppContext)
  const { title: siteTitle } = useSelector(selectBrand)
  const checkout = useSelector(selectCheckout)
  const { check, form, completedOrder, errors, submitting, loading } = checkout

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef, dispatch])

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

  return (
    <>
      <Helmet>
        <title>Checkout Payment | {siteTitle}</title>
      </Helmet>
      <Content hasFooter={false}>
        <Header
          left={<Back onClick={() => history.push('/checkout/details')} />}
          right={<Cart />}
        />
        <Main>
          <PageContainer style={{ margin: '0 auto 8rem' }}>
            <CheckoutHeader title="Confirm & Pay">
              <p>{form.customer.first_name}'s Order</p>
            </CheckoutHeader>
            <FormWrapper>
              <ErrMsg errMsg={errors.form} style={{ margin: '0 0 2rem' }} />
              <Check check={check} tenders={[]} />
            </FormWrapper>
          </PageContainer>
          <CheckoutPaymentFooter>
            <CartFooter
              back={null}
              add={
                <ButtonStyled
                  btnRef={submitRef}
                  onClick={handleSubmit}
                  disabled={submitting}
                  size="big"
                  color="cart"
                >
                  Place Order
                </ButtonStyled>
              }
            />
          </CheckoutPaymentFooter>
        </Main>
      </Content>
    </>
  )
}

CheckoutPayment.displayName = 'CheckoutPayment'
export default CheckoutPayment
