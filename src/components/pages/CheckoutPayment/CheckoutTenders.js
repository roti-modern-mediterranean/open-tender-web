import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { selectCheckout, updateForm } from '@open-tender/redux'
import { checkAmountRemaining } from '@open-tender/js'
import { Preface } from '@open-tender/components'

import { CreditCard, Roti } from '../../icons'
import CheckoutCreditCard from './CheckoutCreditCard'
import CheckoutLevelUp from './CheckoutLevelUp'
import { useDispatch, useSelector } from 'react-redux'
import { PaymentTypes } from '../..'

const allTenderTypes = [
  {
    icon: <CreditCard size="3.4rem" color="#FBF8EA" />,
    text: 'Credit Card',
    tenderType: 'CREDIT',
  },
  { icon: <Roti />, text: 'Roti', tenderType: 'LEVELUP' },
]

const CheckoutTendersView = styled('div')`
  margin: 0 0 4rem;
`

const CheckoutTendersHeader = styled('div')`
  margin: 0 0 2rem;
  text-align: center;

  h2 {
    font-family: ${(props) => props.theme.fonts.preface.family};
    font-size: 2.8rem;
    font-weight: 500;
    letter-spacing: 0.01em;
  }
`

const CheckoutTenders = () => {
  const dispatch = useDispatch()
  const [tenderType, setTenderType] = useState('CREDIT')
  const [hasTender, setHasTender] = useState(false)
  const { check, form } = useSelector(selectCheckout)
  const { tender_types } = check.config
  const tenderTypes = allTenderTypes.filter((i) =>
    tender_types.includes(i.tenderType)
  )
  const total = check.totals ? check.totals.total : 0.0
  const cards = check.customer ? check.customer.credit_cards : []
  const hasCards = cards && cards.length > 0
  const noTender = form.tenders.length === 0
  const customer_card_id =
    hasCards && noTender ? cards[0].customer_card_id : null
  const amount = checkAmountRemaining(total, form.tenders).toFixed(2)
  const isZero = parseFloat(amount) <= 0.0
  const nonGift = form.tenders.filter((i) => i.tender_type !== 'GIFT_CARD')
  const hideTenders = isZero && !nonGift.length

  useEffect(() => {
    setHasTender(true)
    if (customer_card_id && !hasTender) {
      const tender = { tender_type: 'CREDIT', amount, customer_card_id }
      dispatch(updateForm({ tenders: [tender] }))
      setHasTender(true)
    }
  }, [hasTender, customer_card_id, amount, dispatch])

  if (hideTenders) return null

  return (
    <CheckoutTendersView>
      <CheckoutTendersHeader>
        <Preface as="h2">Select Payment</Preface>
      </CheckoutTendersHeader>
      <PaymentTypes
        tenderTypes={tenderTypes}
        tenderType={tenderType}
        setTenderType={setTenderType}
      />
      {tenderType === 'CREDIT' ? (
        <CheckoutCreditCard />
      ) : tenderType === 'LEVELUP' ? (
        <CheckoutLevelUp />
      ) : null}
    </CheckoutTendersView>
  )
}

CheckoutTenders.displayName = 'CheckoutTenders'

export default CheckoutTenders
