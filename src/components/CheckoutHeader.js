import React from 'react'
import propTypes from 'prop-types'
import { formatDollars } from '@open-tender/js'

const CheckoutHeader = ({ checkout = {} }) => {
  const { check, loading, submitting } = checkout
  const updating = submitting ? false : loading === 'pending'
  return (
    check &&
    check.totals && (
      <div className="checkout__header slide-up ot-dark">
        <div className="container">
          <div className="checkout__header__container">
            <div className="checkout__header__label">
              <p className="ot-preface ot-font-size">
                Order Total w/ Tax & Tip
              </p>
            </div>
            <div className="checkout__header__value">
              <p>
                {updating
                  ? 'Updating...'
                  : `
                ${formatDollars(check.totals.total)}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

CheckoutHeader.displayName = 'CheckoutHeader'
CheckoutHeader.propTypes = {
  checkout: propTypes.object,
}

export default CheckoutHeader
