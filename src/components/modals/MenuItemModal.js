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
import { Builder, BuilderOption, BuilderHeader } from '../../packages'

const MenuItemModal = () => {
  const dispatch = useDispatch()
  const item = useSelector(selectCurrentItem)

  const handleClose = () => {
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(setCurrentItem(null))
    }, 250)
  }

  const handleAddItem = (item) => {
    dispatch(addItemToCart(item))
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
