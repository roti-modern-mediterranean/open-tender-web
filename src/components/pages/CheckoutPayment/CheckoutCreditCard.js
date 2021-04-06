import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { checkAmountRemaining } from '@open-tender/js'
import { selectCheckout, updateForm } from '@open-tender/redux'
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
  const { check, form } = useSelector(selectCheckout)
  const total = check.totals ? check.totals.total : 0.0
  const cards = check.customer ? check.customer.credit_cards : []
  const hasCards = cards.length > 0
  const amount = checkAmountRemaining(total, form.tenders).toFixed(2)
  const newCard = form.tenders.find((i) => i.acct)
  const existingCard = form.tenders.find((i) => i.customer_card_id)

  useEffect(() => {
    if (!hasCards) setShowNew(true)
  }, [hasCards])

  const apply = (creditCard) => {
    if (creditCard.customer_card_id) setShowNew(false)
    const tender = { tender_type: 'CREDIT', amount, ...creditCard }
    dispatch(updateForm({ tenders: [tender] }))
  }

  const remove = () => {
    dispatch(updateForm({ tenders: [] }))
  }

  const addNew = () => {
    dispatch(updateForm({ tenders: [] }))
    setShowNew(true)
  }

  return (
    <CheckoutCreditCardView>
      {hasCards && (
        <CheckoutCreditCards
          cards={cards}
          existingCard={existingCard}
          apply={apply}
          remove={remove}
        />
      )}
      {showNew ? (
        <CreditCardForm apply={apply} remove={remove} init={newCard} />
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
