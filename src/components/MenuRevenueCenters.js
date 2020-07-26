import React from 'react'
import propTypes from 'prop-types'
import MenuRevenueCenter from './MenuRevenueCenter'

const MenuRevenueCenters = ({ revenueCenters, selected, change }) => {
  return revenueCenters && !selected ? (
    <div className="menu__category">
      <div className="menu__category__header">
        <div className="container">
          <h3 className="menu__category__title">
            Please choose a vendor to get started
          </h3>
          <p className="menu__category__subtitle ot-color-secondary ot-line-height">
            Some description goes here
          </p>
        </div>
      </div>
      <div className="menu__items">
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
