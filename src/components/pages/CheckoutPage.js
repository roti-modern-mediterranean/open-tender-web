import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectConfig } from '../../slices/configSlice'
import { openModal } from '../../slices/modalSlice'
import { logoutCustomer, selectCustomer } from '../../slices/customerSlice'
import {
  selectCart,
  selectCartQuantity,
  selectMenuSlug,
  selectMenuVars,
  selectOrder,
  resetOrder,
} from '../../slices/orderSlice'
import {
  updateForm,
  updateCustomer,
  validateOrder,
  submitOrder,
  selectCheckout,
  selectCompletedOrder,
  clearCompletedOrder,
} from '../../slices/checkoutSlice'
import { setCompletedOrder } from '../../slices/confirmationSlice'
import { CheckoutForm, Check, ButtonMenu, ButtonAccount } from '../../packages'
import { prepareOrder } from '../../packages/utils/cart'
import HeaderLogo from '../HeaderLogo'

const CheckoutPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { checkout: checkoutConfig } = useSelector(selectConfig)
  const cart = useSelector(selectCart)
  const cartCount = useSelector(selectCartQuantity)
  const menuSlug = useSelector(selectMenuSlug)
  const { locationId, serviceType, requestedAt } = useSelector(selectMenuVars)
  const order = useSelector(selectOrder)
  const { account, auth } = useSelector(selectCustomer)
  const { access_token } = auth || {}
  const { check, form, loading, errors } = useSelector(selectCheckout)
  const { customer, details, discounts, promoCodes, tenders, tip } = form
  const { totals } = check || {}
  const completedOrder = useSelector(selectCompletedOrder)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (cartCount === 0) return history.push(menuSlug)
  }, [cartCount, menuSlug, history])

  useEffect(() => {
    dispatch(updateCustomer(account))
  }, [dispatch, account])

  useEffect(() => {
    if (!locationId) return history.push('/')
    if (completedOrder) {
      dispatch(setCompletedOrder(completedOrder))
      dispatch(clearCompletedOrder())
      dispatch(resetOrder())
      return history.push('/confirmation')
    }
    const customerValidate = account
      ? { customer_id: account.customer_id }
      : null
    const data = {
      locationId,
      serviceType,
      requestedAt,
      cart,
      customer: customerValidate,
      discounts,
      promoCodes,
      tip,
    }
    const order = prepareOrder(data)
    // console.log('/orders/validate', order)
    dispatch(validateOrder(order))
  }, [
    locationId,
    serviceType,
    requestedAt,
    cart,
    account,
    discounts,
    promoCodes,
    tip,
    completedOrder,
    dispatch,
    history,
  ])

  const pending = loading === 'pending'

  const data = {
    locationId,
    serviceType,
    requestedAt,
    cart,
    customer,
    details,
    discounts,
    promoCodes,
    tip,
    tenders,
  }
  const preparedOrder = prepareOrder(data)
  // console.log('/orders', preparedOrder)

  return (
    <div className="checkout">
      <div className="checkout__header bg-color">
        <div className="checkout__header__wrapper">
          <div className="checkout__header__container">
            <div className="checkout__logo__container">
              <div className="checkout__logo">
                <HeaderLogo />
              </div>
              <div className="checkout__actions">
                <ButtonMenu classes="btn--header" />
                <ButtonAccount classes="btn--header" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="checkout__content">
        <div className="checkout__content__wrapper">
          <div className="checkout__content__container">
            <div className="checkout__form">
              <div className="checkout__form__header">
                <h1 className="checkout__title ot-font-size-h2">
                  {checkoutConfig.title}
                </h1>
                <p className="checkout__subtitle">{checkoutConfig.subtitle}</p>
              </div>
              <CheckoutForm
                config={checkoutConfig}
                order={order}
                check={check}
                form={form}
                loading={loading}
                errors={errors}
                updateForm={(form) => dispatch(updateForm(form))}
                submitOrder={() => dispatch(submitOrder(preparedOrder))}
                login={() => dispatch(openModal('login'))}
                logout={() => dispatch(logoutCustomer(access_token))}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="checkout__sidebar bg-secondary-color">
        <div className="checkout__sidebar__wrapper">
          <div className="checkout__sidebar__container">
            <div className="checkout__totals">
              {totals && (
                <Check
                  title={checkoutConfig.check.title}
                  totals={totals}
                  tenders={tenders}
                  updating={pending}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CheckoutPage.displayName = 'CheckoutPage'
export default CheckoutPage
