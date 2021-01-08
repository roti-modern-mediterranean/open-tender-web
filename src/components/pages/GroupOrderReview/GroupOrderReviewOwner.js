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
import {
  CartItem,
  ButtonLink,
  ButtonStyled,
  Heading,
} from '@open-tender/components'

import GroupOrderLink from '../../GroupOrderLink'
import GroupOrderTime from '../../GroupOrderTime'

import { selectConfig, selectDisplaySettings } from '../../../slices'
import iconMap from '../../iconMap'
import {
  Background,
  Container,
  Content,
  Main,
  OrderQuantity,
  PageTitle,
  PageContent,
  HeaderMobile,
  LinkSeparator,
} from '../..'
import {
  Account,
  Menu,
  RequestedAt,
  RevenueCenter,
  ServiceType,
} from '../../buttons'
import styled from '@emotion/styled'

const GuestSection = styled('div')`
  margin: 3rem 0 0;

  > p {
    margin: 1em 0;
    line-height: ${(props) => props.theme.lineHeight};
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const GuestList = styled('div')`
  ul li {
    margin: 0 0 0.5rem;

    &:last-child {
      margin: 0;
    }
  }
`

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
    history.push('/checkout')
  }

  const save = () => {
    dispatch(resetGroupOrder())
  }

  const cancel = () => {
    dispatch(removeCustomerGroupOrder(cartId))
  }

  const refresh = () => {
    dispatch(updateCustomerGroupOrder(cartId))
    dispatch(showNotification('Guest items refreshed'))
  }

  const toggleGuestItems = () => {
    setShowGuestItems(!showGuestItems)
  }

  return (
    <>
      <Background imageUrl={config.background} />
      <Content maxWidth="76.8rem">
        <HeaderMobile
          title={isBrowser ? null : 'Join Group Order'}
          maxWidth="76.8rem"
          left={<Menu />}
          right={
            <>
              {isBrowser ? (
                <>
                  <Account />
                  <RevenueCenter />
                  <ServiceType />
                  <RequestedAt />
                </>
              ) : null}
            </>
          }
        />
        <Main>
          <Container>
            <PageTitle
              title="Review your group order"
              subtitle="Use this page to review the orders that have been submitted before checking out."
            />
            <PageContent>
              <div>
                <p>
                  <Heading size="h5">
                    This group order will remain open for editing until you to
                    proceed to the checkout page.
                  </Heading>
                </p>
              </div>
              <p>
                Orders will be appear below as they're added by your friends.{' '}
                {guestCount} orders have been submitted so far
                {guestLimit &&
                  `, and there is a limit of ${guestLimit} orders in total (not including your own)`}
                .
              </p>
              <GroupOrderTime />
              <p>Need to share this group order with orders?</p>
              <GroupOrderLink token={token} instructions={null} />
              <div>
                <p>
                  <Heading size="h5">Ready to submit your order?</Heading>
                </p>
              </div>
              <p>
                <ButtonStyled onClick={handleCheckout}>
                  Proceed To Checkout
                </ButtonStyled>
              </p>
              <p>
                Change your mind? Save this group order for another day or
                delete it altogether.
              </p>
              <p>
                <ButtonStyled
                  icon={iconMap.Save}
                  onClick={save}
                  size="small"
                  color="secondary"
                >
                  Save for Later
                </ButtonStyled>{' '}
                <ButtonStyled
                  icon={iconMap.Trash2}
                  onClick={cancel}
                  size="small"
                  color="secondary"
                >
                  Delete Forever
                </ButtonStyled>
              </p>
              <GuestSection>
                <p>
                  <Heading size="h5">Your Items</Heading>
                </p>
                <p>
                  <Link to={menuSlug}>
                    Click here to get back to the menu if you need to make any
                    changes to your own order.
                  </Link>
                </p>
                <ul>
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
              </GuestSection>
              <GuestSection>
                <p>
                  <Heading size="h5">Items added by your guests</Heading>
                </p>
                <p>
                  <ButtonLink onClick={refresh}>
                    Click here to refresh
                  </ButtonLink>
                  <LinkSeparator />
                  <ButtonLink onClick={toggleGuestItems}>
                    {showGuestItems
                      ? 'show guest names only'
                      : 'show guest names & items'}
                  </ButtonLink>
                </p>
                {!isEmpty(guestCartLookup) ? (
                  showGuestItems ? (
                    cartGuests.map((guest) => {
                      const guestItems = guestCartLookup[guest.cart_guest_id]
                      return (
                        guestItems && (
                          <div key={guest.cart_guest_id}>
                            <p style={{ margin: '1.5rem 0 0' }}>
                              <Heading size="h6">
                                {guest.first_name} {guest.last_name}
                              </Heading>
                            </p>
                            <ul>
                              {guestItems.map((item, index) => {
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
                        )
                      )
                    })
                  ) : (
                    <GuestList>
                      <ul>
                        {cartGuests.map((guest) => (
                          <li key={guest.cart_guest_id}>
                            <Heading size="h6">
                              {guest.first_name} {guest.last_name}
                            </Heading>
                          </li>
                        ))}
                      </ul>
                    </GuestList>
                  )
                ) : (
                  <p>Your guests haven't added any orders yet.</p>
                )}
              </GuestSection>
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

GroupOrderReviewOwner.displayName = 'GroupOrderReviewOwner'
export default GroupOrderReviewOwner
