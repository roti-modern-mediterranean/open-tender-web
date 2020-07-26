import React from 'react'
import propTypes from 'prop-types'
import MenuRevenueCenter from './MenuRevenueCenter'

const MenuRevenueCenters = ({ revenueCenters, selected, change }) => {
  return revenueCenters && !selected ? (
    <div className="menu__rcs slide-up">
      <div className="menu__rcs__header">
        <div className="container">
          <h3 className="menu__rcs__title">Please select a vendor</h3>
        </div>
      </div>
      <div className="menu__rcs__items">
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
