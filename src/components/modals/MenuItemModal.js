import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Plus, Minus } from 'react-feather'
import {
  selectCurrentItem,
  setCurrentItem,
  addItemToCart,
  selectSoldOut,
  selectSelectedAllergenNames,
  showNotification,
  selectGroupOrder,
} from '@open-tender/redux'
import { Builder, BuilderOption, BuilderHeader } from '@open-tender/components'

import { closeModal, selectDisplaySettings } from '../../slices'
import ModalClose from '../ModalClose'

const iconMap = {
  plus: <Plus size={null} />,
  minus: <Minus size={null} />,
}

const MenuItemModal = () => {
  const dispatch = useDispatch()
  const item = useSelector(selectCurrentItem)
  const soldOut = useSelector(selectSoldOut)
  const allergens = useSelector(selectSelectedAllergenNames)
  const displaySettings = useSelector(selectDisplaySettings)
  const { cartId } = useSelector(selectGroupOrder)

  const handleClose = () => {
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(setCurrentItem(null))
    }, 275)
  }

  const handleAddItem = (item) => {
    dispatch(addItemToCart(item))
    dispatch(showNotification(`${item.name} added to cart`))
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(setCurrentItem(null))
    }, 275)
  }

  return (
    <>
      <ModalClose classes="ot-btn-link" onClick={handleClose} />
      <div className="modal__content">
        {item && (
          <Builder
            menuItem={item}
            soldOut={soldOut}
            allergens={allergens}
            addItemToCart={handleAddItem}
            renderHeader={(props) => <BuilderHeader {...props} />}
            renderOption={(props) => <BuilderOption {...props} />}
            showImage={true}
            displaySettings={displaySettings}
            iconMap={iconMap}
            closeModal={handleClose}
            cartId={cartId}
          />
        )}
      </div>
    </>
  )
}

MenuItemModal.displayName = 'MenuItemModal'
MenuItemModal.propTypes = {
  close: propTypes.func,
}

export default MenuItemModal
