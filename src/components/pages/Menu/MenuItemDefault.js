import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading, Preface } from '@open-tender/components'

import { CardButton, CardButtons, CardImage } from '../..'
import MenuItemDetails from './MenuItemDetails'
import MenuItemAllergens from './MenuItemAllergens'

const MenuItemView = styled('div')`
  cursor: ${(props) => (props.isSoldOut ? 'default' : 'pointer')};
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 5rem;

  &.item-active {
    margin: 0 0 2rem;
  }
`

const MenuItemImageView = styled('div')`
  position: absolute;
  z-index: 1;
  top: -4rem;
  left: -2rem;
  width: 19rem;
  height: 19rem;
  transition: all 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
  transform-origin: top left;
  transform: scale(1) translate3D(0, 0, 0);
  opacity: ${(props) => (props.isSoldOut ? '0.5' : '1.0')};

  .item-active & {
    transform: scale(0.57) translate3D(0, 8rem, 0);
  }
`

const MenuItemContent = styled('div')`
  overflow: hidden;
  min-height: 11.5rem;
  padding: 2rem 2rem 2rem 6rem;
  margin: 0 0 0 10.5rem;
  transition: background-color 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
  // transition: all 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) =>
    props.theme.bgColors[props.isInverted ? 'primary' : 'secondary']};

  &:hover {
    background-color: ${(props) =>
      props.isSoldOut
        ? props.theme.bgColors[props.isInverted ? 'primary' : 'secondary']
        : props.theme.colors.cardHover};
  }

  .item-active & {
    min-height: 11.5rem;
    padding: 2rem 2rem 2rem 7.5rem;
    margin: 0 0 0 2rem;
    background-color: ${(props) => props.theme.colors.light};

    &:hover {
      background-color: ${(props) => props.theme.colors.light};
    }
  }
`

const MenuItemContentHeader = styled('div')`
  display: flex;
  flex-direction: column;

  .item-active & {
    flex-direction: row;
    justify-content: space-between;
  }
`

const MenuItemName = styled('p')`
  line-height: 1.1;
  font-size: 2rem;
  color: ${(props) => props.theme.fonts.headings.color};
  transition: color 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);

  .item-active & span {
    color: ${(props) => props.theme.fonts.body.color};
  }
`

const MenuItemDescription = styled('p')`
  opacity: 0;
  max-height: 0;
  padding: 0;
  line-height: ${(props) => props.theme.lineHeight};
  color: ${(props) => props.theme.fonts.body.color};
  font-size: ${(props) => props.theme.fonts.sizes.small};
  // transition: all 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);

  .item-active & {
    opacity: 1;
    max-height: 20rem;
    padding: 0.5rem 0 0;
  }
`

const MenuItemSoldOut = styled(Preface)`
  color: ${(props) => props.theme.colors.alert};
  font-size: 1.6rem;
  font-weight: 500;
`

const MenuItemDefault = React.forwardRef(
  (
    {
      onClick,
      isActive,
      isInverted,
      isSoldOut,
      isIncomplete,
      item,
      imageUrl,
      allergenAlert,
      price,
      cals,
      viewRef,
      addRef,
      handleView,
      handleAdd,
      handleOrder,
      menuConfig,
      setIsActive,
    },
    ref
  ) => {
    return (
      <MenuItemView
        ref={ref}
        onClick={onClick}
        isSoldOut={isSoldOut}
        className={isActive ? 'item-active' : ''}
      >
        <MenuItemImageView isSoldOut={isSoldOut}>
          <CardImage imageUrl={imageUrl} isInverted={isInverted} />
        </MenuItemImageView>
        <MenuItemContent isInverted={isInverted} isSoldOut={isSoldOut}>
          <MenuItemContentHeader>
            <MenuItemName>
              <Heading>{item.name}</Heading>
            </MenuItemName>
            <MenuItemDetails price={price} cals={cals} />
            {isSoldOut && (
              <MenuItemSoldOut as="p">Sold out for the day</MenuItemSoldOut>
            )}
          </MenuItemContentHeader>
          {item.description && (
            <MenuItemDescription>{item.description}</MenuItemDescription>
          )}
          <MenuItemAllergens allergens={allergenAlert} />
          <CardButtons style={isActive ? { margin: '1.5rem 0 0' } : null}>
            {menuConfig ? (
              <>
                <CardButton
                  ref={viewRef}
                  onClick={handleView}
                  onFocus={() => setIsActive(true)}
                  // onBlur={() => setIsActive(false)}
                  disabled={isSoldOut}
                  secondary={true}
                >
                  View
                </CardButton>
                <CardButton
                  ref={addRef}
                  onClick={handleAdd}
                  onFocus={() => setIsActive(true)}
                  // onBlur={() => setIsActive(false)}
                  disabled={isSoldOut || isIncomplete}
                >
                  Add
                </CardButton>
              </>
            ) : (
              <CardButton
                ref={viewRef}
                onClick={handleOrder}
                onFocus={() => setIsActive(true)}
                // onBlur={() => setIsActive(false)}
              >
                Order Now
              </CardButton>
            )}
          </CardButtons>
        </MenuItemContent>
      </MenuItemView>
    )
  }
)

MenuItemDefault.displayName = 'MenuItemDefault'
MenuItemDefault.propTypes = {
  menuConfig: propTypes.object,
  onClick: propTypes.func,
  isActive: propTypes.bool,
  isInverted: propTypes.bool,
  isSoldOut: propTypes.bool,
  isIncomplete: propTypes.bool,
  item: propTypes.object,
  imageUrl: propTypes.string,
  allergenAlert: propTypes.array,
  price: propTypes.string,
  cals: propTypes.number,
  viewRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(Element) }),
  ]),
  addRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(Element) }),
  ]),
  handleView: propTypes.func,
  handleAdd: propTypes.func,
  setIsActive: propTypes.func,
}

export default MenuItemDefault
