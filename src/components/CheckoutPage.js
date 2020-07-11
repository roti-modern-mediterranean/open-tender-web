import React, { useEffect, useRef, useMemo } from 'react'
import isEqual from 'lodash/isEqual'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import {
  logoutCustomer,
  selectCustomer,
  selectCartTotal,
  selectMenuSlug,
  selectOrder,
  resetOrder,
  resetOrderType,
  selectTimezone,
  selectAutoSelect,
  selectCheckout,
  resetErrors,
  resetTip,
  resetCompletedOrder,
  updateForm,
  updateCheckoutCustomer,
  validateOrder,
  submitOrder,
  setSubmitting,
  setConfirmationOrder,
} from '@open-tender/redux'
import { prepareOrder } from '@open-tender/js'
import { CheckoutForm, Check } from '@open-tender/components'

import { selectConfig, openModal } from '../slices'
import Loader from './Loader'
import { BarLoader } from 'react-spinners'
import { cardIconMap } from '../assets/cardIcons'
import Background from './Background'
import PageTitle from './PageTitle'

const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const CheckoutPage = () => {
  const formRef = useRef()
  const history = useHistory()
  const dispatch = useDispatch()
  const { checkout: checkoutConfig } = useSelector(selectConfig)
  const cartTotal = useSelector(selectCartTotal)
  const menuSlug = useSelector(selectMenuSlug)
  const order = useSelector(selectOrder)
  const tz = useSelector(selectTimezone)
  const autoSelect = useSelector(selectAutoSelect)
  const { profile } = useSelector(selectCustomer)
  const {
    check,
    form,
    loading,
    errors = {},
    submitting,
    completedOrder,
  } = useSelector(selectCheckout)
  const isComplete = completedOrder ? true : false
  const {
    orderId,
    orderType,
    serviceType,
    revenueCenter,
    requestedAt,
    cart,
  } = order
  const { revenue_center_id: revenueCenterId } = revenueCenter || {}
  const { surcharges, discounts, promoCodes, tenders, tip } = form
  const pending = loading === 'pending'
  const checkUpdating = submitting ? false : pending
  const isCatering = orderType === 'CATERING'

  useEffect(() => {
    window.scroll(0, 0)
    return () => {
      dispatch(resetErrors())
      dispatch(resetTip())
    }
  }, [dispatch])

  useEffect(() => {
    if (!revenueCenterId || !serviceType) {
      return history.push('/')
    } else if (cartTotal === 0) {
      return history.push(menuSlug)
    } else if (completedOrder) {
      dispatch(setConfirmationOrder(completedOrder))
      dispatch(resetCompletedOrder())
      dispatch(resetOrder())
      return history.push('/confirmation')
    }
  }, [
    history,
    dispatch,
    cartTotal,
    menuSlug,
    revenueCenterId,
    serviceType,
    completedOrder,
  ])

  useEffect(() => {
    dispatch(resetErrors())
    dispatch(updateCheckoutCustomer(profile))
  }, [dispatch, profile])

  const orderValidate = useMemo(() => {
    const customerValidate = profile
      ? { customer_id: profile.customer_id }
      : null
    const dataValidate = {
      orderId,
      revenueCenterId,
      serviceType,
      requestedAt,
      cart,
      customer: customerValidate,
      address: order.address,
      surcharges,
      discounts,
      promoCodes,
      tip,
    }
    return prepareOrder(dataValidate)
  }, [
    orderId,
    profile,
    revenueCenterId,
    serviceType,
    requestedAt,
    cart,
    order.address,
    surcharges,
    discounts,
    promoCodes,
    tip,
  ])
  const prevOrderValidate = usePrevious(orderValidate)

  useEffect(() => {
    if (!isComplete && !isEqual(orderValidate, prevOrderValidate)) {
      dispatch(validateOrder(orderValidate))
    }
  }, [dispatch, orderValidate, prevOrderValidate, isComplete])

  const handleAccount = (evt) => {
    evt.preventDefault()
    history.push(`/account`)
    evt.target.blur()
  }

  const handleServiceType = (evt) => {
    evt.preventDefault()
    dispatch(resetOrderType())
    return history.push(`/`)
  }

  const handleCatering = (evt) => {
    evt.preventDefault()
    history.push(`/catering`)
    evt.target.blur()
  }

  const handleRevenueCenter = (evt) => {
    evt.preventDefault()
    return history.push(`/locations`)
  }

  const handleRequestedAt = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'requestedAt' }))
    evt.target.blur()
  }

  const checkSummary = (
    <Check
      title={checkoutConfig.check.title}
      check={check}
      tenders={tenders}
      updating={checkUpdating}
      loader={<BarLoader />}
    />
  )

  // const desktopCheck = (
  //   <div className="checkout__check">
  //     <div className="checkout__check__wrapper ot-border-color">
  //       <div className="checkout__check__totals ot-border-radius ot-bg-color-primary ot-box-shadow slide-up">
  //         {checkSummary}
  //       </div>
  //     </div>
  //   </div>
  // )

  const mobileCheck = (
    <div className="checkout__summary">
      <div className="checkout__totals ot-border-radius ot-bg-color-primary ot-border-color ot-box-shadow slide-up">
        {checkSummary}
      </div>
    </div>
  )

  return (
    <>
      {isBrowser && <Background imageUrl={checkoutConfig.background} />}
      <div className="content">
        <PageTitle {...checkoutConfig} />
        <div className="checkout">
          <div className="container">
            {/* {check && check.totals && isBrowser && desktopCheck} */}
            {check ? (
              <div ref={formRef} className="checkout__form slide-up">
                <CheckoutForm
                  config={checkoutConfig}
                  cardIconMap={cardIconMap}
                  autoSelect={autoSelect}
                  order={order}
                  tz={tz}
                  check={check}
                  form={form}
                  submitting={submitting}
                  loading={loading}
                  errors={errors}
                  // checkSummary={!isBrowser ? mobileCheck : null}
                  checkSummary={mobileCheck}
                  updateForm={(form) => dispatch(updateForm(form))}
                  setSubmitting={(bool) => dispatch(setSubmitting(bool))}
                  submitOrder={() => dispatch(submitOrder())}
                  signUp={() => dispatch(openModal({ type: 'signUp' }))}
                  login={() => dispatch(openModal({ type: 'login' }))}
                  logout={() => dispatch(logoutCustomer())}
                  goToAccount={handleAccount}
                  updateRequestedAt={handleRequestedAt}
                  updateRevenueCenter={handleRevenueCenter}
                  updateServiceType={
                    isCatering ? handleCatering : handleServiceType
                  }
                />
              </div>
            ) : (
              <Loader text="Building your check..." />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

CheckoutPage.displayName = 'CheckoutPage'
export default CheckoutPage
