import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectMenu, setCart, revertMenu } from '@open-tender/redux'
import { CartErrors } from '@open-tender/components'

import { closeModal, selectConfig } from '../../slices'
import ModalClose from '../ModalClose'
import ModalTitle from '../ModalTitle'
import iconMap from '../iconMap'

const CartErrorsModal = () => {
  const dispatch = useDispatch()
  const { cartErrors, previousMenuVars, menuVars } = useSelector(selectMenu)
  const { newCart, errors } = cartErrors || {}
  const { menu } = useSelector(selectConfig)

  const handleRevert = (evt, menuVars) => {
    evt.preventDefault()
    dispatch(closeModal())
    dispatch(revertMenu(menuVars))
    evt.target.blur()
  }

  const handleProceed = (evt) => {
    evt.preventDefault()
    dispatch(setCart(newCart))
    dispatch(closeModal())
    evt.target.blur()
  }

  return (
    <>
      <ModalClose classes="" onClick={handleProceed} />
      <div className="modal__content">
        <div className="modal__header">
          <ModalTitle title={menu.cartErrors.title} />
          <p className="modal__subtitle">{menu.cartErrors.subtitle}</p>
        </div>
        <div className="modal__body">
          <CartErrors
            newCart={newCart}
            errors={errors}
            revert={handleRevert}
            revertIcon={iconMap['ChevronLeft']}
            proceed={handleProceed}
            proceedIcon={iconMap['Trash2']}
            previousMenuVars={previousMenuVars}
            menuVars={menuVars}
          />
        </div>
      </div>
    </>
  )
}

CartErrorsModal.displayName = 'CartErrorsModal'

export default CartErrorsModal
