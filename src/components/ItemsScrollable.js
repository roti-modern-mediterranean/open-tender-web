import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ItemsScrollableView = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 1.5rem 0 0 ${(props) => props.theme.layout.padding};
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 1.5rem 0 0 ${(props) => props.theme.layout.paddingMobile};
  }

  &::-webkit-scrollbar {
    height: 0.125rem;
    width: 0.125rem;
  }
`

const ItemsScrollableItem = styled('div')`
  flex: 0 0 calc(${(props) => props.width} + 1rem);
  padding: 0 1rem 0 0;

  &:last-of-type {
    flex: 0 0
      calc(${(props) => props.width} + ${(props) => props.theme.layout.padding});
    padding: 0 ${(props) => props.theme.layout.padding} 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      flex: 0 0
        calc(
          ${(props) => props.width} +
            ${(props) => props.theme.layout.paddingMobile}
        );
      padding: 0 ${(props) => props.theme.layout.paddingMobile} 0 0;
    }
  }
`

const ItemsScrollable = ({ items, renderItem, children, width = '28rem' }) => {
  const hasItems = items ? items.length > 0 : false

  return (
    <ItemsScrollableView>
      {hasItems
        ? items.map((item) => (
            <ItemsScrollableItem key={item.key} width={width}>
              {renderItem(item)}
            </ItemsScrollableItem>
          ))
        : children}
    </ItemsScrollableView>
  )
}

ItemsScrollable.displayName = 'ItemsScrollable'
ItemsScrollable.propTypes = {
  items: propTypes.array,
  renderItem: propTypes.func,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default ItemsScrollable
