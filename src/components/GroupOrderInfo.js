import React from 'react'
import propTypes from 'prop-types'

const GroupOrderInfo = ({
  orderTime,
  cutoffTime,
  spendingLimit,
  spotsRemaining,
}) => {
  return (
    <div className="join__info">
      <p>
        This order is current scheduled for {orderTime}, and{' '}
        <span className="">orders must be submitted by {cutoffTime}</span>.
      </p>
      {spendingLimit && (
        <p>There is a spending limit of ${spendingLimit} for this order.</p>
      )}
      <p>
        {spotsRemaining && (
          <span className="">Only {spotsRemaining} spots left! </span>
        )}{' '}
        Please enter a first and last name to get started.
      </p>
    </div>
  )
}

GroupOrderInfo.displayName = 'GroupOrderInfo'
GroupOrderInfo.propTypes = {
  orderTime: propTypes.string,
  cutoffTime: propTypes.string,
  spendingLimit: propTypes.string,
  spotsRemaining: propTypes.number,
}
export default GroupOrderInfo
