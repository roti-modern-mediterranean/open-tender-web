import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAllergens,
  setSelectedAllergens,
  updateCustomerAllergens,
} from '@open-tender/redux'
import { AllergenForm } from '@open-tender/components'

import { closeModal } from '../../slices'
import ModalClose from '../ModalClose'
import ModalTitle from '../ModalTitle'

const AllergensModal = () => {
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
    <>
      <ModalClose />
      <div className="modal__content">
        <div className="modal__header">
          <ModalTitle title="Allergen Alerts" />
          <p className="modal__subtitle">
            Selected allergens will be highlighted on the menu
          </p>
        </div>
        <div className="modal__body">
          <AllergenForm
            allergens={brandAllergens.entities}
            selectedAllergens={brandAllergens.selectedAllergens}
            isLoading={false}
            error={null}
            setAllergens={setAllergens}
            updateAllergens={updateAllergens}
            callback={callback}
          />
        </div>
      </div>
    </>
  )
}

AllergensModal.displayName = 'AllergensModal'

export default AllergensModal
