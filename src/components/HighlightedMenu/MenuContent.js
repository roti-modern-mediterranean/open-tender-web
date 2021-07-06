import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const MenuContentView = styled('div')`
  label: MenuContentView;
  
  padding: 2rem 2rem 0;
  flex-grow: 1;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;

  display: grid;
  grid-template-rows: max-content auto;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0;
  }
`

const MenuHeader = styled('div')`
  margin: 0 0 2.5rem;
`

const MenuTitle = styled('p')`
  margin: 0 0 5px 0;
  line-height: 1;
  font-family: ${(props) => props.theme.fonts.preface.family};
  font-size: 2.2rem;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  font-weight: 500;
  color: ${(props) => props.theme.colors.primary};

  span {
    color: ${(props) => props.theme.colors.secondary};
  }
`

const MenuSubtitle = styled('div')`
  p {
    margin-top: 1rem;
    line-height: ${(props) => props.theme.lineHeight};
  }
`

const MenuBody = styled('div')`
  label: MenuBody;
  
  > div {
    p {
      margin: 1em 0;
      line-height: ${(props) => props.theme.lineHeight};

      button {
        margin: 0 1rem 1rem 0;
        &:last-child {
          margin: 0;
        }
      }
    }
  }

  // > div + div {
  //   margin: ${(props) => props.theme.layout.padding} 0 0;
  // }
`

const MenuFooter = styled('div')`
  margin-top: 2rem;

  > {
    p {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }

  > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    button {
      flex-shrink: 0;
      display: block;
      margin: 1rem 1rem 0 0;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`

const MenuContent = ({
  title,
  subtitle,
  footer,
  children,
  style,
}) => {
  const hasHeader = title || subtitle ? true : false

  return (
    <>
      <MenuContentView
        role="dialog"
        aria-labelledby="dialogTitle"
        style={style}
      >
        {hasHeader && (
          <MenuHeader>
            {title && <MenuTitle id="dialogTitle">{title}</MenuTitle>}
            {subtitle && <MenuSubtitle>{subtitle}</MenuSubtitle>}
          </MenuHeader>
        )}
        <MenuBody>{children}</MenuBody>
        {footer && <MenuFooter>{footer}</MenuFooter>}
      </MenuContentView>
    </>
  )
}

MenuContent.displayName = 'MenuContent'
MenuContent.propTypes = {
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
  subtitle: propTypes.oneOfType([propTypes.string, propTypes.element]),
  footer: propTypes.oneOfType([propTypes.string, propTypes.element]),
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  style: propTypes.object,
}

export default MenuContent
