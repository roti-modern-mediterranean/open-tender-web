import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const MenuContentView = styled('div')`
  label: MenuContentView;
  
  padding: 2rem 2rem;
  flex-grow: 1;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
`

const ModalHeader = styled('div')`
  margin: 0 0 2.5rem;
`

const ModalTitle = styled('p')`
  margin: 0;
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

const ModalSubtitle = styled('div')`
  p {
    margin-top: 1rem;
    line-height: ${(props) => props.theme.lineHeight};
  }
`

const ModalBody = styled('div')`
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

const ModalFooter = styled('div')`
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
          <ModalHeader>
            {title && <ModalTitle id="dialogTitle">{title}</ModalTitle>}
            {subtitle && <ModalSubtitle>{subtitle}</ModalSubtitle>}
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
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
