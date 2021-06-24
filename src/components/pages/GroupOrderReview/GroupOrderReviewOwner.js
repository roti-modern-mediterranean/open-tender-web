import React, { useEffect, useState, useRef } from 'react'
import { isBrowser } from 'react-device-detect'
import isEqual from 'lodash/isEqual'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import {
  selectOrder,
  selectGroupOrder,
  // resetGroupOrder,
  selectMenuSlug,
  updateCustomerGroupOrder,
  closeGroupOrder,
  removeCustomerGroupOrder,
  selectMenuItems,
  showNotification,
  setCart,
  fetchMenuItems,
  checkout,
  selectCartTotal,
  selectCartQuantity,
} from '@open-tender/redux'
import { rehydrateCart, isEmpty, combineCarts } from '@open-tender/js'
import { ButtonStyled, Preface } from '@open-tender/components'

import { Content, Main, PageContainer, Header } from '../..'
import { Back } from '../../buttons'
import GroupOrderLink from '../../GroupOrderLink'
import GroupOrderTime from '../../GroupOrderTime'
import { GroupOrderReviewIntro, GroupOrderReviewCart } from './GroupOrderReview'
import Logo from '../../Logo'
import { FormWrapper } from '../../inputs'
import CheckoutHeader from '../../CheckoutHeader'
import ButtonGroupBig from '../../ButtonGroupBig'
import CheckoutCartItem from '../CheckoutPayment/CheckoutCartItem'
import InlineLink from '../../InlineLink'

