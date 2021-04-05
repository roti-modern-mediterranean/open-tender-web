import { CreditCardForm } from '../../forms'
import { selectCheckout, updateForm } from '@open-tender/redux'
import { useDispatch, useSelector } from 'react-redux'

const CheckoutCreditCard = () => {
  const dispatch = useDispatch()
  const { form } = useSelector(selectCheckout)
  const newCard = form.tenders.find((i) => i.tender_type === 'CREDIT' && i.acct)

  const apply = (creditCard) => {
    const tender = { ...creditCard, tender_type: 'CREDIT' }
    dispatch(updateForm({ tenders: [tender] }))
  }

  const remove = () => {
    dispatch(updateForm({ tenders: [] }))
  }

  return <CreditCardForm apply={apply} remove={remove} init={newCard} />
}

export default CheckoutCreditCard
