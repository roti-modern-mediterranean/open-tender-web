import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../../slices/modalSlice'
import { selectMenu, fetchMenu } from '../../slices/menuSlice'
import { selectConfig } from '../../slices/configSlice'
import { selectRevenueCenters } from '../../slices/revenueCentersSlice'
import ModalClose from '../ModalClose'
import { CartErrors } from 'open-tender'
import { setCart, setRevenueCenter } from '../../slices/orderSlice'

const CartErrorsModal = () => {
  const dispatch = useDispatch()
  const { cartErrors, previousMenuVars, menuVars } = useSelector(selectMenu)
  const { newCart, errors } = cartErrors
  const { menu: menuConfig } = useSelector(selectConfig)
  const { validate: config } = menuConfig
  const { revenueCenters } = useSelector(selectRevenueCenters)

  const handleRevert = (evt, revenueCenter, menuVars) => {
    evt.preventDefault()
    dispatch(setRevenueCenter(revenueCenter))
    dispatch(fetchMenu(menuVars))
    dispatch(closeModal())
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
          <p className="modal__title heading ot-font-size-h3">{config.title}</p>
          <p className="modal__subtitle">{config.subtitle}</p>
        </div>
        <div className="modal__body">
          <CartErrors
            newCart={newCart}
            errors={errors}
            config={config}
            revert={handleRevert}
            proceed={handleProceed}
            revenueCenters={revenueCenters}
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
