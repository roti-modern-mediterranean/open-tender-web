import React, { useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'
import { CardButtons, CardImage } from '.'

const CardView = styled('div')`
  cursor: pointer;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 11.5rem;
  margin: 0 0 2rem;
`

const CardImageView = styled('div')`
  position: absolute;
  z-index: 1;
  top: -1rem;
  left: 0;
  width: 13rem;
  height: 13rem;
  transition: all 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
  transform-origin: top left;
  transform: scale(1) translate3D(0, 0, 0);
`

const CardContent = styled('div')`
  height: 11.5rem;
  // min-height: 11.5rem;
  padding: 2rem 2rem 2rem 10rem;
  margin: 0 0 0 4rem;
  transition: background-color 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.color || props.theme.bgColors.secondary};

  .item-active & {
    height: auto;
    min-height: 11.5rem;
    padding: 2rem 2rem 2rem 11rem;
    margin: 0 0 0 3rem;
    background-color: ${(props) => props.theme.colors.light};
  }
`

const CardPreface = styled('div')`
  opacity: 0;
  max-height: 0;
  padding: 0;

  .item-active & {
    opacity: 1;
    max-height: none;
    padding: 0 0 0.5rem;
  }
`

const CardTitle = styled('p')`
  line-height: 1.1;
  font-size: 1.8rem;
  max-height: 7rem;
  overflow: hidden;
  color: ${(props) => props.theme.fonts.headings.color};
  transition: color 0.5s cubic-bezier(0.17, 0.67, 0.12, 1);

  .item-active & {
    height: auto;
    overflow: auto;
  }

  .item-active & span {
    color: ${(props) => props.theme.fonts.body.color};
  }
`

const CardDescription = styled('div')`
  opacity: 0;
  max-height: 0;
  padding: 0;

  .item-active & {
    opacity: 1;
    max-height: none;
    padding: 0.5rem 0 1.5rem;
  }
`

const Card = ({ imageUrl, preface, title, description, view, add }) => {
  const container = useRef(null)
  const viewButton = useRef(null)
  const addButton = useRef(null)
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    viewButton.current.focus()
  }

  return (
    <CardView
      ref={container}
      onClick={handleClick}
      className={isActive ? 'item-active' : ''}
    >
      <CardImageView>
        <CardImage imageUrl={imageUrl} />
      </CardImageView>
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
                onFocus: () => setIsActive(true),
                onBlur: () => setIsActive(false),
                secondary: true,
              })}
            {add &&
              add({
                ref: addButton,
                onFocus: () => setIsActive(true),
                onBlur: () => setIsActive(false),
              })}
          </CardButtons>
        )}
      </CardContent>
    </CardView>
  )
}

Card.displayName = 'Card'
Card.propTypes = {
  imageUrl: propTypes.string,
  preface: propTypes.oneOfType([propTypes.string, propTypes.element]),
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
  subtitle: propTypes.oneOfType([propTypes.string, propTypes.element]),
  view: propTypes.func,
  add: propTypes.func,
}

export default Card
