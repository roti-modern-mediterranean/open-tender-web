import React, { useContext, useRef } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'
import { CardButtons, CardImage } from '.'
import { CardActiveContext } from './pages/Orders/Orders'

const CardView = styled('div')`
  cursor: pointer;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 2rem;
`

const CardImageView = styled('div')`
  position: absolute;
  z-index: 1;
  top: -4rem;
  left: -2rem;
  width: 19rem;
  height: 19rem;
  transition: all 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
  transform-origin: top left;
  transform: scale(1) translate3D(0, 0, 0);
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    top: -2.5rem;
    left: -2rem;
    width: 16.5rem;
    height: 16.5rem;
  }
`

// const CardBgImage = styled(BgImage)`
//   position: absolute;
//   z-index: 1;
//   top: -1rem;
//   left: 1rem;
//   width: 14rem;
//   height: 13.5rem;
//   border-radius: ${(props) => props.theme.border.radius};
//   background-color: ${(props) => props.theme.bgColors.primary};
//   background-image: url(${(props) => props.imageUrl});
//   box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.25);
//   @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
//     top: -0.5rem;
//     left: 0.5rem;
//     width: 12rem;
//     height: 12.5rem;
//   }
// `

const CardContent = styled('div')`
  height: 14rem;
  padding: 2rem 2rem 2rem 6rem;
  margin: 0 0 0 10.5rem;
  transition: background-color 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.color || props.theme.bgColors.secondary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: 11.5rem;
    margin: 0 0 0 3rem;
    padding: 2.5rem 2.5rem 2.5rem 11.5rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.cardHover};
  }

  .item-active & {
    height: auto;
    min-height: 14rem;
    background-color: ${(props) => props.theme.colors.light};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      min-height: 11.5rem;
      padding: 2rem 2rem 2rem 11.5rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colors.light};
    }
  }
`

const CardPreface = styled('div')`
  opacity: 1;
  max-height: none;
  padding: 0 0 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    opacity: 0;
    max-height: 0;
    padding: 0;
  }

  span {
    display: block;
    font-family: ${(props) => props.theme.fonts.preface.family};
    font-size: 1.6rem;

    &:last-of-type {
      font-weight: 500;
    }
  }

  .item-active & {
    transition: opacity 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
    opacity: 1;
    max-height: none;
    padding: 0 0 0.5rem;
  }
`

const CardTitle = styled('p')`
  line-height: 1.1;
  font-size: 1.8rem;
  max-height: 6rem;
  overflow: hidden;

  span {
    color: ${(props) => props.theme.fonts.headings.color};
  }

  .item-active & {
    height: auto;
    overflow: auto;
  }

  .item-active & span {
    transition: color 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
    color: ${(props) => props.theme.fonts.body.color};
  }
`

const CardDescription = styled('div')`
  opacity: 0;
  max-height: 0;
  padding: 0;

  p {
    font-family: ${(props) => props.theme.fonts.preface.family};
    font-size: 1.4rem;

    &:first-of-type {
      font-weight: 500;
    }
  }

  .item-active & {
    transition: opacity 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
    opacity: 1;
    max-height: none;
    padding: 0.5rem 0 1.5rem;
  }
`

const Card = ({
  id,
  imageUrl,
  preface,
  title,
  description,
  view,
  add,
  isOlo = true,
}) => {
  const container = useRef(null)
  const viewButton = useRef(null)
  const addButton = useRef(null)
  const { activeCard, setActiveCard } = useContext(CardActiveContext) || {}
  const isActive = activeCard === id

  const handleClick = () => {
    if (isActive) {
      viewButton.current && viewButton.current.blur()
      addButton.current && addButton.current.blur()
      setActiveCard(null)
    } else {
      viewButton.current
        ? viewButton.current.focus()
        : addButton.current.focus()
    }
  }

  return (
    <CardView
      ref={container}
      onClick={handleClick}
      className={isActive ? 'item-active' : ''}
    >
      {imageUrl ? (
        isOlo ? (
          <CardImageView>
            <CardImage imageUrl={imageUrl} />
          </CardImageView>
        ) : (
          <>
            <CardImageView>
              <CardImage imageUrl={imageUrl} />
            </CardImageView>
            {/* <CardBgImage imageUrl={imageUrl} /> */}
          </>
        )
      ) : null}
      <CardContent>
        {preface && <CardPreface>{preface}</CardPreface>}
        {title && (
          <CardTitle>
            <Heading>{title}</Heading>
          </CardTitle>
        )}
        {description && <CardDescription>{description}</CardDescription>}
        {(view || add) && (
          <CardButtons>
            {view &&
              view({
                ref: viewButton,
                onFocus: () => setActiveCard(id),
                secondary: true,
              })}
            {add &&
              add({
                ref: addButton,
                onFocus: () => setActiveCard(id),
              })}
          </CardButtons>
        )}
      </CardContent>
    </CardView>
  )
}

Card.displayName = 'Card'
Card.propTypes = {
  id: propTypes.oneOfType([propTypes.string, propTypes.number]),
  imageUrl: propTypes.string,
  isOlo: propTypes.bool,
  preface: propTypes.oneOfType([propTypes.string, propTypes.element]),
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
  subtitle: propTypes.oneOfType([propTypes.string, propTypes.element]),
  view: propTypes.func,
  add: propTypes.func,
}

export default Card
