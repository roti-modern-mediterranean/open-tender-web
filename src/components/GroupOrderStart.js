import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectOrder,
  selectGroupOrder,
  startGroupOrder,
  // updateGroupOrder,
} from '@open-tender/redux'
import { makeGroupOrderTime } from '@open-tender/js'
import { Button, Input } from '@open-tender/components'

import { openModal, closeModal } from '../slices'
import GroupOrderSteps from './GroupOrderSteps'
import iconMap from './iconMap'

const formatOrderTime = (s) =>
  s.replace('Today', 'today').replace('Tomorrow', 'tomorrow')

const GroupOrderStart = () => {
  const [orderTime, setOrderTime] = useState(null)
  const [spendingLimit, setSpendingLimit] = useState(null)
  // const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const { revenueCenter, serviceType, requestedAt } = useSelector(selectOrder)
  const { loading } = useSelector(selectGroupOrder)
  const isLoading = loading === 'pending'

  useEffect(() => {
    const groupOrderTime = makeGroupOrderTime(
      revenueCenter,
      serviceType,
      requestedAt
    )
    setOrderTime(groupOrderTime)
  }, [revenueCenter, serviceType, requestedAt])

  const adjust = (evt, type) => {
    evt.preventDefault()
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(openModal({ type: 'requestedAt' }))
    }, 300)
    evt.target.blur()
  }

  const start = (evt) => {
    evt.preventDefault()
    // const { firstIso } = orderTime
    // dispatch(updateGroupOrder({ firstIso }))
    const limit = isNaN(spendingLimit)
      ? null
      : parseFloat(spendingLimit).toFixed(2)
    dispatch(startGroupOrder(limit))
    evt.target.blur()
  }

  const cancel = (evt) => {
    evt.preventDefault()
    dispatch(closeModal())
    evt.target.blur()
  }

  const handleSpendingLimit = (evt) => {
    const { value } = evt.target
    setSpendingLimit(value ? Math.abs(value) : null)
  }

  return (
    <div className="modal__content">
      <div className="modal__header">
        <p className="modal__title ot-heading ot-font-size-h3">
          Start a group order
        </p>
        <p className="modal__subtitle">
          Please confirm your order date & time before you share your cart
        </p>
      </div>
      <div className="modal__body -message">
        <div className="modal__body__section ot-line-height">
          {orderTime && (
            <>
              <p className="ot-color-headings ot-bold">
                {orderTime.isAdjusted
                  ? 'The first available order time is'
                  : 'Your currently selected order time is'}{' '}
                {formatOrderTime(orderTime.dateStr)}, which means that{' '}
                <span className="ot-color-alert">
                  all orders must be submitted by{' '}
                  {formatOrderTime(orderTime.cutoffDateStr)}
                </span>
                .
              </p>
              <p>
                <Button
                  text="Click here to choose a different time"
                  classes="ot-btn-link"
                  onClick={adjust}
                />{' '}
                or set a spending limit below.
              </p>
              <form className="form" noValidate>
                <div className="form__inputs">
                  <Input
                    label="Spending Limit (optional)"
                    name="spending_limit"
                    type="number"
                    value={spendingLimit || ''}
                    onChange={handleSpendingLimit}
                    error={null}
                  />
                </div>
              </form>
            </>
          )}
          <div className="ot-font-size-small">
            <GroupOrderSteps />
          </div>
        </div>
      </div>
      <div className="modal__footer">
        <div className="modal__footer__buttons">
          <Button
            text={isLoading ? 'Starting Group Order...' : 'Start a Group Order'}
            classes="ot-btn ot-btn--highlight"
            icon={iconMap['Users']}
            onClick={start}
            disabled={isLoading}
          />
          <Button text="Nevermind" classes="ot-btn" onClick={cancel} />
        </div>
      </div>
    </div>
  )
}

GroupOrderStart.displayName = 'GroupOrderStart'

export default GroupOrderStart
