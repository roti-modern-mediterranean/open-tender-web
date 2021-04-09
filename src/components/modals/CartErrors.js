import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectMenu, setCart, revertMenu } from '@open-tender/redux'
import { CartErrors as CartErrorsComponent } from '@open-tender/components'

import { closeModal, selectConfig } from '../../slices'
import iconMap from '../iconMap'
import { ModalContent, ModalView } from '..'
import styled from '@emotion/styled'

const CartErrorsView = styled('div')`
  & > div > div:last-of-type {
    flex-direction: column;

    button {
      width: 100%;
      margin: 0;
      border-radius: 1.1rem;

      &:first-of-type {
        box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
      }

      span span {
        display: none;
      }
    }

    button + button {
      margin-top: 1.5rem;
      color: ${(props) => props.theme.links.primary.color};
      background: transparent;

      &:hover,
      &:active,
      &:focus {
        background: transparent;
        color: ${(props) => props.theme.links.primary.hover};
      }
    }
  }
`

const CartErrors = () => {
  const dispatch = useDispatch()
  const { cartErrors, previousMenuVars, menuVars } = useSelector(selectMenu)
  const { newCart, errors } = cartErrors || {}
  const { menu } = useSelector(selectConfig)

  const handleRevert = (menuVars) => {
    dispatch(closeModal())
    dispatch(revertMenu(menuVars))
  }

  const handleProceed = () => {
    dispatch(setCart(newCart))
    dispatch(closeModal())
  }

  return (
    <ModalView>
      <ModalContent
        title={menu.cartErrors.title}
        subtitle={<p>{menu.cartErrors.subtitle}</p>}
      >
        <CartErrorsView>
          <CartErrorsComponent
            newCart={newCart}
            errors={errors}
            revert={handleRevert}
            revertIcon={iconMap.ChevronLeft}
            proceed={handleProceed}
            proceedIcon={iconMap.Trash2}
            previousMenuVars={previousMenuVars}
            menuVars={menuVars}
          />
        </CartErrorsView>
      </ModalContent>
    </ModalView>
  )
}

CartErrors.displayName = 'CartErrors'

export default CartErrors
