import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Button } from '../packages'

const AccountGreeting = ({ title, subtitle }) => {
  const history = useHistory()

  const startOrder = (evt) => {
    evt.preventDefault()
    history.push('/')
    evt.target.blur()
  }

  return (
    <div className="location location--hero bg-color border-radius slide-up">
      <div className="location__content">
        <div className="location__header">
          <h2 className="ot-font-size-h5">{title}</h2>
          <p>{subtitle}</p>
        </div>
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
