import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {
  selectCartQuantity,
  selectCartTotal,
  selectCanOrder,
  selectGroupOrder,
  selectOrderLimits,
  checkout,
} from '@open-tender/redux'
import { formatDollars } from '@open-tender/js'
import { ButtonStyled } from '@open-tender/components'
import { CartFooterButtons } from '../..'
import styled from '@emotion/styled'

const MenuFooterView = styled('div')`
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  bottom: 0;
  height: 8rem;
`

const MenuFooterSubtotal = styled('div')`
  span {
    display: block;
    font-family: ${(props) => props.theme.fonts.preface.family};
    color: ${(props) => props.theme.colors.light};
    text-transform: uppercase;
    font-size: 2.1rem;

    span {
      font-weight: 500;
      display: inline;
      padding-left: 1rem;
    }
  }
`

const MenuFooter = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [hasLoaded, setHasLoaded] = useState(false)
  const groupOrder = useSelector(selectGroupOrder)
  const { cartGuest, isCartOwner } = groupOrder
  const cartCount = useSelector(selectCartQuantity)
  const cartTotal = useSelector(selectCartTotal)
  const canOrder = useSelector(selectCanOrder)
  const { orderMinimum, orderMaximum } = useSelector(selectOrderLimits)
  const belowMinimum = orderMinimum && cartTotal < orderMinimum
  const aboveMaximum = orderMaximum && cartTotal > orderMaximum
  const notEmpty = cartCount !== 0 || isCartOwner
  const canCheckout = canOrder && !belowMinimum && !aboveMaximum && notEmpty
  const showReview = cartGuest || isCartOwner
  const showFooter = canOrder && notEmpty && hasLoaded

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true)
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleReview = () => {
    history.push(`/review`)
  }

  const handleCheckout = () => {
    dispatch(checkout())
    history.push(`/checkout/register`)
  }

  return (
    <TransitionGroup component={null}>
      {showFooter ? (
        <CSSTransition
          key="menu-footer"
          classNames="slide-up"
          timeout={{ enter: 500, exit: 500 }}
        >
          <MenuFooterView>
            <CartFooterButtons
              back={
                <MenuFooterSubtotal>
                  <span>
                    Subtotal<span>{formatDollars(cartTotal)}</span>
                  </span>
                </MenuFooterSubtotal>
              }
              add={
                showReview ? (
                  <ButtonStyled
                    onClick={handleReview}
                    size="big"
                    color="cart"
                    disabled={!canCheckout}
                  >
                    {isCartOwner ? 'Review Orders' : 'Submit Order'}
                  </ButtonStyled>
                ) : (
                  <ButtonStyled
                    onClick={handleCheckout}
                    size="big"
                    color="cart"
                    disabled={!canCheckout}
                  >
                    {belowMinimum
                      ? 'Below Minimum'
                      : aboveMaximum
                      ? 'Above Maximum'
                      : 'Checkout'}
                  </ButtonStyled>
                )
              }
            />
          </MenuFooterView>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

MenuFooter.displayName = 'MenuFooter'

export default MenuFooter
