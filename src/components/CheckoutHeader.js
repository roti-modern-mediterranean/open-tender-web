import React from 'react'
import propTypes from 'prop-types'
import { formatDollars } from '@open-tender/js'
import { BarLoader } from 'react-spinners'
import { useSelector } from 'react-redux'

import { selectLightColor } from '../slices/configSlice'

const CheckoutHeader = ({ checkout = {} }) => {
  const colorLight = useSelector(selectLightColor)
  const { check, loading, submitting } = checkout
  const updating = submitting ? false : loading === 'pending'
  const total =
    check && check.totals ? `${formatDollars(check.totals.total)}` : null
  return total ? (
    <div className="checkout__header ot-dark">
      <div className="container">
        <div className="checkout__header__container">
          <div className="checkout__header__label">
            <p className="ot-preface ot-font-size">Order Total w/ Tax & Tip</p>
          </div>
          <div className="checkout__header__value">
            <p>
              {updating ? (
                <BarLoader
                  width={50}
                  height={4}
                  color={colorLight}
                  loading={true}
                />
              ) : (
                total
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

CheckoutHeader.displayName = 'CheckoutHeader'
CheckoutHeader.propTypes = {
  checkout: propTypes.object,
}

export default CheckoutHeader
