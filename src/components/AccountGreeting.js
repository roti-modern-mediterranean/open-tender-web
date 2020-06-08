import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Button } from '../packages'
import { useSelector } from 'react-redux'
import { selectCustomerAccount } from '../slices/customerSlice'
import { selectOrder } from '../slices/orderSlice'

const AccountGreeting = ({ title, subtitle }) => {
  const history = useHistory()
  const customer = useSelector(selectCustomerAccount)
  const { address, location, serviceType } = useSelector(selectOrder)

  const startOrder = (evt) => {
    evt.preventDefault()
    history.push('/')
    evt.target.blur()
  }

  return (
    <div className="greeting bg-color border-radius slide-up">
      <div className="greeting__header">
        <h2>
          {title}, {customer.first_name}!
        </h2>
        {/* <p>{subtitle}</p> */}
      </div>
      <div className="greeting__content">
        <div className="greeting__summary">
          <h3>Your account at a glance</h3>
        </div>
        <div className="greeting__last-order">
          {/* <h3>Your last order</h3> */}
          {/* <LastOrder order={} /> */}
        </div>
        {/* <Button
          text="Start Order"
          ariaLabel="Start a new order"
          icon="ShoppingBag"
          onClick={startOrder}
        /> */}
      </div>
    </div>
  )
}

AccountGreeting.displayName = 'AccountGreeting'
AccountGreeting.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
}

export default AccountGreeting
