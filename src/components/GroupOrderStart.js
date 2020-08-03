import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder, shareCart } from '@open-tender/redux'
import { makeGroupOrderTime } from '@open-tender/js'
import { Button } from '@open-tender/components'

import { openModal, closeModal } from '../slices'
import GroupOrderSteps from './GroupOrderSteps'
import iconMap from './iconMap'

const formatOrderTime = (s) =>
  s.replace('Today', 'today').replace('Tomorrow', 'tomorrow')

const GroupOrderStart = () => {
  const [orderTime, setOrderTime] = useState(null)
  const dispatch = useDispatch()
  const { revenueCenter, serviceType, requestedAt } = useSelector(selectOrder)

  useEffect(() => {
    const suggestedTime = makeGroupOrderTime(
      revenueCenter,
      serviceType,
      requestedAt
    )
    setOrderTime(suggestedTime)
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
    dispatch(shareCart())
    evt.target.blur()
  }

  const cancel = (evt) => {
    evt.preventDefault()
    dispatch(closeModal())
    evt.target.blur()
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
        {orderTime && (
          <div className="modal__body__section ot-line-height">
            <p className="ot-color-headings ot-bold">
              {orderTime.isAdjusted
                ? 'The first available group order time is'
                : 'Your currently selected group order time is'}{' '}
              {formatOrderTime(orderTime.dateStr)}, which will result in a{' '}
              <span className="ot-color-alert">
                cutoff time of {formatOrderTime(orderTime.cutoffDateStr)}
              </span>{' '}
              (this is the time by which all orders must be submitted).{' '}
              {orderTime.isAdjusted && (
                <span className="ot-color-alert">
                  We'd strongly suggest you choose a later time so your friends
                  have more time to place their orders.
                </span>
              )}
            </p>
            <p>
              <Button
                text="Click here if you want to choose a different time"
                classes="ot-btn-link"
                onClick={adjust}
              />{' '}
              or move on to the steps below.
            </p>
          </div>
        )}
        <div className="modal__body__section ot-font-size-small ot-line-height">
          <GroupOrderSteps />
        </div>
      </div>
      <div className="modal__footer">
        <div className="modal__footer__buttons">
          <Button
            text="Start a Group Order"
            classes="ot-btn ot-btn--highlight"
            icon={iconMap['Users']}
            onClick={start}
          />
          <Button text="Nevermind" classes="ot-btn" onClick={cancel} />
        </div>
      </div>
    </div>
  )
}

GroupOrderStart.displayName = 'GroupOrderStart'

export default GroupOrderStart
