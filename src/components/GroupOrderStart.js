import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectOrder,
  selectGroupOrder,
  addCustomerGroupOrder,
} from '@open-tender/redux'
import { makeGroupOrderTime } from '@open-tender/js'
import { Button, Input } from '@open-tender/components'

import { openModal, closeModal } from '../slices'
import GroupOrderSteps from './GroupOrderSteps'
import ModalTitle from './ModalTitle'
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
    const limit = isNaN(spendingLimit)
      ? null
      : parseFloat(spendingLimit).toFixed(2)
    const data = { spendingLimit: limit }
    dispatch(addCustomerGroupOrder(data))
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
        <ModalTitle title="Start a group order" />
        <p className="modal__subtitle">
          Please confirm your order date & time before you share your cart
        </p>
      </div>
      <div className="modal__body -message">
        <div className="modal__body__section ot-line-height">
          {orderTime && (
            <>
              {orderTime.prepTime ? (
                <>
                  <p className="ot-color-headings ot-bold">
                    The current wait time for group orders is{' '}
                    {orderTime.prepTime} minutes from the time the order is
                    submitted.{' '}
                    <Button
                      text="Choose a specific order time."
                      classes="ot-btn-link"
                      onClick={adjust}
                    />
                  </p>
                </>
              ) : (
                <>
                  <p className="ot-color-headings ot-bold">
                    {orderTime.isAdjusted
                      ? 'The first available group order time is'
                      : 'Your currently selected group order time is'}{' '}
                    {formatOrderTime(orderTime.dateStr)}, which means that{' '}
                    <span className="ot-color-alert">
                      all orders must be submitted by{' '}
                      {formatOrderTime(orderTime.cutoffDateStr)}
                    </span>
                    .{' '}
                    <Button
                      text="Choose a different time."
                      classes="ot-btn-link"
                      onClick={adjust}
                    />
                  </p>
                </>
              )}
            </>
          )}

          <form className="form" noValidate>
            <div className="form__inputs">
              <Input
                label="Set a guest spending Limit (optional)"
                name="spending_limit"
                type="number"
                value={spendingLimit || ''}
                onChange={handleSpendingLimit}
                error={null}
              />
            </div>
          </form>
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
