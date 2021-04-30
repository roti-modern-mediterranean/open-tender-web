import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { Container } from '.'
import BorderBox from './BorderBox'
import { useTheme } from '@emotion/react'

const CartFooterButtonsView = styled('div')`
  position: relative;
  width: 100%;
  height: 8rem;
  border-top-right-radius: ${(props) => (props.useBorderRadius ? '4rem' : '0')};
  background-color: ${(props) => props.theme.bgColors.dark};

  & > div:last-of-type {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
  }
`

const CartFooterButtonsBack = styled('div')`
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

const CartFooterButtonsCheckout = styled('div')`
  button {
    border-radius: 2.5rem;
  }
`

const CartFooterButtons = ({
  back,
  add,
  color = 'light',
  useBorderRadius = false,
}) => {
  const theme = useTheme()
  return (
    <CartFooterButtonsView useBorderRadius={useBorderRadius}>
      <BorderBox color={theme.bgColors.dark} />
      {!useBorderRadius && (
        <BorderBox color={theme.bgColors[color]} position="right" />
      )}
      <Container>
        <CartFooterButtonsBack>{back}</CartFooterButtonsBack>
        <CartFooterButtonsCheckout>{add}</CartFooterButtonsCheckout>
      </Container>
    </CartFooterButtonsView>
  )
}

CartFooterButtons.displayName = 'CartFooterButtons'
CartFooterButtons.propTypes = {
  back: propTypes.element,
  add: propTypes.element,
}

export default CartFooterButtons
