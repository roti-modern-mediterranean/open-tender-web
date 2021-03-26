import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'

import { CardButton, CardButtons, CardImage } from '../..'
import MenuItemDetails from './MenuItemDetails'

const MenuItemSmallView = styled('div')`
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

  &:hover .item-content-bg {
    transform: scaleY(1.15);
  }

  &.item-active:hover .item-content-bg {
    transform: scaleY(1);
  }
`

const MenuItemSmallImageView = styled('div')`
  position: absolute;
  z-index: 3;
  top: -10.5rem;
  left: -2.5rem;
  width: 17.4rem;
  height: 17.4rem;
  transition: transform 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
  transform-origin: top center;
  transform: scale(1) translate3D(0, 0, 0);

  .item-active & {
    top: -6.5rem;
    transform: scale(0.57) translate3D(0, 0, 0);
  }
`

const MenuItemSmallOverlay = styled('div')`
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

const MenuItemSmallContent = styled('div')`
  position: relative;
  z-index: 1;
  width: 12.4rem;
  height: 13rem;
  padding: 6rem 1rem 1.3rem;
  margin: 9rem 1rem 0;
  text-align: center;
  transition: background-color 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
  // background-color: ${(props) => props.theme.bgColors.light};

  .item-active & {
    height: 17rem;
    padding: 3rem 1rem 1.3rem;
    margin: 5rem 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`

const MenuItemSmallContentBackground = styled('div')`
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

const MenuItemSmallContentHeader = styled('div')`
  flex-grow: 1;
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

  // .item-active & {
  //   flex-direction: row;
  //   justify-content: space-between;
  // }
`

const MenuItemSmallName = styled(Heading)`
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

const MenuItemSmallButtons = styled(CardButtons)`
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  flex-direction: column;
  // justify-content: center;

  button {
    margin: 0.5rem 0 0;
  }
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
    <MenuItemSmallView
      onClick={onClick}
      className={isActive ? 'item-active' : ''}
    >
      <MenuItemSmallContent isInverted={isInverted}>
        <MenuItemSmallImageView>
          <CardImage imageUrl={imageUrl} isInverted={isInverted}>
            {itemTag && (
              <MenuItemSmallOverlay isSoldOut={isSoldOut}>
                <div>{itemTag}</div>
              </MenuItemSmallOverlay>
            )}
          </CardImage>
        </MenuItemSmallImageView>
        <MenuItemSmallContentBackground className="item-content-bg" />
        <MenuItemSmallContentHeader>
          <MenuItemSmallName>{item.name}</MenuItemSmallName>
          <MenuItemDetails price={price} cals={cals} />
        </MenuItemSmallContentHeader>
        <MenuItemSmallButtons>
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
        </MenuItemSmallButtons>
      </MenuItemSmallContent>
    </MenuItemSmallView>
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
