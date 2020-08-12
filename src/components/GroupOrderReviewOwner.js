import React, { useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import {
  selectOrder,
  selectGroupOrder,
  resetGroupOrder,
  resetOrder,
  selectMenuSlug,
  updateCustomerGroupOrder,
  removeCustomerGroupOrder,
  selectTimezone,
  selectGroupOrderPrepTimes,
} from '@open-tender/redux'
import { makeGroupOrderTimeStr } from '@open-tender/js'
import { CartItem, Button } from '@open-tender/components'

import { selectConfig, selectDisplaySettings, openModal } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'
import Loader from './Loader'
import OrderQuantity from './OrderQuantity'
import iconMap from './iconMap'

const GroupOrderReviewOwner = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { groupOrders: config } = useSelector(selectConfig)
  const menuSlug = useSelector(selectMenuSlug)
  const order = useSelector(selectOrder)
  const displaySettings = useSelector(selectDisplaySettings)
  const tz = useSelector(selectTimezone)
  const { prepTime } = useSelector(selectGroupOrderPrepTimes)
  const groupOrder = useSelector(selectGroupOrder)
  const {
    loading,
    error,
    cartId,
    cart: groupCart,
    requestedAt,
    cutoffAt,
    spendingLimit,
    guestLimit,
    guestCount,
  } = groupOrder
  const orderTime = makeGroupOrderTimeStr(requestedAt, tz)
  const cutoffTime = makeGroupOrderTimeStr(cutoffAt, tz)
  const isLoading = loading === 'pending'

  useEffect(() => {
    window.scroll(0, 0)
    dispatch(updateCustomerGroupOrder(cartId))
  }, [dispatch, cartId, order.requestedAt])

  const adjustTime = (evt, type) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'requestedAt' }))
    evt.target.blur()
  }

  const checkout = (evt) => {
    evt.preventDefault()
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

  return (
    <>
      {isBrowser && <Background imageUrl={config.background} />}
      <div className="content">
        {isLoading ? (
          <Loader
            text="Retrieving your group order..."
            className="loading--left"
          />
        ) : (
          <>
            <PageTitle
              title="Review your group order"
              subtitle="Use this page to review the orders that have been submitted before checking out."
            />
            <div className="content__body ot-line-height slide-up">
              <div className="container">
                <div className="content__section content__text">
                  <p className="ot-color-headings ot-bold ot-font-size-big">
                    This group order will remain open for editing until you to
                    proceed to the checkout page.
                  </p>
                  <p>
                    Orders will be appear below as they're added by your
                    friends. {guestCount} orders have been submitted so far
                    {guestLimit &&
                      `, and there is a limit of ${guestLimit} orders in total (not including your own)`}
                    .
                  </p>
                  {orderTime === 'ASAP' ? (
                    <p>
                      Please note that this order is currently scheduled for
                      ASAP and will be ready about {prepTime} minutes from the
                      time it gets submitted.
                    </p>
                  ) : (
                    <p>
                      Please note that this order must be submitted by{' '}
                      {cutoffTime} in order to be ready by the scheduled time of{' '}
                      {orderTime}.{' '}
                      <Button
                        text="Click here if you need to choose a different time."
                        classes="ot-btn-link"
                        onClick={adjustTime}
                      />
                    </p>
                  )}
                  <p>Ready to submit your order?</p>
                  <p>
                    <Button
                      text="Proceed To Checkout"
                      classes="ot-btn"
                      // icon={iconMap['DollarSign']}
                      onClick={checkout}
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
                    <p className="content__section__header__title ot-heading ot-font-size-h4">
                      Your items
                    </p>
                    <p className="content__section__header__subtitle ot-font-size-small">
                      <Link to={menuSlug}>
                        Click here to get back to the menu if you need to make
                        any changes to your own order.
                      </Link>
                    </p>
                  </div>
                  <div className="section__content ot-bg-color-primary ot-border-radius">
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
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

GroupOrderReviewOwner.displayName = 'GroupOrderReviewOwner'
export default GroupOrderReviewOwner
