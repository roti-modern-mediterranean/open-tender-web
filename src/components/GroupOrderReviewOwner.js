import React, { useEffect, useState, useRef } from 'react'
import { isBrowser } from 'react-device-detect'
import isEqual from 'lodash/isEqual'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import {
  selectOrder,
  selectGroupOrder,
  resetGroupOrder,
  selectMenuSlug,
  updateCustomerGroupOrder,
  closeGroupOrder,
  removeCustomerGroupOrder,
  selectMenuItems,
  showNotification,
  setCart,
  fetchMenuItems,
  checkout,
} from '@open-tender/redux'
import { rehydrateCart, isEmpty, combineCarts } from '@open-tender/js'
import { CartItem, Button } from '@open-tender/components'

import { selectConfig, selectDisplaySettings } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'
import OrderQuantity from './OrderQuantity'
import iconMap from './iconMap'
import GroupOrderLink from './GroupOrderLink'
import GroupOrderTime from './GroupOrderTime'

const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const GroupOrderReviewOwner = () => {
  const [showGuestItems, setShowGuestItems] = useState(true)
  const [guestCart, setGuestCart] = useState([])
  const [guestCartLookup, setGuestCartLookup] = useState({})
  const dispatch = useDispatch()
  const history = useHistory()
  const { groupOrders: config } = useSelector(selectConfig)
  const menuSlug = useSelector(selectMenuSlug)
  const order = useSelector(selectOrder)
  const { entities: menuItems } = useSelector(selectMenuItems)
  const displaySettings = useSelector(selectDisplaySettings)
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

  useEffect(() => {
    window.scroll(0, 0)
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

  const handleCheckout = (evt) => {
    evt.preventDefault()
    const combinedCart = combineCarts(
      order.cart,
      guestCart,
      cartOwner,
      cartGuests
    )
    dispatch(setCart(combinedCart))
    dispatch(closeGroupOrder(cartId, true))
    dispatch(checkout())
    history.push('/checkout')
    evt.target.blur()
  }

  const save = (evt) => {
    evt.preventDefault()
    dispatch(resetGroupOrder())
    evt.target.blur()
  }

  const cancel = (evt) => {
    evt.preventDefault()
    dispatch(removeCustomerGroupOrder(cartId))
    evt.target.blur()
  }

  const toggleGuestItems = (evt) => {
    evt.preventDefault()
    setShowGuestItems(!showGuestItems)
    evt.target.blur()
  }

  return (
    <>
      {isBrowser && <Background imageUrl={config.background} />}
      <div className="content">
        <PageTitle
          title="Review your group order"
          subtitle="Use this page to review the orders that have been submitted before checking out."
        />
        <div className="content__body ot-line-height slide-up">
          <div className="container">
            <div className="content__section content__text">
              <p className="ot-color-headings ot-heading ot-font-size-h5">
                This group order will remain open for editing until you to
                proceed to the checkout page.
              </p>
              <p>
                Orders will be appear below as they're added by your friends.{' '}
                {guestCount} orders have been submitted so far
                {guestLimit &&
                  `, and there is a limit of ${guestLimit} orders in total (not including your own)`}
                .
              </p>
              <GroupOrderTime />
              <p>Need to share this group order with orders?</p>
              <p>
                <GroupOrderLink
                  token={token}
                  className="ot-btn ot-btn--small"
                  instructions={null}
                />
              </p>
              <p className="ot-color-headings ot-heading ot-font-size-h5">
                Ready to submit your order?
              </p>
              <p>
                <Button
                  text="Proceed To Checkout"
                  classes="ot-btn"
                  onClick={handleCheckout}
                />
              </p>
              <p>
                Change your mind? Save this group order for another day or
                delete it altogether.
              </p>
              <p>
                <Button
                  text="Save for Later"
                  classes="ot-btn ot-btn--small"
                  icon={iconMap['Save']}
                  onClick={save}
                />
                <Button
                  text="Delete Forever"
                  classes="ot-btn ot-btn--small ot-btn--cancel"
                  icon={iconMap['Trash2']}
                  onClick={cancel}
                />
              </p>
            </div>
            <div className="content__section">
              <div className="content__section__header">
                <p className="content__section__header__title ot-heading ot-font-size-h5">
                  Your items
                </p>
                <p className="content__section__header__subtitle ot-font-size-small">
                  <Link to={menuSlug}>
                    Click here to get back to the menu if you need to make any
                    changes to your own order.
                  </Link>
                </p>
              </div>
              <div className="ot-bg-color-primary ot-border-radius">
                <ul className="cart">
                  {order.cart.map((item, index) => {
                    return (
                      <li key={`${item.id}-${index}`}>
                        <CartItem
                          item={item}
                          showModifiers={true}
                          displaySettings={displaySettings}
                        >
                          <OrderQuantity item={item} show={false} />
                        </CartItem>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className="content__section">
              <div className="content__section__header">
                <p className="content__section__header__title ot-heading ot-font-size-h5">
                  Items added by your guests
                </p>
                <p className="content__section__header__subtitle ot-font-size-small">
                  <Button
                    text={
                      showGuestItems
                        ? 'Show guest names only'
                        : 'Show guest names & items'
                    }
                    classes="ot-btn-link"
                    onClick={toggleGuestItems}
                  />
                </p>
              </div>
              {!isEmpty(guestCartLookup) ? (
                showGuestItems ? (
                  cartGuests.map((guest) => (
                    <div className="content__subsection ot-bg-color-primary ot-border-radius">
                      <div className="content__subsection__header">
                        <p className="content__subsection__header__title ot-color-headings ot-bold ot-font-size">
                          {guest.first_name} {guest.last_name}
                        </p>
                      </div>
                      <ul className="cart">
                        {guestCartLookup[guest.cart_guest_id].map(
                          (item, index) => {
                            return (
                              <li key={`${item.id}-${index}`}>
                                <CartItem
                                  item={item}
                                  showModifiers={true}
                                  displaySettings={displaySettings}
                                >
                                  <OrderQuantity item={item} show={false} />
                                </CartItem>
                              </li>
                            )
                          }
                        )}
                      </ul>
                    </div>
                  ))
                ) : (
                  <div className="ot-bg-color-primary ot-border-radius">
                    <ul className="content__list">
                      {cartGuests.map((guest) => (
                        <li className="ot-color-headings ot-bold ot-font-size">
                          {guest.first_name} {guest.last_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              ) : (
                <p>Your guests haven't added any orders yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

GroupOrderReviewOwner.displayName = 'GroupOrderReviewOwner'
export default GroupOrderReviewOwner
