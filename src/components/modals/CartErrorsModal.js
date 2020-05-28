import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../../slices/modalSlice'
import { selectMenu } from '../../slices/menuSlice'
import { selectConfig } from '../../slices/configSlice'
import ModalClose from '../ModalClose'
import { CartErrors, Button } from '../../packages'
import { setCart } from '../../slices/orderSlice'

const CartErrorsModal = () => {
  const dispatch = useDispatch()
  const { cartErrors, previousMenuVars: previous } = useSelector(selectMenu)
  const { newCart, errors } = cartErrors
  const { menu: menuConfig } = useSelector(selectConfig)
  const { validate: config } = menuConfig
  const content = previous ? config.revert : config.proceed

  const handleRevert = (evt) => {
    evt.preventDefault()
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
          <CartErrors newCart={newCart} errors={errors} />
          <p>{content.message}</p>
        </div>
        <div className="modal__footer">
          <div className="modal__footer__buttons">
            {previous && (
              // <button className="btn" onClick={handleRevert}>
              //   {content.buttonRevert}
              // </button>
              <Button
                text={content.buttonRevert}
                icon="ArrowLeft"
                onClick={handleRevert}
              />
            )}
            {/* <button className="btn" onClick={handleProceed}>
            {content.buttonProceed}
          </button> */}
            <Button
              text={content.buttonProceed}
              icon="ArrowRight"
              onClick={handleProceed}
              iconEnd={true}
            />
          </div>
        </div>
      </div>
    </>
  )
}

CartErrorsModal.displayName = 'CartErrorsModal'

export default CartErrorsModal
