import React, { useEffect, useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  selectCheckout,
  setSubmitting,
  submitOrder,
  setConfirmationOrder,
  resetCompletedOrder,
  resetOrder,
  updateForm,
} from '@open-tender/redux'
import {
  formatDollars,
  checkAmountRemaining,
  updateTenders,
} from '@open-tender/js'
import { ButtonStyled, Heading } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import {
  CheckoutHeader,
  Container,
  Content,
  Header,
  Main,
  PageContainer,
} from '../..'
import { Back, Cart } from '../../buttons'
import {} from '../../forms'
import { ErrMsg, FormWrapper } from '../../inputs'
import CheckoutCart from './CheckoutCart'
import CheckoutPromoCode from './CheckoutPromoCode'
import CheckoutTenders from './CheckoutTenders'

const CheckoutPaymentFooter = styled('div')`
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  right: 0;
  height: 8rem;
  background-color: ${(props) => props.theme.bgColors.dark};

  & > div {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    width: 100%;
    border-radius: 2.4rem;

    span span:first-of-type {
      font-weight: normal;
      padding-right: 1rem;
    }
  }
`

const CheckoutPaymentTitle = styled(Heading)`
  color: ${(props) => props.theme.colors.primary};
  font-size: 3.8rem;
  line-height: 1;
`

const CheckoutPayment = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const submitRef = useRef(null)
  const { windowRef } = useContext(AppContext)
  const { title: siteTitle } = useSelector(selectBrand)
  const checkout = useSelector(selectCheckout)
  const { check, form, completedOrder, errors, submitting, loading } = checkout
  const total = check && check.totals ? check.totals.total : 0.0
  let amountRemaining = checkAmountRemaining(total, form.tenders)
  const submitDisabled =
    submitting || amountRemaining > 0 || loading === 'pending'

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef, dispatch])

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
              <CheckoutPaymentTitle>
                {form.customer.first_name}'s Order
              </CheckoutPaymentTitle>
            </CheckoutHeader>
            {check && (
              <FormWrapper>
                <ErrMsg errMsg={errors.form} style={{ margin: '0 0 2rem' }} />
                <CheckoutCart check={check} />
                <CheckoutPromoCode />
                <CheckoutTenders />
              </FormWrapper>
            )}
          </PageContainer>
          <CheckoutPaymentFooter>
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
                    <span>Place Order:</span>
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
