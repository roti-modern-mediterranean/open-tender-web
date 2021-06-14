import React, { useEffect, useMemo, useState } from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  setOrderServiceType,
  setAddress,
  reorderPastOrder,
  editOrder,
} from '@open-tender/redux'
import {
  timezoneMap,
  isoToDateStr,
  isoToDate,
  makeOrderAddress,
  makeOrderTypeName,
  formatDollars,
} from '@open-tender/js'
import { DeliveryLink } from '@open-tender/components'

import iconMap from './iconMap'
import { Card, CardButton } from '.'

const defaultImages = [
  'https://s3.amazonaws.com/betterboh/u/img/prod/46/1618535126_Roti_Chicken_Caulipower_Overhead.png',
  'https://s3.amazonaws.com/betterboh/u/img/prod/46/1618678590_Salads_Keto_Carnivale_Overheada.png',
  'https://s3.amazonaws.com/betterboh/u/img/prod/46/1603234765_Pita_StreetPita_600x900.png',
]

const OrderCard = ({ order, isLast }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    order_id,
    status,
    service_type,
    order_type,
    revenue_center,
    requested_at,
    timezone,
    cart,
    address,
    totals,
    delivery,
    gift_cards,
  } = order
  const [imageUrl, setImageUrl] = useState(null)
  const isOpen = status === 'OPEN'
  const isMerch = order_type === 'MERCH'
  const orderTypeName = makeOrderTypeName(order_type, service_type)
  const tz = timezoneMap[timezone]
  const requestedAt = isoToDateStr(requested_at, tz, 'MMMM d')
  const isUpcoming = isoToDate(requested_at) > new Date()
  const streetAddress = makeOrderAddress(address)
  const trackingUrl = isOpen && delivery && delivery.tracking_url
  const items = cart
    .filter((i) => i.tags.includes('curated'))
    .map((i) =>
      i.images
        .filter((m) => m.type === 'SMALL_IMAGE' && m.url)
        .map((image) => ({ ...i, imageUrl: image.url }))
    )
    .flat()
    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    .reverse()
  const randomImageUrl = useMemo(
    () => defaultImages[Math.floor(Math.random() * defaultImages.length)],
    []
  )
  const itemImageUrl = items && items.length ? items[0].imageUrl : null
  const cartItems = cart.map((i) => `${i.quantity} ${i.name}`).join(', ')
  const giftCards = gift_cards
    ? gift_cards
        .map((i) => `${formatDollars(i.amount, '', 0)} gift card`)
        .join(', ')
    : null
  const title = isMerch && giftCards ? giftCards : cartItems

  const handleReorder = () => {
    const { revenue_center_id: revenueCenterId } = revenue_center
    const serviceType = service_type
    dispatch(setOrderServiceType(order_type, service_type))
    dispatch(setAddress(address || null))
    dispatch(reorderPastOrder({ revenueCenterId, serviceType, items: cart }))
  }

  useEffect(() => {
    if (!imageUrl) {
      setImageUrl(itemImageUrl || randomImageUrl)
    }
  }, [imageUrl, itemImageUrl, randomImageUrl])

  return (
    <Card
      id={order_id}
      isOlo={order_type === 'OLO'}
      imageUrl={imageUrl}
      preface={
        <>
          <span>{requestedAt}</span>
          <span>${totals.total}</span>
        </>
      }
      title={title}
      description={
        <>
          <p>
            {orderTypeName} from {revenue_center.name}
          </p>
          <p>{streetAddress}</p>
          {isUpcoming && trackingUrl && (
            <p>
              <DeliveryLink
                text="Track your delivery"
                trackingUrl={trackingUrl}
                newWindowIcon={iconMap.ExternalLink}
              />
            </p>
          )}
        </>
      }
      view={(props) => (
        <CardButton
          {...props}
          onClick={() => history.push(`/orders/${order_id}`)}
        >
          View
        </CardButton>
      )}
      add={(props) =>
        order.is_editable ? (
          <CardButton {...props} onClick={() => dispatch(editOrder(order))}>
            Edit
          </CardButton>
        ) : !isMerch ? (
          <CardButton {...props} onClick={handleReorder}>
            Add
          </CardButton>
        ) : null
      }
    />
  )
}

OrderCard.displayName = 'OrderCard'
OrderCard.propTypes = {
  order: propTypes.object,
  isLast: propTypes.bool,
}

export default OrderCard
