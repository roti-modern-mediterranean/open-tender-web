import React, { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { formatDollars, checkAmountRemaining, makeTenderName } from './utils'
import BarLoader from 'react-spinners/BarLoader'

const CheckItem = ({ label, value, classes = '' }) => (
  <li className={`check__item border-color ${classes}`}>
    <span>{label}</span>
    <span>{formatDollars(value)}</span>
  </li>
)

CheckItem.displayName = 'CheckItem'
CheckItem.propTypes = {
  name: propTypes.string,
  value: propTypes.string,
  unit: propTypes.string,
}

const CheckUpdating = () => (
  <div className="check__disabled overlay">
    <div className="check__disabled__working">
      <BarLoader size={36} color={'#000'} />
      <span>Updating...</span>
    </div>
  </div>
)

const Check = ({ title, totals, tenders, updating = false }) => {
  const [isSticky, setSticky] = useState(false)
  const stickyRef = useRef(null)
  const handleScroll = () => {
    if (stickyRef.current) {
      setSticky(stickyRef.current.getBoundingClientRect().top <= 110)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', () => handleScroll)
    }
  }, [])
  const stuckClass = isSticky ? 'stuck' : ''

  const {
    subtotal,
    surcharges,
    surcharge,
    discounts,
    discount,
    taxes,
    tax,
    tip,
    shipping,
    total,
  } = totals

  const totalBeforeTax = [subtotal, surcharge, discount]
    .reduce((t, i) => (t += parseFloat(i)), 0.0)
    .toFixed(2)
  // const tendersTotal = tenders
  //   .reduce((t, i) => (t += parseFloat(i.amount)), 0.0)
  //   .toFixed(2)
  const amountRemaiing = checkAmountRemaining(total, tenders)

  return (
    <div
      className={`check border-radius bg-color ${stuckClass}`}
      ref={stickyRef}
    >
      <div className="check__container">
        {updating && <CheckUpdating />}
        <h2 className="check__title ot-font-size-h4">{title}</h2>
        <ul className="check__items">
          <CheckItem label="Subtotal" value={subtotal} />
          {surcharges.length ? (
            <>
              <ul className="check__items__section font-size-small">
                {surcharges.map((surcharge) => (
                  <CheckItem
                    key={surcharge.surcharge_id}
                    label={`${surcharge.name}`}
                    value={surcharge.amount}
                  />
                ))}
              </ul>
              <CheckItem label="Surcharge" value={surcharge} />
            </>
          ) : null}
          {discounts.length ? (
            <>
              <ul className="check__items__section font-size-small">
                {discounts.map((discount) => (
                  <CheckItem
                    key={discount.discount_id}
                    label={`${discount.name}`}
                    value={discount.amount}
                  />
                ))}
              </ul>
              <CheckItem label="Discount" value={discount} />
            </>
          ) : null}
          {subtotal !== totalBeforeTax && (
            <CheckItem
              label="Total before Tax"
              value={totalBeforeTax}
              classes="check__item--total ot-bold"
            />
          )}
          {taxes.length > 1 ? (
            <ul className="check__items__section font-size-small">
              {taxes.map((tax) => (
                <CheckItem
                  key={tax.tax_id}
                  label={`${tax.name}`}
                  value={tax.amount}
                />
              ))}
            </ul>
          ) : null}
          <CheckItem label="Tax" value={tax} />
          <CheckItem label="Tip" value={tip} />
          {shipping !== '0.00' && (
            <CheckItem label="Shipping" value={shipping} />
          )}
          <CheckItem
            label="Total"
            value={total}
            classes="check__item--grand-total ot-bold"
          />
          {tenders.length ? (
            <>
              <ul className="check__items__section font-size-small">
                {tenders.map((tender, index) => (
                  <CheckItem
                    key={`${tender.tender_type}-${tender.amount}-${index}`}
                    label={`${makeTenderName(tender)}`}
                    value={tender.amount}
                  />
                ))}
              </ul>
              {/* <CheckItem label="Total Tenders" value={tendersTotal} /> */}
              <CheckItem
                label="Amount Remaining"
                value={amountRemaiing}
                classes="check__item--grand-total ot-bold"
              />
            </>
          ) : null}
        </ul>
      </div>
    </div>
  )
}

Check.displayName = 'Check'
Check.propTypes = {
  title: propTypes.string,
  totals: propTypes.object,
}

export default Check
