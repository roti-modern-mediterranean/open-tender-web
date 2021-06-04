import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { checkAmountRemaining } from '@open-tender/js'
import { selectCheckout, selectCustomer, updateForm } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { CreditCardForm } from '../../forms'
import CheckoutCreditCards from './CheckoutCreditCards'

const CheckoutCreditCardView = styled('div')``

const CheckoutCreditCardNew = styled('div')`
  width: 100%;
  margin: 2rem 0;
  text-align: center;
`

const CheckoutCreditCard = () => {
  const dispatch = useDispatch()
  const [showNew, setShowNew] = useState(false)
  const { auth } = useSelector(selectCustomer)
  const { check, form, errors } = useSelector(selectCheckout)
  const total = check.totals ? check.totals.total : 0.0
  const cards = check.customer ? check.customer.credit_cards : []
  const hasCards = cards && cards.length > 0
  const amount = checkAmountRemaining(total, form.tenders).toFixed(2)
  const newCard = form.tenders.find((i) => i.acct)
  const existingCard = form.tenders.find((i) => i.customer_card_id)
  const tenderErrors = errors.tenders ? errors.tenders[0] : null
  const giftTenders = useMemo(
    () => form.tenders.filter((i) => i.tender_type === 'GIFT_CARD'),
    [form.tenders]
  )
  // const defaultCardId = hasCards ? cards[0].customer_card_id : null
  // const noTender = form.tenders.length === 0

  // const apply = (creditCard) => {
  //   if (creditCard.customer_card_id) setShowNew(false)
  //   const tender = { tender_type: 'CREDIT', amount, ...creditCard }
  //   dispatch(updateForm({ tenders: [tender] }))
  // }

  const apply = useCallback(
    (creditCard) => {
      if (parseFloat(amount) > 0) {
        if (creditCard.customer_card_id) setShowNew(false)
        const tender = { tender_type: 'CREDIT', amount, ...creditCard }
        dispatch(updateForm({ tenders: [...giftTenders, tender] }))
      }
    },
    [dispatch, amount, giftTenders]
  )

  const remove = () => {
    dispatch(updateForm({ tenders: giftTenders }))
  }

  const addNew = () => {
    dispatch(updateForm({ tenders: giftTenders }))
    setShowNew(true)
  }

  useEffect(() => {
    if (!hasCards) {
      setShowNew(true)
    }
  }, [hasCards])

  // useEffect(() => {
  //   if (hasCards) {
  //     apply({ customer_card_id: defaultCardId })
  //   }
  // }, [hasCards, defaultCardId, apply])

  return (
    <CheckoutCreditCardView>
      {hasCards && (
        <CheckoutCreditCards
          cards={cards}
          apply={apply}
          remove={remove}
          existingCard={existingCard}
          tenderErrors={existingCard ? tenderErrors : null}
        />
      )}
      {showNew ? (
        <CreditCardForm
          apply={apply}
          remove={remove}
          init={newCard}
          tenderErrors={newCard ? tenderErrors : null}
          hideSave={auth ? null : false}
        />
      ) : (
        <CheckoutCreditCardNew>
          <ButtonStyled size="big" color="secondary" onClick={addNew}>
            Add New Card
          </ButtonStyled>
        </CheckoutCreditCardNew>
      )}
    </CheckoutCreditCardView>
  )
}

export default CheckoutCreditCard
