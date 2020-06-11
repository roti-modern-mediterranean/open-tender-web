import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCustomerLoyalty,
  selectToken,
  selectCustomerLoyalty,
} from '../slices/customerSlice'
import { loyaltyType } from '../packages/utils/constants'

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
        <p className="heading ot-font-size-h5">{name}</p>
        {currentCredit ? (
          <p className="font-size-small ot-success-color">
            You've got ${currentCredit.toFixed(2)} in credit to redeem!
            {/* {progress
              ? `and you're ${progress}% of the way towards your next reward!`
              : 'to redeem!'} */}
          </p>
        ) : progress ? (
          <p className="font-size-small">
            You're {progress}% of the way towards earning your next $
            {redemption.reward} off!
          </p>
        ) : (
          <p className="font-size-small">{description}</p>
        )}
      </div>
      <div className="progress bg-secondary-color ot-box-shadow-inset">
        <div className="progress__bar" style={style}>
          <div className="progress__fill ot-box-shadow bg-link-color"></div>
        </div>
      </div>
      {/* <div className="loyalty__program__footer">
        <p className="font-size-x-small">
          You're {progress}% of the way towards earning your next $
          {redemption.reward} off!
        </p>
      </div> */}
    </div>
  )
}

const AccountLoyalty = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const { entities, loading } = useSelector(selectCustomerLoyalty)

  useEffect(() => {
    dispatch(fetchCustomerLoyalty(token))
  }, [dispatch, token])

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
