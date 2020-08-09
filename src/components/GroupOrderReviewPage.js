import React, { useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  selectOrder,
  selectGroupOrder,
  resetGroupOrder,
  updateGroupOrder,
} from '@open-tender/redux'
import { makeDisplayItem } from '@open-tender/js'
import { CartItem } from '@open-tender/components'

import { selectConfig, selectDisplaySettings } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'
import Loader from './Loader'
import SectionHeader from './SectionHeader'
import OrderQuantity from './OrderQuantity'
import GroupOrderInfo from './GroupOrderInfo'

const placeholderConfig = {
  background:
    'https://s3.amazonaws.com/betterboh/u/img/prod/2/1597004038_group-lake_1800x1013.jpg',
  title: "You're in!",
  subtitle:
    'Please review your order below and return to the menu if you need to make any updates',
}

const GroupOrderReviewPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  // const { groupOrder: config } = useSelector(selectConfig)
  const config = placeholderConfig
  const { cart } = useSelector(selectOrder)
  const groupOrder = useSelector(selectGroupOrder)
  const displaySettings = useSelector(selectDisplaySettings)
  const { loading, error, cartId } = groupOrder
  const isLoading = loading === 'pending'
  // const displayedItems = cart ? cart.map((i) => makeDisplayItem(i)) : []

  useEffect(() => {
    window.scroll(0, 0)
    !cartId ? history.push(`/`) : dispatch(updateGroupOrder())
  }, [cartId, history, dispatch, cart])

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
            <PageTitle title={config.title} subtitle={config.subtitle} />
            <div className="content__body ot-line-height slide-up">
              <div className="container">
                <div className="content__text">
                  <GroupOrderInfo />
                  <div className="section__container">
                    {/* <SectionHeader title="Items in Your Order" /> */}
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
            </div>
            {/* <div className="section slide-up">
              <div className="container">
                <div className="section__container">
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
            </div> */}
          </>
        )}
      </div>
    </>
  )
}

GroupOrderReviewPage.displayName = 'GroupOrderReviewPage'
export default GroupOrderReviewPage
