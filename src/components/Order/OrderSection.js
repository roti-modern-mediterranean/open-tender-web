import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'

const OrderSectionView = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 1.5rem;
  border-bottom: ${(props) => props.theme.border.width} solid
    ${(props) => props.theme.border.color};
  margin: 0 0 1.5rem;

  &:last-of-type {
    padding: 0;
    border: 0;
    margin: 0;
  }
`

const OrderSectionLabel = styled('div')`
  flex: 0 0 15rem;
  margin: 0 2rem 0 0;

  span {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const OrderSectionContent = styled('div')`
  flex: 1;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.lineHeight};

    &:first-of-type {
      font-size: ${(props) => props.theme.fonts.sizes.main};
      color: ${(props) => props.theme.fonts.headings.color};
    }
  }
`

const OrderSection = ({ label, children }) => {
  return (
    <OrderSectionView>
      <OrderSectionLabel>
        <Preface>{label}</Preface>
      </OrderSectionLabel>
      <OrderSectionContent>{children}</OrderSectionContent>
    </OrderSectionView>
  )
}

OrderSection.displayName = 'Row'
OrderSection.propTypes = {
  label: propTypes.element,
  children: propTypes.element,
}

export default OrderSection
