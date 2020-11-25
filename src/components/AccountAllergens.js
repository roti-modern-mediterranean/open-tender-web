import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { slugify } from '@open-tender/js'
import {
  fetchAllergens,
  selectAllergens,
  selectCustomerAllergens,
  setSelectedAllergens,
  updateCustomerAllergens,
} from '@open-tender/redux'
import { AllergenForm } from '@open-tender/components'

import { selectAccountConfig } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'

const AccountAllergens = () => {
  const dispatch = useDispatch()
  const {
    allergens: { title, subtitle },
  } = useSelector(selectAccountConfig)
  const brandAllergens = useSelector(selectAllergens)
  const customerAllergens = useSelector(selectCustomerAllergens)
  const isLoading =
    brandAllergens.loading === 'pending' ||
    customerAllergens.loading === 'pending'
  const error = brandAllergens.error || customerAllergens.error
  const showAllergens = brandAllergens.entities.length > 0
  const setAllergens = useCallback(
    (data) => dispatch(setSelectedAllergens(data)),
    [dispatch]
  )
  const updateAllergens = useCallback(
    (data) => dispatch(updateCustomerAllergens(data)),
    [dispatch]
  )

  useEffect(() => {
    dispatch(fetchAllergens())
  }, [dispatch])

  return (
    <div id={slugify(title)} className="section">
      <div className="container">
        <div className="section__container">
          <SectionHeader title={title} subtitle={subtitle} />
          <SectionLoading loading={isLoading} />
          <SectionError error={error} />
          {showAllergens && (
            <div className="section__content -max ot-bg-color-primary ot-border ot-border-radius">
              <div className="section__intro">
                <p className="ot-font-size-small">I'm allergic to...</p>
              </div>
              <AllergenForm
                allergens={brandAllergens.entities}
                selectedAllergens={customerAllergens.entities}
                isLoading={isLoading}
                error={error}
                setAllergens={setAllergens}
                updateAllergens={updateAllergens}
              />
            </div>
          )}
          {!showAllergens && !isLoading && (
            <p>Allergens aren't currently listed on our menu.</p>
          )}
        </div>
      </div>
    </div>
  )
}

AccountAllergens.displayName = 'AccountAllergens'
export default AccountAllergens
