import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrentItem,
  setCurrentItem,
  addItemToCart,
} from '../../slices/orderSlice'
import { closeModal } from '../../slices/modalSlice'
import { selectSoldOut, selectedAllergenNames } from '../../slices/menuSlice'
import { Builder, BuilderOption, BuilderHeader } from '../../packages'
import ModalClose from '../ModalClose'
import { showNotification } from '../../slices/notificationSlice'

const MenuItemModal = () => {
  const dispatch = useDispatch()
  const item = useSelector(selectCurrentItem)
  const soldOut = useSelector(selectSoldOut)
  const allergens = useSelector(selectedAllergenNames)

  const handleClose = () => {
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(setCurrentItem(null))
    }, 250)
  }

  const handleAddItem = (item) => {
    dispatch(addItemToCart(item))
    dispatch(showNotification(`${item.name} added to cart`))
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(setCurrentItem(null))
    }, 250)
  }

  return (
    <>
      <ModalClose classes="" onClick={handleClose} />
      <div className="modal__content">
        <Builder
          menuItem={item}
          soldOut={soldOut}
          allergens={allergens}
          addItemToCart={handleAddItem}
          renderHeader={(props) => <BuilderHeader {...props} />}
          renderOption={(props) => <BuilderOption {...props} />}
          showImage={true}
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
