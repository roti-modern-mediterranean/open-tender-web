import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { slugify } from '../packages/utils/helpers'
import { Switch } from '../packages'
import { selectAccountConfigSections } from '../slices/configSlice'
import { selectAllergens, fetchAllergens } from '../slices/menuSlice'
import {
  selectToken,
  fetchCustomerAllergens,
  selectCustomerAllergens,
  updateCustomerAllergens,
} from '../slices/customerSlice'

import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionRow from './SectionRow'

const AccountAllergens = () => {
  const [data, setData] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const submitButton = useRef()
  const dispatch = useDispatch()
  const {
    allergens: { title, subtitle },
  } = useSelector(selectAccountConfigSections)
  const token = useSelector(selectToken)
  const allergens = useSelector(selectAllergens)
  const customerAllergens = useSelector(selectCustomerAllergens)
  // console.log(allergens)
  // console.log(customerAllergens)

  useEffect(() => {
    dispatch(fetchAllergens())
    dispatch(fetchCustomerAllergens(token))
  }, [dispatch, token])

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
    dispatch(updateCustomerAllergens({ token, data }))
    submitButton.current.blur()
  }

  const isLoading =
    allergens.loading === 'pending' || customerAllergens.loading === 'pending'
  const error = customerAllergens.error || allergens.error
  const showAllergens = submitting || (!isLoading && !error)
  const customerAllergenIds = data.map((i) => i.allergen_id)

  return (
    <div id={slugify(title)} className="section container ot-section">
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
                  <SectionRow key={allergen.allergen_id} title={allergen.name}>
                    <Switch
                      label={allergen.name}
                      id={`${allergen.allergen_id}`}
                      on={customerAllergenIds.includes(allergen.allergen_id)}
                      onChange={handleChange}
                    />
                  </SectionRow>
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
