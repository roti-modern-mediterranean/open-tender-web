import React, { useCallback } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAllergens,
  setSelectedAllergens,
  updateCustomerAllergens,
} from '@open-tender/redux'
import {
  useAllergenForm,
  FormError,
  FormInputs,
  Switch,
  FormSubmit,
  ButtonSubmit,
} from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'
import styled from '@emotion/styled'

const AllergenFormView = styled('div')`
  label {
    padding: 1.25rem 0;

    & > span > span:last-of-type {
      text-align: right;
      line-height: 1;
    }
  }
`

const AllergenForm = ({
  allergens,
  selectedAllergens,
  isLoading,
  error,
  setAllergens,
  updateAllergens,
  callback,
}) => {
  const {
    submitRef,
    submitting,
    allergenIds,
    formError,
    handleChange,
    handleSubmit,
  } = useAllergenForm(
    allergens,
    selectedAllergens,
    isLoading,
    error,
    setAllergens,
    updateAllergens,
    callback
  )

  return allergens ? (
    allergens.length > 0 ? (
      <form id="allergen-form" onSubmit={handleSubmit} noValidate>
        <FormError errMsg={formError} style={{ margin: '0 0 2rem' }} />
        <FormInputs>
          {allergens.map((allergen) => (
            <Switch
              key={allergen.allergen_id}
              label={allergen.name}
              id={`${allergen.allergen_id}`}
              on={allergenIds.includes(allergen.allergen_id)}
              onChange={handleChange}
            />
          ))}
        </FormInputs>
        <FormSubmit>
          <ButtonSubmit submitRef={submitRef} submitting={submitting}>
            {submitting ? 'Submitting...' : 'Submit Updates'}
          </ButtonSubmit>
        </FormSubmit>
      </form>
    ) : (
      <p>This brand {"doesn't"} currently have any allergens configured</p>
    )
  ) : null
}

AllergenForm.displayName = 'AllergenForm'
AllergenForm.propTypes = {
  allergens: propTypes.array,
  selectedAllergens: propTypes.array,
  isLoading: propTypes.bool,
  error: propTypes.object,
  setAllergens: propTypes.func,
  updateAllergens: propTypes.func,
  callback: propTypes.func,
}

const Allergens = () => {
  const dispatch = useDispatch()
  const brandAllergens = useSelector(selectAllergens)
  console.log(brandAllergens.entities)
  const setAllergens = useCallback(
    (data) => dispatch(setSelectedAllergens(data)),
    [dispatch]
  )
  const updateAllergens = useCallback(
    (data) => dispatch(updateCustomerAllergens(data)),
    [dispatch]
  )
  const callback = useCallback(() => dispatch(closeModal()), [dispatch])

  return (
    <ModalView>
      <ModalContent
        title="Anything you'd like to avoid?"
        // subtitle={<p>Selected allergens will be highlighted on the menu</p>}
      >
        <AllergenFormView>
          <AllergenForm
            allergens={brandAllergens.entities}
            selectedAllergens={brandAllergens.selectedAllergens}
            isLoading={false}
            error={null}
            setAllergens={setAllergens}
            updateAllergens={updateAllergens}
            callback={callback}
          />
        </AllergenFormView>
      </ModalContent>
    </ModalView>
  )
}

Allergens.displayName = 'Allergens'

export default Allergens
