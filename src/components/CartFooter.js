import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { Container, CartFooterButtons } from '.'
import BorderBox from './BorderBox'
import { useTheme } from '@emotion/react'

const CartFooterView = styled('div')`
  flex-shrink: 0;
  width: 100%;
  height: ${(props) => (props.hasTotals ? '14.5rem' : '8rem')};
`

const CartFooterTotals = styled('div')`
  position: relative;
  width: 100%;
  height: 6.5rem;
  border-top-right-radius: ${(props) => (props.useBorderRadius ? '4rem' : '0')};
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.bgColors.light};

  & > div:last-of-type {
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

const CartFooter = ({ label, total, back, add, rightColor = 'primary' }) => {
  const theme = useTheme()
  const hasTotals = label || total
  return (
    <CartFooterView hasTotals={hasTotals}>
      {hasTotals && (
        <CartFooterTotals useBorderRadius={rightColor === null}>
          <BorderBox color={theme.bgColors.light} />
          {rightColor && (
            <BorderBox color={theme.bgColors[rightColor]} position="right" />
          )}
          <Container>
            <CartFooterQuantity>{label}</CartFooterQuantity>
            <CartFooterSubtotal>{total}</CartFooterSubtotal>
          </Container>
        </CartFooterTotals>
      )}
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
