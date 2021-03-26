import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { Container, CartFooterButtons } from '.'

const CartFooterView = styled('div')`
  flex-shrink: 0;
  width: 100%;
  height: 14.5rem;
`

const CartFooterTotals = styled('div')`
  width: 100%;
  height: 6.5rem;
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.bgColors.light};

  & > div {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
  }
`

const CartFooterQuantity = styled('div')`
  span {
    display: block;
    font-family: ${(props) => props.theme.fonts.preface.family};
    text-transform: uppercase;
    font-size: 2.1rem;
  }
`

const CartFooterSubtotal = styled('div')`
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
`

const CartFooter = ({ label, total, back, add }) => {
  return (
    <CartFooterView>
      <CartFooterTotals>
        <Container>
          <CartFooterQuantity>{label}</CartFooterQuantity>
          <CartFooterSubtotal>{total}</CartFooterSubtotal>
        </Container>
      </CartFooterTotals>
      <CartFooterButtons add={add} back={back} />
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
