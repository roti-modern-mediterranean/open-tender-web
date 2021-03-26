import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'

import { CardButton, CardButtons, CardImage } from '../..'
import MenuItemDetails from './MenuItemDetails'

const MenuItemView = styled('div')`
  cursor: pointer;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 0 2rem;
  // border: 0.1rem solid ${(props) => props.theme.colors.light};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0;
  }

  &.item-active {
    margin: 0 0 2rem;
  }

  &:hover .item-content-bg {
    transform: scaleY(1.15);
  }
`

const MenuItemImageView = styled('div')`
  position: absolute;
  z-index: 3;
  top: -10.5rem;
  left: -2.5rem;
  width: 17.4rem;
  height: 17.4rem;
  transition: all 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
  transform-origin: top left;
  transform: scale(1) translate3D(0, 0, 0);

  .item-active & {
    transform: scale(0.57) translate3D(0, 8rem, 0);
  }
`

const MenuItemOverlay = styled('div')`
  position: absolute;
  z-index: 3;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: ${(props) => props.theme.border.radius};
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  background-color: ${(props) =>
    props.isSoldOut ? props.theme.overlay.dark : 'transparent'};
`

const MenuItemContent = styled('div')`
  position: relative;
  z-index: 1;
  width: 12.4rem;
  height: 13rem;
  padding: 6rem 1rem 0.5rem;
  margin: 9rem 1rem 0;
  text-align: center;
  transition: background-color 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
  // background-color: ${(props) => props.theme.bgColors.light};

  .item-active & {
    height: auto;
    min-height: 11.5rem;
    padding: 2rem 2rem 2rem 7.5rem;
    margin: 0 0 0 2rem;
    background-color: ${(props) => props.theme.colors.light};

    &:hover {
      background-color: ${(props) => props.theme.colors.light};
    }
  }
`

const MenuItemContentBackground = styled('div')`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 1.4rem;
  transition: all 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
  transform-origin: top center;
  background-color: ${(props) => props.theme.bgColors.light};
`

const MenuItemContentHeader = styled('div')`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;

  p span {
    font-size: 1.4rem;
    font-family: ${(props) => props.theme.fonts.headings.family};

    &:first-of-type {
      font-weight: 600;
    }
  }

  .item-active & {
    flex-direction: row;
    justify-content: space-between;
  }
`

const MenuItemName = styled(Heading)`
  line-height: 1.1;
  font-size: 1.4rem;
  font-weight: 600;
  max-height: 3.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.fonts.body.color};
  transition: color 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);

  // .item-active & span {
  //   color: ${(props) => props.theme.fonts.body.color};
  // }
`

const MenuItemSmall = ({
  onClick,
  isActive,
  isInverted,
  isSoldOut,
  isIncomplete,
  item,
  imageUrl,
  itemTag,
  price,
  cals,
  viewRef,
  addRef,
  handleView,
  handleAdd,
  menuConfig,
  setIsActive,
}) => {
  return (
    <MenuItemView onClick={onClick} className={isActive ? 'item-active' : ''}>
      <MenuItemContent isInverted={isInverted}>
        <MenuItemImageView>
          <CardImage imageUrl={imageUrl} isInverted={isInverted}>
            {itemTag && (
              <MenuItemOverlay isSoldOut={isSoldOut}>
                <div>{itemTag}</div>
              </MenuItemOverlay>
            )}
          </CardImage>
        </MenuItemImageView>
        <MenuItemContentBackground className="item-content-bg" />
        <MenuItemContentHeader>
          <MenuItemName>{item.name}</MenuItemName>
          <MenuItemDetails price={price} cals={cals} />
        </MenuItemContentHeader>
        <CardButtons>
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
          {menuConfig && (
            <CardButton
              ref={addRef}
              onClick={handleAdd}
              onFocus={() => setIsActive(true)}
              // onBlur={() => setIsActive(false)}
              disabled={isSoldOut || isIncomplete}
            >
              Add
            </CardButton>
          )}
        </CardButtons>
      </MenuItemContent>
    </MenuItemView>
  )
}

MenuItemSmall.displayName = 'MenuItemSmall'
MenuItemSmall.propTypes = {
  menuConfig: propTypes.object,
  onClick: propTypes.func,
  isActive: propTypes.bool,
  isInverted: propTypes.bool,
  isSoldOut: propTypes.bool,
  isIncomplete: propTypes.bool,
  item: propTypes.object,
  imageUrl: propTypes.string,
  itemTag: propTypes.element,
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

export default MenuItemSmall
