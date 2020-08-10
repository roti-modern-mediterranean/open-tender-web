import React, { useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import {
  selectOrder,
  selectGroupOrder,
  resetGroupOrder,
  updateGroupOrder,
  reloadGuestOrder,
  resetOrder,
  selectMenuSlug,
} from '@open-tender/redux'
import { CartItem, Button } from '@open-tender/components'

import { selectDisplaySettings } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'
import Loader from './Loader'
import OrderQuantity from './OrderQuantity'
import iconMap from './iconMap'

const placeholderConfig = {
  background:
    'https://s3.amazonaws.com/betterboh/u/img/prod/2/1597004038_group-lake_1800x1013.jpg',
  title: "You're in!",
  subtitle:
    'Please review your order below and return to the menu if you need to make any updates.',
}

const makeSubtitle = (error, cart, cartOwnerName, config) => {
  // const isError = error || closed || pastCutoff

  if (!error) {
    return config.subtitle
  } else {
    if (cart.length) {
      return 'This group order is now closed for editing, but the items below have been added.'
    } else {
      return `We're sorry, but this group order is already closed. Please contact ${cartOwnerName} to see if they can reopen it.`
    }
  }
}

const GroupOrderReviewPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  // const { groupOrder: config } = useSelector(selectConfig)
  const config = placeholderConfig
  const menuSlug = useSelector(selectMenuSlug)
  const { cart } = useSelector(selectOrder)
  const displaySettings = useSelector(selectDisplaySettings)
  const groupOrder = useSelector(selectGroupOrder)
  const {
    loading,
    error,
    cartId,
    cartOwner,
    cart: groupCart,
    cartGuest,
  } = groupOrder
  const { cartGuestId } = cartGuest || {}
  const cartOwnerName = cartOwner
    ? `${cartOwner.first_name} ${cartOwner.last_name}`
    : ''
  const isLoading = loading === 'pending'
  const subtitle = makeSubtitle(error, groupCart, cartOwnerName, config)

  useEffect(() => {
    window.scroll(0, 0)
    !cartId ? history.push(`/`) : dispatch(updateGroupOrder())
  }, [cartId, history, dispatch])

  useEffect(() => {
    if (error && cartGuestId) dispatch(reloadGuestOrder())
  }, [error, cartGuestId, dispatch])

  const startOver = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    dispatch(resetGroupOrder())
    dispatch(resetOrder())
    history.push('/')
  }

  return (
    <>
      {isBrowser && <Background imageUrl={config.background} />}
      <div className="content">
        {isLoading ? (
          <Loader
            text="Submitting your order to the group..."
            className="loading--left"
          />
        ) : (
          <>
            <PageTitle title={config.title} subtitle={subtitle} />
            <div className="content__body ot-line-height slide-up">
              <div className="container">
                <div className="content__section content__text">
                  {!error && (
                    <p>
                      <Link to={menuSlug}>
                        Click here to head back to the menu.
                      </Link>
                    </p>
                  )}
                  <p>
                    Want to start a new order just for you? Use the button
                    below.
                  </p>
                  <Button
                    classes="ot-btn"
                    icon={iconMap['RefreshCw']}
                    text="Start A New Order"
                    onClick={startOver}
                  />
                </div>
                <div className="content__section">
                  <div className="content__section__header">
                    <h3>Items submitted to {cartOwnerName}'s group order</h3>
                  </div>
                  <div className="section__content ot-bg-color-primary ot-border-radius">
                    <ul className="cart">
                      {cart.map((item, index) => {
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

GroupOrderReviewPage.displayName = 'GroupOrderReviewPage'
export default GroupOrderReviewPage
