import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAllergens,
  fetchAllergens,
  selectCustomerAllergens,
  updateCustomerAllergens,
} from 'open-tender-redux'
import { slugify } from 'open-tender-js'
import { Switch } from 'open-tender'

import { selectConfigAccountSections } from '../slices'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'

const AccountAllergens = () => {
  const [data, setData] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const submitButton = useRef()
  const dispatch = useDispatch()
  const {
    allergens: { title, subtitle },
  } = useSelector(selectConfigAccountSections)
  const allergens = useSelector(selectAllergens)
  const customerAllergens = useSelector(selectCustomerAllergens)

  useEffect(() => {
    dispatch(fetchAllergens())
  }, [dispatch])

  useEffect(() => {
    if (customerAllergens.loading === 'idle') setSubmitting(false)
  }, [customerAllergens.loading])

  useEffect(() => {
    setData(customerAllergens.entities)
  }, [customerAllergens.entities, allergens.entities])

  const handleChange = (evt) => {
    const { id, checked } = evt.target
    const newData = checked
      ? [...data, { allergen_id: parseInt(id) }]
      : data.filter((i) => i.allergen_id !== parseInt(id))
    setData(newData)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    const newData = data.map((i) => ({ allergen_id: i.allergen_id }))
    dispatch(updateCustomerAllergens(newData))
    submitButton.current.blur()
  }

  const isLoading =
    allergens.loading === 'pending' || customerAllergens.loading === 'pending'
  const error = customerAllergens.error || allergens.error
  const showAllergens = submitting || (!isLoading && !error)
  const customerAllergenIds = data.map((i) => i.allergen_id)

  return (
    <div id={slugify(title)} className="section container">
      <div className="section__container">
        <SectionHeader title={title} subtitle={subtitle} />
        <SectionLoading loading={isLoading && !submitting} />
        <SectionError error={error} />
        {showAllergens && (
          <div className="section__content -narrow bg-color border-radius">
            <form
              id="allergen-form"
              className="form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="section__intro">
                <p className="font-size-small">I'm allergic to...</p>
              </div>
              <div className="section__rows section__rows--allergens">
                {allergens.entities.map((allergen) => (
                  <Switch
                    key={allergen.allergen_id}
                    label={allergen.name}
                    id={`${allergen.allergen_id}`}
                    on={customerAllergenIds.includes(allergen.allergen_id)}
                    onChange={handleChange}
                  />
                ))}
              </div>
              <div className="section__submit">
                <input
                  className="btn"
                  type="submit"
                  value="Update Allergens"
                  disabled={submitting}
                  ref={submitButton}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

AccountAllergens.displayName = 'AccountAllergens'
export default AccountAllergens
