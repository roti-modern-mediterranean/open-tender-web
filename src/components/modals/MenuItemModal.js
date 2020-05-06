import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrentItem,
  setCurrentItem,
  addItemToCart,
} from '../../slices/orderSlice'
import { closeModal } from '../../slices/modalSlice'
import ModalClose from '../ModalClose'
import { Builder, BuilderOption } from '../packages'

const MenuItemModal = () => {
  const dispatch = useDispatch()
  const item = useSelector(selectCurrentItem)

  const handleClose = () => {
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(setCurrentItem(null))
    }, 500)
  }

  const handleAddItem = (item) => {
    dispatch(addItemToCart(item))
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(setCurrentItem(null))
    }, 500)
  }

  return (
    <>
      <ModalClose classes="link-light" onClick={handleClose} />
      <div className="modal__content">
        <Builder
          menuItem={item}
          addItemToCart={handleAddItem}
          renderOption={(props) => <BuilderOption {...props} />}
        />
      </div>
    </>
  )
}

MenuItemModal.displayName = 'MenuItemModal'
MenuItemModal.propTypes = {
  close: propTypes.func,
}

export default MenuItemModal
