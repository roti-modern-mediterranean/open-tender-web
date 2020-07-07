import React from 'react'
import propTypes from 'prop-types'

const OrderRevenueCenter = ({ revenueCenter }) => {
  const { address: rcAddr } = revenueCenter || {}
  return (
    <>
      <p>{revenueCenter.name}</p>
      <p className="ot-font-size-small ot-color-secondary">
        {rcAddr.street}, {rcAddr.city}, {rcAddr.state} {rcAddr.postal_code}
      </p>
      <p className="ot-font-size-small ot-color-secondary">{rcAddr.phone}</p>
    </>
  )
}

OrderRevenueCenter.displayName = 'OrderRevenueCenter'
OrderRevenueCenter.propTypes = {
  revenueCenter: propTypes.object,
}
export default OrderRevenueCenter
