import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchCustomerCreditCards,
  selectCustomerCreditCards,
} from '@open-tender/redux'
import { slugify } from '@open-tender/js'
import { Button } from '@open-tender/components'

import { selectAccountConfig, openModal } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import CreditCards from './CreditCards'
import SectionEmpty from './SectionEmpty'

const AccountCreditCards = () => {
  const dispatch = useDispatch()
  const {
    creditCards: { title, subtitle, empty },
  } = useSelector(selectAccountConfig)
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
    <div id={slugify(title)} className="section">
      <div className="container">
        <div className="section__container">
          <SectionHeader title={title} subtitle={subtitle}>
            <p style={{ margin: '2.5rem 0 0' }}>
              <Button
                text="Add a new card to your account"
                onClick={handleAddNew}
                classes="ot-btn"
              />
            </p>
          </SectionHeader>
          <SectionLoading loading={isLoading} />
          <SectionError error={error} />
          {showCreditCards && (
            <div className="section__content -max ot-bg-color-primary ot-border ot-border-radius">
              <CreditCards
                creditCards={creditCards.entities}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

AccountCreditCards.displayName = 'AccountCreditCards'
export default AccountCreditCards
