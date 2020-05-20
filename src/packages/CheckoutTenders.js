import React, { useContext, useState, useEffect } from 'react'
import CheckoutLineItem from './CheckoutLineItem'
import Button from './Button'
import CircleLoader from './CircleLoader'
import { FormContext } from './CheckoutForm'
import { checkAmountRemaining } from './utils'
import { makeTenderTypeLabel } from './TenderTypes'
import { tenderTypeNamesMap } from './constants'
import CheckoutCreditCards from './CheckoutCreditCards'

const CheckoutTenders = () => {
  const formContext = useContext(FormContext)
  const { config, check, form, updateForm } = formContext
  const [showCredit, setShowCredit] = useState(false)

  const tenderTypes = check.config.tender_types.filter((i) => i !== 'GIFT_CARD')
  const tenderTypesApplied = form.tenders.map((i) => i.tender_type)
  const amountRemaining = checkAmountRemaining(check.totals.total, form.tenders)
  const isPaid = Math.abs(amountRemaining).toFixed(2) === '0.00'

  useEffect(() => {
    tenderTypesApplied.includes('CREDIT')
      ? setShowCredit(true)
      : setShowCredit(false)
  }, [])

  const addTender = (evt, tender) => {
    evt.preventDefault()
    const newTender = { ...tender, amount: amountRemaining.toFixed(2) }
    updateForm({ tenders: [...form.tenders, newTender] })
    evt.target.blur()
  }

  const addCredit = (evt) => {
    evt.preventDefault()
    setShowCredit(true)
    evt.target.blur()
  }

  const removeTender = (evt, tenderType) => {
    evt.preventDefault()
    const filtered = form.tenders.filter((i) => i.tender_type !== tenderType)
    const nonGiftCard = filtered.filter((i) => i.tender_type !== 'GIFT_CARD')
    const giftCard = filtered.filter((i) => i.tender_type === 'GIFT_CARD')
    let remaining = checkAmountRemaining(check.totals.total, nonGiftCard)
    const adjusted = nonGiftCard.map((i) => {
      const newAmount = remaining
      remaining -= newAmount
      return { ...i, amount: newAmount.toFixed(2) }
    })
    const nonZero = adjusted.filter((i) => i.amount !== '0.00')
    updateForm({ tenders: [...giftCard, ...nonZero] })
    if (tenderType === 'CREDIT') setShowCredit(false)
    evt.target.blur()
  }

  return (
    <fieldset className="form__fieldset">
      <div className="form__legend">
        <p className="form__legend__title heading ot-font-size-h4">
          {config.tenders.title}
        </p>
        <p className="form__legend__subtitle">{config.tenders.subtitle}</p>
      </div>
      <div className="form__inputs">
        {tenderTypes.map((tenderType) => {
          const label = makeTenderTypeLabel(tenderType)
          const name = tenderTypeNamesMap[tenderType]
          const isApplied = tenderTypesApplied.includes(tenderType)
          const applyTender =
            tenderType === 'CREDIT'
              ? addCredit
              : (evt) => addTender(evt, { tender_type: tenderType })
          return (
            <>
              <CheckoutLineItem key={tenderType} label={label}>
                <div className="form__line__wrapper">
                  {isApplied ? (
                    <>
                      <span className="form__line__success">
                        <CircleLoader complete={true} />
                      </span>
                      <Button
                        text={`Remove ${name} Payment`}
                        ariaLabel={`Remove ${name} Payment`}
                        icon="XCircle"
                        classes="btn--header"
                        onClick={(evt) => removeTender(evt, tenderType)}
                      />
                    </>
                  ) : (
                    <Button
                      text={`Pay with ${name}`}
                      ariaLabel={`Pay with ${name}`}
                      icon="PlusCircle"
                      classes="btn--header"
                      onClick={applyTender}
                      disabled={isPaid}
                    />
                  )}
                </div>
              </CheckoutLineItem>
              {tenderType === 'CREDIT' && showCredit && (
                <CheckoutCreditCards addTender={addTender} />
              )}
            </>
          )
        })}
      </div>
    </fieldset>
  )
}

CheckoutTenders.displayName = 'CheckoutTenders'

export default CheckoutTenders
