import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { slugify } from 'open-tender-js'
import { selectAccountConfigSections } from '../slices/configSlice'
import {
  selectToken,
  fetchCustomerCreditCards,
  selectCustomerCreditCards,
} from '../slices/customerSlice'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import { Button } from 'open-tender'
import CreditCards from './CreditCards'
import { openModal } from '../slices/modalSlice'
import SectionEmpty from './SectionEmpty'

const AccountCreditCards = () => {
  const dispatch = useDispatch()
  const {
    creditCards: { title, subtitle, empty },
  } = useSelector(selectAccountConfigSections)
  const token = useSelector(selectToken)
  const creditCards = useSelector(selectCustomerCreditCards) || {}

  useEffect(() => {
    dispatch(fetchCustomerCreditCards({ token }))
  }, [dispatch, token])

  const handleAddNew = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'creditCard' }))
    evt.target.blur()
  }

  const isLoading = creditCards.loading === 'pending'
  const error = creditCards.error
  const showCreditCards = creditCards.entities
    ? creditCards.entities.length
    : false

  return (
    <div id={slugify(title)} className="section container ot-section">
      <div className="section__container">
        <SectionHeader title={title} subtitle={subtitle} />
        <SectionLoading loading={isLoading} />
        <SectionError error={error} />
        {showCreditCards ? (
          <CreditCards
            creditCards={creditCards.entities}
            token={token}
            isLoading={isLoading}
          />
        ) : (
          <SectionEmpty message={empty} />
        )}
        <div className="section__footer">
          <p className="font-size-small">
            <Button
              text="Add a new card to your account"
              onClick={handleAddNew}
              classes="btn-link"
            />
          </p>
        </div>
      </div>
    </div>
  )
}

AccountCreditCards.displayName = 'AccountCreditCards'
export default AccountCreditCards
