import React from 'react'
import propTypes from 'prop-types'
import CheckoutLineItem from './CheckoutLineItem'
import Button from './Button'
import CircleLoader from './CircleLoader'
import { makeTenderTypeLabel } from './TenderTypes'
import { tenderTypeNamesMap } from './utils/constants'
import CheckoutCreditCards from './CheckoutCreditCards'

const CheckoutTender = ({
  tenderType,
  isPaid,
  tenderTypesApplied,
  showCredit,
  setShowCredit,
  addTender,
  addCredit,
  removeTender,
}) => {
  const label = makeTenderTypeLabel(tenderType)
  const name = tenderTypeNamesMap[tenderType]
  const isApplied = tenderTypesApplied.includes(tenderType)
  const applyTender =
    tenderType === 'CREDIT'
      ? addCredit
      : (evt) => {
          addTender(evt, { tender_type: tenderType })
          setShowCredit(false)
        }
  return (
    <>
      <CheckoutLineItem key={tenderType} label={label}>
        <div className="input__wrapper">
          {isApplied ? (
            <>
              <span className="input__success">
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
        <CheckoutCreditCards
          addTender={addTender}
          removeTender={removeTender}
          setShowCredit={setShowCredit}
        />
      )}
    </>
  )
}

CheckoutTender.displayName = 'CheckoutTender'
CheckoutTender.prototypes = {
  tenderType: propTypes.string,
  isPaid: propTypes.bool,
  tenderTypesApplied: propTypes.array,
  showCredit: propTypes.func,
  addTender: propTypes.func,
  addCredit: propTypes.func,
  removeTender: propTypes.func,
}
export default CheckoutTender
