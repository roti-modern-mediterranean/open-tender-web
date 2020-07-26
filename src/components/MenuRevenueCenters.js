import React from 'react'
import propTypes from 'prop-types'
import MenuRevenueCenter from './MenuRevenueCenter'

const MenuRevenueCenters = ({ revenueCenters, selected, change }) => {
  return revenueCenters && !selected ? (
    <div className="menu__rcs">
      <div className="menu__rcs__header ot-dark">
        <div className="container">
          <p className="menu__rcs__title ot-preface ot-font-size-small">
            Please select a vendor
          </p>
        </div>
      </div>
      <div className="menu__rcs__items slide-up">
        {revenueCenters.map((i) => (
          <MenuRevenueCenter
            key={i.revenue_center_id}
            revenueCenter={i}
            change={change}
          />
        ))}
      </div>
    </div>
  ) : null
}

MenuRevenueCenters.displayName = 'MenuRevenueCenters'
MenuRevenueCenters.propTypes = {
  revenueCenters: propTypes.array,
  selected: propTypes.object,
  change: propTypes.func,
}

export default MenuRevenueCenters
