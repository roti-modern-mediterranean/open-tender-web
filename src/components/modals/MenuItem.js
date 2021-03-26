import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import {
  selectCurrentItem,
  setCurrentItem,
  addItemToCart,
  selectSoldOut,
  selectSelectedAllergenNames,
  // showNotification,
  selectGroupOrder,
} from '@open-tender/redux'
import { BuilderOption, BuilderHeader } from '@open-tender/components'

import { closeModal, selectDisplaySettings } from '../../slices'
import { Builder } from '..'

const MenuItemModalView = styled('div')`
  position: relative;
  width: 90%;
  max-width: 64rem;
  height: 90%;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgColors.primary};
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    max-width: 100%;
    height: 100%;
    margin: 0;
  }
`

const MenuItemModalContent = styled('div')`
  padding: 0;
  height: 100%;
  overflow: hidden;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0;
  }
`

const MenuItem = () => {
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
    // dispatch(showNotification(`${item.name} added to cart`))
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(setCurrentItem(null))
    }, 275)
  }

  return (
    <MenuItemModalView>
      <MenuItemModalContent role="dialog" aria-labelledby="dialogTitle">
        {item && (
          <Builder
            menuItem={item}
            addItemToCart={handleAddItem}
            cancel={handleClose}
            soldOut={soldOut}
            allergens={allergens}
            renderHeader={(props) => <BuilderHeader {...props} />}
            renderOption={(props) => <BuilderOption {...props} />}
            showImage={true}
            displaySettings={displaySettings}
            cartId={cartId}
          />
        )}
      </MenuItemModalContent>
    </MenuItemModalView>
  )
}

MenuItem.displayName = 'MenuItem'
MenuItem.propTypes = {
  close: propTypes.func,
}

export default MenuItem
