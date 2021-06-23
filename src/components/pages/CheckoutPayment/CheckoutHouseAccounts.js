import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { checkAmountRemaining } from '@open-tender/js'
import { selectCheckout, updateForm } from '@open-tender/redux'

import CheckoutHouseAccount from './CheckoutHouseAccount'

const CheckoutHouseAccountsView = styled('div')`
  margin: 3rem 0 6rem;

  & > p {
    margin: 0 0 3rem;
    width: 100%;
    text-align: center;
  }
`

const CheckoutHouseAccounts = () => {
  const dispatch = useDispatch()
  const { check, form } = useSelector(selectCheckout)
  const total = check.totals ? check.totals.total : 0.0
  const amount = checkAmountRemaining(total, form.tenders).toFixed(2)
  const houseAccounts = check.customer.house_accounts || []
  const applied = form.tenders
    .filter((i) => i.tender_type === 'HOUSE_ACCOUNT')
    .map((i) => i.house_account_id)
  const giftTenders = useMemo(
    () => form.tenders.filter((i) => i.tender_type === 'GIFT_CARD'),
    [form.tenders]
  )
  const isPaid = parseFloat(amount) <= 0
  const isOtherTender = isPaid && applied.length === 0

  const apply = useCallback(
    (houseAccount) => {
      if (parseFloat(amount) > 0) {
        const tender = { tender_type: 'HOUSE_ACCOUNT', amount, ...houseAccount }
        dispatch(updateForm({ tenders: [...giftTenders, tender] }))
      }
    },
    [dispatch, amount, giftTenders]
  )

  const remove = () => {
    dispatch(updateForm({ tenders: giftTenders }))
  }

  return (
    <CheckoutHouseAccountsView>
      {isOtherTender && !applied.length && (
        <p>
          Amount remaining is $0.00. Please remove any other tenders that have
          been applied.
        </p>
      )}
      {houseAccounts.map((houseAccount) => {
        const {
          house_account_id,
          name,
          service_type,
          order_type,
          revenue_centers,
        } = houseAccount
        const isOrderType = order_type ? order_type === check.order_type : true
        const isServiceType = order_type
          ? service_type === check.service_type
          : true
        const revenueCenterId = check.revenue_center.revenue_center_id
        const revenueCenterIds = revenue_centers.map((i) => i.revenue_center_id)
        const isRevenueCenter = revenueCenterIds.length
          ? revenueCenterIds.includes(revenueCenterId)
          : true
        const isApplied = applied.includes(house_account_id)
        const isDisabled =
          isOtherTender ||
          !isOrderType ||
          !isServiceType ||
          !isRevenueCenter ||
          (applied.length && !isApplied)
        const msg = !isRevenueCenter
          ? 'Cannot be used with this location'
          : !isOrderType
          ? 'Cannot be used with this order type'
          : !isServiceType
          ? 'Cannot be used with this service type'
          : null
        return (
          <CheckoutHouseAccount
            key={house_account_id}
            label={name}
            msg={msg}
            isApplied={isApplied}
            disabled={isDisabled}
            onClick={isApplied ? remove : () => apply(houseAccount)}
            amount={amount}
          />
        )
      })}
    </CheckoutHouseAccountsView>
  )
}

CheckoutHouseAccounts.displayName = 'CheckoutHouseAccounts'

export default CheckoutHouseAccounts
