import { CreditCardForm } from '../../forms'
import { checkAmountRemaining } from '@open-tender/js'
import { selectCheckout, updateForm } from '@open-tender/redux'
import { useDispatch, useSelector } from 'react-redux'

const CheckoutCreditCard = () => {
  const dispatch = useDispatch()
  const { check, form } = useSelector(selectCheckout)
  const total = check && check.totals ? check.totals.total : 0.0
  const amount = checkAmountRemaining(total, form.tenders).toFixed(2)
  const newCard = form.tenders.find((i) => i.tender_type === 'CREDIT' && i.acct)

  const apply = (creditCard) => {
    const tender = { tender_type: 'CREDIT', amount, ...creditCard }
    dispatch(updateForm({ tenders: [tender] }))
  }

  const remove = () => {
    dispatch(updateForm({ tenders: [] }))
  }

  return <CreditCardForm apply={apply} remove={remove} init={newCard} />
}

export default CheckoutCreditCard
