import React from 'react'
import propTypes from 'prop-types'

const CheckItem = ({ label, value, classes = '' }) => (
  <li className={`check__item border-color ${classes}`}>
    <span>{label}</span>
    <span>{value}</span>
  </li>
)

CheckItem.displayName = 'CheckItem'
CheckItem.propTypes = {
  name: propTypes.string,
  value: propTypes.string,
  unit: propTypes.string,
}

const Check = ({ order }) => {
  const {
    subtotal,
    surcharges,
    surcharge,
    discounts,
    discount,
    taxes,
    total,
  } = order
  const totalBeforeTax = subtotal + surcharge + discount
  return (
    <div className="check">
      <ul className="check__items">
        <CheckItem label="Subtotal" value={subtotal} />
        {surcharges.map((surcharge) => (
          <CheckItem
            key={surcharge.surcharge_id}
            label={surcharge.name}
            value={surcharge.amount}
          />
        ))}
        {discounts.map((discount) => (
          <CheckItem
            key={discount.discount_id}
            label={discount.name}
            value={discount.amount}
          />
        ))}
        <CheckItem
          label="Total before Tax"
          value={totalBeforeTax}
          classes="check__item--total"
        />
        {taxes.map((tax) => (
          <CheckItem key={tax.tax_id} label={tax.name} value={tax.amount} />
        ))}
        <CheckItem
          label="Total"
          value={total}
          classes="check__item--grand-total"
        />
      </ul>
    </div>
  )
}

Check.displayName = 'Check'
Check.propTypes = {
  name: propTypes.string,
  value: propTypes.string,
  unit: propTypes.string,
}

export default Check
