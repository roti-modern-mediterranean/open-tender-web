import React from 'react'
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
} from '@open-tender/js'
import { Box, ButtonStyled, DeliveryLink } from '@open-tender/components'

import OrderImages from './OrderImages'
import OrderTag from './OrderTag'
import iconMap from './iconMap'
import styled from '@emotion/styled'
import { Preface } from '.'

const OrderCardView = styled(Box)`
  position: relative;
  height: 100%;
  padding: 1.5rem 1.5rem 1rem;
`

const OrderCardContainer = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const OrderCardHeader = styled('div')`
  flex-grow: 0;
`

const OrderCardNumber = styled('p')`
  span {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const OrderCardTitle = styled('p')`
  margin: 0.4rem 0;
  color: ${(props) => props.theme.fonts.headings.color};
`

const OrderCardLink = styled('p')`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const OrderCardContent = styled('div')`
  margin: 1rem 0 0;
  flex-grow: 1;

  > p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.lineHeight};
  }
`

const OrderCardImages = styled('div')`
  margin: 1.5rem 0 0;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const OrderCardFooter = styled('div')`
  flex-grow: 0;
  margin: 1.9rem 0 0;

  > div {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    button {
      margin: 0 0.5rem 0.5rem 0;
      &:last-child {
        margin: 0;
      }
    }
  }
`

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
  } = order
  const isOpen = status === 'OPEN'
  const isMerch = order_type === 'MERCH'
  const orderTypeName = makeOrderTypeName(order_type, service_type)
  const tz = timezoneMap[timezone]
  const requestedAt = isoToDateStr(requested_at, tz, 'MMMM d, yyyy @ h:mma')
  const isUpcoming = isoToDate(requested_at) > new Date()
  const streetAddress = makeOrderAddress(address)
  const trackingUrl = isOpen && delivery && delivery.tracking_url
  const itemNames = cart.map((i) => i.name).join(', ')

  const handleReorder = () => {
    const { revenue_center_id: revenueCenterId } = revenue_center
    const serviceType = service_type
    dispatch(setOrderServiceType(order_type, service_type))
    dispatch(setAddress(address || null))
    dispatch(reorderPastOrder({ revenueCenterId, serviceType, items: cart }))
  }

  return (
    <OrderCardView>
      <OrderTag isUpcoming={isUpcoming} status={status} />
      <OrderCardContainer>
        <OrderCardHeader>
          <OrderCardNumber>
            <Preface>
              {isLast ? 'Your Last Order' : `Order #${order_id}`}
            </Preface>
          </OrderCardNumber>
          <OrderCardTitle>
            {orderTypeName} from {revenue_center.name}
          </OrderCardTitle>
          {isUpcoming && trackingUrl && (
            <OrderCardLink>
              <DeliveryLink
                text="Track your delivery"
                trackingUrl={trackingUrl}
              />
            </OrderCardLink>
          )}
        </OrderCardHeader>
        <OrderCardContent>
          <p>
            {requestedAt} &nbsp;|&nbsp; ${totals.total}
          </p>
          <p>{streetAddress}</p>
          <OrderCardImages>
            <OrderImages items={cart} />
            <p>{itemNames}</p>
          </OrderCardImages>
        </OrderCardContent>
        <OrderCardFooter>
          <div>
            {order.is_editable && (
              <ButtonStyled
                icon={iconMap.Edit}
                onClick={() => dispatch(editOrder(order))}
                size="small"
              >
                Edit
              </ButtonStyled>
            )}
            {!isMerch && (
              <ButtonStyled
                icon={iconMap.RefreshCw}
                onClick={handleReorder}
                size="small"
                color={order.is_editable ? 'secondary' : 'primary'}
              >
                Reorder
              </ButtonStyled>
            )}
            <ButtonStyled
              icon={iconMap.FileText}
              onClick={() => history.push(`/orders/${order_id}`)}
              size="small"
              color="secondary"
            >
              Details
            </ButtonStyled>
          </div>
        </OrderCardFooter>
      </OrderCardContainer>
    </OrderCardView>
  )
}

OrderCard.displayName = 'OrderCard'
OrderCard.propTypes = {
  order: propTypes.object,
  isLast: propTypes.bool,
}

export default OrderCard
