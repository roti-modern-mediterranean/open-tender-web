import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { Container } from '.'

const CartFooterView = styled('div')`
  flex-shrink: 0;
  width: 100%;
  height: 14.5rem;
`

const CartSubtotal = styled('div')`
  width: 100%;
  height: 6.5rem;
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.bgColors.light};

  & > div {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      display: block;
      font-family: ${(props) => props.theme.fonts.preface.family};
      text-transform: uppercase;
      font-size: 2.1rem;

      span {
        font-weight: 500;
        display: inline;
        padding-left: 1rem;
      }
    }
  }
`

const CartButtons = styled('div')`
  width: 100%;
  height: 8rem;
  background-color: ${(props) => props.theme.bgColors.dark};

  & > div {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const CartButtonsBack = styled('div')`
  button {
    display: flex;
    align-items: center;

    span:first-of-type {
      position: relative;
      top: 0.2rem;
      display: block;
      line-height: 0;
      margin: 0 0.8rem 0 0;
    }

    span:last-of-type {
      display: block;
      font-family: ${(props) => props.theme.fonts.preface.family};
      color: ${(props) => props.theme.colors.light};
      font-size: 2.1rem;
      font-weight: 500;
      text-transform: none;
    }
  }
`

const CartButtonsCheckout = styled('div')`
  button {
    border-radius: 2.5rem;
  }
`

const CartFooter = ({ label, total, back, add }) => {
  return (
    <CartFooterView>
      <CartSubtotal>
        <Container>
          <div>{label}</div>
          <div>{total}</div>
        </Container>
      </CartSubtotal>
      <CartButtons>
        <Container>
          <CartButtonsBack>{back}</CartButtonsBack>
          <CartButtonsCheckout>{add}</CartButtonsCheckout>
        </Container>
      </CartButtons>
    </CartFooterView>
  )
}

CartFooter.displayName = 'CartFooter'
CartFooter.propTypes = {
  label: propTypes.element,
  total: propTypes.element,
  back: propTypes.element,
  add: propTypes.element,
}

export default CartFooter
