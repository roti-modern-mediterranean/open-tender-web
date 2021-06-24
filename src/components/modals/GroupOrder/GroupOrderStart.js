import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectOrder,
  selectGroupOrder,
  addCustomerGroupOrder,
} from '@open-tender/redux'
import styled from '@emotion/styled'
import { makeGroupOrderTime } from '@open-tender/js'
import { ButtonStyled } from '@open-tender/components'

import { openModal, closeModal } from '../../../slices'
import { ModalContent } from '../../Modal'
import { Input } from '../../inputs'
import { Cash } from '../../icons'
import ButtonGroupBig from '../../ButtonGroupBig'
import InlineLink from '../../InlineLink'
import GroupOrderSteps from './GroupOrderSteps'

const formatOrderTime = (s) =>
  s.replace('Today', 'today').replace('Tomorrow', 'tomorrow')

const SpendingLimitForm = styled('form')``

const GroupOrderStartIntro = styled('p')`
  margin: 1rem 0 2rem;
  line-height: 1.5;

  span {
    color: ${(props) => props.theme.colors.paprika};
  }
`

const GroupOrderStart = () => {
  const [orderTime, setOrderTime] = useState(null)
  const [spendingLimit, setSpendingLimit] = useState(null)
  // const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const { revenueCenter, serviceType, requestedAt } = useSelector(selectOrder)
  const { loading } = useSelector(selectGroupOrder)
  const isLoading = loading === 'pending'
  console.log(orderTime)

  useEffect(() => {
    const groupOrderTime = makeGroupOrderTime(
      revenueCenter,
      serviceType,
      requestedAt
    )
    setOrderTime(groupOrderTime)
  }, [revenueCenter, serviceType, requestedAt])

  const adjust = (type) => {
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(openModal({ type: 'requestedAt' }))
    }, 300)
  }

  const start = () => {
    const limit = isNaN(spendingLimit)
      ? null
      : parseFloat(spendingLimit).toFixed(2)
    const data = { spendingLimit: limit }
    dispatch(addCustomerGroupOrder(data))
  }

  const cancel = () => {
    dispatch(closeModal())
  }

  const handleSpendingLimit = (evt) => {
    const { value } = evt.target
    setSpendingLimit(value ? Math.abs(value) : null)
  }

  return (
    <ModalContent
      title="Start a group order"
      subtitle={
        <p>Please confirm your order date & time before you share your cart</p>
      }
      footer={
        <ButtonGroupBig>
          <ButtonStyled onClick={start} size="big" disabled={isLoading}>
            {isLoading ? 'Starting Group Order...' : 'Start a Group Order'}
          </ButtonStyled>
          <ButtonStyled onClick={cancel} size="big" color="secondary">
            Nevermind
          </ButtonStyled>
        </ButtonGroupBig>
      }
    >
      {orderTime && (
        <>
          {orderTime.prepTime ? (
            <GroupOrderStartIntro>
              The current wait time for group orders is {orderTime.prepTime}{' '}
              minutes from the time the order is submitted.{' '}
              <InlineLink onClick={adjust}>
                Choose a specific order time.
              </InlineLink>
            </GroupOrderStartIntro>
          ) : (
            <GroupOrderStartIntro>
              {orderTime.isAdjusted
                ? 'The first available group order time is'
                : 'Your currently selected group order time is'}{' '}
              {formatOrderTime(orderTime.dateStr)}, which means that all orders
              must be submitted by {formatOrderTime(orderTime.cutoffDateStr)}.{' '}
              <InlineLink onClick={adjust}>Choose a different time.</InlineLink>
            </GroupOrderStartIntro>
          )}
        </>
      )}
      <SpendingLimitForm noValidate>
        <Input
          icon={<Cash />}
          label="set a spending limit (optional)"
          name="spending_limit"
          type="number"
          value={spendingLimit || ''}
          onChange={handleSpendingLimit}
          error={null}
        />
      </SpendingLimitForm>
      <GroupOrderSteps />
    </ModalContent>
  )
}

GroupOrderStart.displayName = 'GroupOrderStart'

export default GroupOrderStart
