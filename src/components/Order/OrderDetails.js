import { useSelector } from 'react-redux'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { makeServiceTypeName, makeTenderName } from '@open-tender/js'

import { selectOutpostName } from '../../slices'
import OrderRequestedAt from './OrderRequestedAt'

const OrderDetailsView = styled('div')`
  margin: 3rem 0 2rem;
`

const OrderDetail = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
  flex-wrap: wrap;

  span,
  a {
    display: block;
    font-family: ${(props) => props.theme.fonts.preface.family};
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 1.277778;
  }

  span + span {
    font-weight: normal;
  }
`

const OrderNotes = styled('div')`
  margin: 2rem 0 0;

  p {
    display: block;
    font-family: ${(props) => props.theme.fonts.preface.family};
    font-size: 1.8rem;
    line-height: 1.277778;
  }
`

const OrderDetails = ({ order, includeTime = false, style = null }) => {
  const {
    status,
    service_type,
    order_type,
    revenue_center,
    is_asap,
    requested_at,
    requested_time,
    estimated_at,
    timezone,
    delivery,
    address,
    details,
    tenders,
  } = order || {}
  const { notes } = details || {}
  const outpostName = useSelector(selectOutpostName)
  const isCatering = order_type === 'CATERING'
  const isOutpost = revenue_center ? revenue_center.is_outpost : false
  const serviceTypeName = makeServiceTypeName(
    service_type,
    isCatering,
    isOutpost,
    outpostName
  )
  const { street, unit, city, state, postal_code, company, contact, phone } =
    address || {}
  const deliveryContact = [company, contact, phone].filter((i) => i).join(' / ')
  const trackingUrl = status === 'OPEN' && delivery && delivery.tracking_url
  const payment = tenders
    ? tenders.map((i) => makeTenderName(i)).join(', ')
    : null

  return (
    <OrderDetailsView style={style}>
      <OrderDetail>
        <span>Restaurant</span>
        <span>{revenue_center.name}</span>
      </OrderDetail>
      <OrderDetail>
        <span>Service Type</span>
        <span>{serviceTypeName}</span>
      </OrderDetail>
      {includeTime && (
        <OrderDetail>
          <span>Date & Time</span>
          <span>
            <OrderRequestedAt
              estimated_at={estimated_at || requested_at}
              requested_time={requested_time}
              timezone={timezone}
              is_asap={is_asap}
              status={status}
            />
          </span>
        </OrderDetail>
      )}
      {deliveryContact && (
        <OrderDetail>
          <span>Company / Contact</span>
          <span>{deliveryContact}</span>
        </OrderDetail>
      )}
      {service_type === 'DELIVERY' && address && (
        <OrderDetail>
          <span>Delivery Address</span>
          <span>
            {street}, {unit}, {city}, {state} {postal_code}
          </span>
        </OrderDetail>
      )}
      {payment && (
        <OrderDetail>
          <span>Payment</span>
          <span>{payment}</span>
        </OrderDetail>
      )}
      {trackingUrl && (
        <OrderDetail>
          <span>&nbsp;</span>
          <a
            href={trackingUrl}
            rel="noopener noreferrer"
            target="_blank"
            title="Check delivery status"
          >
            Check delivery status
          </a>
        </OrderDetail>
      )}
      {notes && (
        <OrderNotes>
          <OrderDetail>
            <span>Order Notes</span>
          </OrderDetail>
          <p>{notes}</p>
        </OrderNotes>
      )}
    </OrderDetailsView>
  )
}

OrderDetails.displayName = 'OrderDetails'
OrderDetails.propTypes = {
  order: propTypes.object,
  includeTime: propTypes.bool,
  style: propTypes.object,
}

export default OrderDetails
