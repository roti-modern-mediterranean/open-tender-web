import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAllergens,
  setSelectedAllergens,
  updateCustomerAllergens,
} from '@open-tender/redux'

import { closeModal } from '../../slices'
import { AllergenForm, ModalContent, ModalView } from '..'

const Allergens = () => {
  const dispatch = useDispatch()
  const brandAllergens = useSelector(selectAllergens)
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
        <AllergenForm
          allergens={brandAllergens.entities}
          selectedAllergens={brandAllergens.selectedAllergens}
          isLoading={false}
          error={null}
          setAllergens={setAllergens}
          updateAllergens={updateAllergens}
          callback={callback}
        />
      </ModalContent>
    </ModalView>
  )
}

Allergens.displayName = 'Allergens'

export default Allergens