const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const GroupOrderReviewOwner = () => {
  const [guestCart, setGuestCart] = useState([])
  const [guestCartLookup, setGuestCartLookup] = useState({})
  const dispatch = useDispatch()
  const history = useHistory()
  const menuSlug = useSelector(selectMenuSlug)
  const order = useSelector(selectOrder)
  const { entities: menuItems } = useSelector(selectMenuItems)
  const cartTotal = useSelector(selectCartTotal)
  const cartQuantity = useSelector(selectCartQuantity)
  const groupOrder = useSelector(selectGroupOrder)
  const {
    cartId,
    token,
    cart: groupCart,
    guestLimit,
    guestCount,
    cartGuests,
    cartOwner,
    revenueCenterId,
    serviceType,
  } = groupOrder
  const prevGroupCart = usePrevious(groupCart)
  const guestCartTotal = guestCart.reduce((t, i) => (t += i.totalPrice), 0.0)
  const grandTotal = cartTotal + guestCartTotal
  const hasOrders = !isEmpty(guestCartLookup)

  useEffect(() => {
    dispatch(fetchMenuItems({ revenueCenterId, serviceType }))
    dispatch(updateCustomerGroupOrder(cartId))
  }, [dispatch, cartId, order.requestedAt, revenueCenterId, serviceType])

  useEffect(() => {
    const update = setInterval(
      () => dispatch(updateCustomerGroupOrder(cartId)),
      15000
    )
    return () => clearInterval(update)
  }, [dispatch, cartId])

  useEffect(() => {
    if (!isEqual(groupCart, prevGroupCart)) {
      const items = groupCart.filter((i) => !i.customer_id)
      const { cart } = rehydrateCart(menuItems, items)
      setGuestCart(cart)
      const cartLookup = cart.reduce((obj, i) => {
        const items = [...(obj[i.cart_guest_id] || []), i]
        return { ...obj, [i.cart_guest_id]: items }
      }, {})
      setGuestCartLookup(cartLookup)
      if (prevGroupCart) dispatch(showNotification('New order added!'))
    }
  }, [dispatch, groupCart, prevGroupCart, menuItems])

  const handleCheckout = () => {
    const combinedCart = combineCarts(
      order.cart,
      guestCart,
      cartOwner,
      cartGuests
    )
    dispatch(setCart(combinedCart))
    dispatch(closeGroupOrder(cartId, true))
    dispatch(checkout())
    history.push('/checkout/register')
  }

  // const save = () => {
  //   dispatch(resetGroupOrder())
  // }

  const cancel = () => {
    dispatch(removeCustomerGroupOrder(cartId))
  }

  const refresh = () => {
    dispatch(updateCustomerGroupOrder(cartId))
    dispatch(showNotification('Guest items refreshed'))
  }

  return (
    <>
      <Content>
        <Header
          left={<Back onClick={() => history.push(menuSlug)} />}
          title={
            <Link to="/">
              <Logo />
            </Link>
          }
          right={null}
          bgColor={isBrowser ? 'dark' : 'primary'}
          borderColor={isBrowser ? 'dark' : 'primary'}
        />
        <Main>
          <PageContainer>
            <CheckoutHeader title="Review your group order" />
            <FormWrapper>
              <GroupOrderReviewIntro>
                <p>
                  Use this page to review the orders that have been submitted
                  before checking out.
                </p>
                <Preface as="p">
                  This group order will remain open for editing until you to
                  proceed to the checkout page.
                </Preface>
                <p>
                  Orders will be appear below as they're added by your friends.{' '}
                  {guestCount} {guestCount > 1 ? 'orders have' : 'order has'}{' '}
                  been submitted so far
                  {guestLimit &&
                    `, and there is a limit of ${guestLimit} orders in total (not including your own)`}
                  .
                </p>
                <GroupOrderTime />
                <p>Need to share this group order with orders?</p>
                <GroupOrderLink token={token} instructions={null} />
                {grandTotal > 0 ? (
                  <>
                    <CheckoutHeader title="Ready to submit your order?" />
                    <ButtonGroupBig>
                      <ButtonStyled onClick={handleCheckout} size="big">
                        Proceed To Checkout
                      </ButtonStyled>
                      {/* <ButtonStyled onClick={save} size="big" color="secondary">
                        Save for Later
                      </ButtonStyled> */}
                      <ButtonStyled
                        onClick={() => history.push(menuSlug)}
                        size="big"
                        color="secondary"
                      >
                        Back To Menu
                      </ButtonStyled>
                      <ButtonStyled
                        onClick={cancel}
                        size="big"
                        color="secondary"
                      >
                        Cancel & Delete Forever
                      </ButtonStyled>
                    </ButtonGroupBig>
                    {!hasOrders && (
                      <div style={{ margin: '6rem 0 0' }}>
                        <p>
                          Your guests haven't added any orders yet.{' '}
                          <InlineLink onClick={refresh}>
                            Click here to refresh.
                          </InlineLink>
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <CheckoutHeader title="No Orders Have Been Submitted" />
                    <p>
                      At least one order needs to be submitted by you or one of
                      your guests.
                    </p>
                    <p>
                      <InlineLink onClick={() => history.push(menuSlug)}>
                        Head back to the menu
                      </InlineLink>{' '}
                      or{' '}
                      <InlineLink onClick={refresh}>
                        refresh your guests' orders
                      </InlineLink>
                      .
                    </p>
                  </>
                )}
              </GroupOrderReviewIntro>
              {grandTotal > 0 && (
                <GroupOrderReviewCart>
                  {order.cart.length > 0 && (
                    <div>
                      <CheckoutCartItem name="Your Items" />
                      {order.cart.map((item, index) => (
                        <CheckoutCartItem
                          key={`${item.id}-${index}`}
                          name={item.name}
                          quantity={item.quantity}
                          amount={item.totalPrice}
                        />
                      ))}
                      <CheckoutCartItem
                        name="Your Total"
                        quantity={cartQuantity}
                        amount={cartTotal}
                      />
                    </div>
                  )}
                  {hasOrders &&
                    cartGuests.map((guest) => {
                      const guestItems = guestCartLookup[guest.cart_guest_id]
                      if (!guestItems) return null
                      const guestName = `${guest.first_name} ${guest.last_name}`
                      const guestQuantity = guestItems.reduce(
                        (t, i) => (t += i.quantity),
                        0
                      )
                      const guestTotal = guestItems.reduce(
                        (t, i) => (t += i.totalPrice),
                        0.0
                      )
                      return (
                        <div>
                          <CheckoutCartItem name={guestName} />
                          {guestItems.map((item, index) => (
                            <CheckoutCartItem
                              key={`${item.id}-${index}`}
                              name={item.name}
                              quantity={item.quantity}
                              amount={item.totalPrice}
                            />
                          ))}
                          <CheckoutCartItem
                            name="Guest Total"
                            quantity={guestQuantity}
                            amount={guestTotal}
                          />
                        </div>
                      )
                    })}
                  <div>
                    <CheckoutCartItem name="Grand Total" amount={grandTotal} />
                  </div>
                </GroupOrderReviewCart>
              )}
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

GroupOrderReviewOwner.displayName = 'GroupOrderReviewOwner'
export default GroupOrderReviewOwner
