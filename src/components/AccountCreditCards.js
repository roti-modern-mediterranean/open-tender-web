import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchCustomerCreditCards,
  selectCustomerCreditCards,
} from 'open-tender-redux'
import { slugify } from 'open-tender-js'
import { Button } from 'open-tender'

import { selectConfigAccountSections, openModal } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import CreditCards from './CreditCards'
import SectionEmpty from './SectionEmpty'

const AccountCreditCards = () => {
  const dispatch = useDispatch()
  const {
    creditCards: { title, subtitle, empty },
  } = useSelector(selectConfigAccountSections)
  const creditCards = useSelector(selectCustomerCreditCards) || {}

  useEffect(() => {
    dispatch(fetchCustomerCreditCards())
  }, [dispatch])

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
    <div id={slugify(title)} className="section container">
      <div className="section__container">
        <SectionHeader title={title} subtitle={subtitle} />
        <SectionLoading loading={isLoading} />
        <SectionError error={error} />
        {showCreditCards ? (
          <CreditCards
            creditCards={creditCards.entities}
            isLoading={isLoading}
          />
        ) : (
          <SectionEmpty message={empty} />
        )}
        <div className="section__footer">
          <p className="ot-font-size-small">
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
