import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCustomerAllergens,
  selectAllergens,
  setSelectedAllergens,
} from 'open-tender-redux'
import { Switch } from 'open-tender'

import { closeModal } from '../../slices'
import ModalClose from '../ModalClose'

const AllergensModal = () => {
  const submitButton = useRef()
  const dispatch = useDispatch()
  const [allergens, setAllergens] = useState(null)
  // const [submitting, setSubmitting] = useState(false)
  const { entities: customerAllergens } = useSelector(selectCustomerAllergens)
  const { entities: brandAllergens, selectedAllergens } = useSelector(
    selectAllergens
  )

  useEffect(() => {
    if (!allergens) {
      if (selectedAllergens) {
        setAllergens(selectedAllergens)
      } else if (customerAllergens.length) {
        setAllergens(customerAllergens)
      }
    }
  }, [allergens, customerAllergens, selectedAllergens])

  const handleChange = (evt) => {
    const { id, checked } = evt.target
    const newAllergens = checked
      ? [...(allergens || []), { allergen_id: parseInt(id) }]
      : allergens.filter((i) => i.allergen_id !== parseInt(id))
    setAllergens(newAllergens)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    submitButton.current.blur()
    // setSubmitting(true)
    dispatch(setSelectedAllergens(allergens))
    dispatch(closeModal())
  }

  const allergenIds = allergens ? allergens.map((i) => i.allergen_id) : []

  return (
    <>
      <ModalClose />
      <div className="modal__content">
        <div className="modal__header">
          <p className="modal__title ot-heading ot-font-size-h3">
            Allergen Alerts
          </p>
          <p className="modal__subtitle">
            Selected allergens will be highlighted on the menu
          </p>
        </div>
        <div className="modal__body">
          <form
            id="allergen-form"
            className="form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="form__inputs">
              {brandAllergens.map((allergen) => (
                <Switch
                  key={allergen.allergen_id}
                  label={allergen.name}
                  id={`${allergen.allergen_id}`}
                  on={allergenIds.includes(allergen.allergen_id)}
                  onChange={handleChange}
                />
              ))}
            </div>
            <div className="form__submit">
              <input
                className="ot-btn"
                type="submit"
                value="Update Selected Allergens"
                // disabled={submitting}
                ref={submitButton}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

AllergensModal.displayName = 'AllergensModal'

export default AllergensModal
