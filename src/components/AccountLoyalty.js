import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomerLoyalty, selectCustomerLoyalty } from '@open-tender/redux'
import { loyaltyType } from '@open-tender/js'

const LoyaltyProgram = ({ program }) => {
  const { name, description, loyalty_type, spend, redemption, credit } = program
  const progress =
    loyalty_type === loyaltyType.CREDIT
      ? parseInt(
          (parseFloat(spend.current) / parseFloat(redemption.threshold)) * 100
        )
      : null
  const style = { width: `${progress}%` }
  const currentCredit = parseFloat(credit.current)
  return (
    <div className="loyalty__program">
      <div className="loyalty__program__header">
        <p className="ot-heading ot-font-size-h5">{name}</p>
        {currentCredit ? (
          <p className="ot-font-size-small">
            You've got ${currentCredit.toFixed(2)} in credit to redeem!
          </p>
        ) : progress ? (
          <p className="ot-font-size-small">
            You're {progress}% of the way towards earning your next $
            {redemption.reward} off!
          </p>
        ) : (
          <p className="ot-font-size-small">{description}</p>
        )}
      </div>
      <div className="progress ot-bg-color-secondary ot-box-shadow-inset ot-border-color">
        <div className="progress__bar" style={style}>
          <div className="progress__fill ot-box-shadow ot-highlight"></div>
        </div>
      </div>
    </div>
  )
}

const AccountLoyalty = () => {
  const dispatch = useDispatch()
  const { entities, loading } = useSelector(selectCustomerLoyalty)

  useEffect(() => {
    dispatch(fetchCustomerLoyalty())
  }, [dispatch])

  return entities.length && loading !== 'pending' ? (
    <div className="loyalty">
      {entities.map((program) => (
        <LoyaltyProgram key={program.name} program={program} />
      ))}
    </div>
  ) : null
}

AccountLoyalty.displayName = 'AccountLoyalty'
AccountLoyalty.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
}

export default AccountLoyalty
