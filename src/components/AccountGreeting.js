import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Button } from '../packages'
import { useSelector } from 'react-redux'
import { selectCustomerAccount } from '../slices/customerSlice'

const AccountGreeting = ({ title, subtitle }) => {
  const history = useHistory()
  const customer = useSelector(selectCustomerAccount)

  const startOrder = (evt) => {
    evt.preventDefault()
    history.push('/')
    evt.target.blur()
  }

  return (
    <div className="greeting bg-color border-radius slide-up">
      <div className="greeting__header">
        <h2 className="ot-font-size-h3">
          {title}, {customer.first_name}!
        </h2>
        <p>{subtitle}</p>
      </div>
      <div className="greeting__content">
        <Button
          text="Start Order"
          ariaLabel="Start a new order"
          icon="ShoppingBag"
          onClick={startOrder}
        />
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
