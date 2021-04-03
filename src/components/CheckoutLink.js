import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ButtonLink } from '@open-tender/components'
import { isBrowser } from 'react-device-detect'
import { ChevronRight } from './icons'
import { selectTheme } from '../slices'
import { useSelector } from 'react-redux'

const CheckoutLinkView = styled('span')`
  display: block;

  button {
    display: flex;
    align-items: center;

    span {
      display: block;
      transition: ${(props) => props.theme.links.transition};
      font-family: ${(props) => props.theme.fonts.preface.family};
      font-weight: 600;
      font-size: 2rem;
      text-transform: uppercase;
      line-height: 1;
      color: ${(props) => props.theme.colors.paprika};
      @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
        color: ${(props) => props.theme.colors.beet};
      }
    }

    span + span {
      line-height: 0;
      margin: 0 0 0 1rem;
      @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
        margin: 0 0 0 0.7rem;
      }
    }
  }
`

const CheckoutLink = ({ onClick, text = 'View all', icon, style = null }) => {
  const theme = useSelector(selectTheme)
  const defaultIcon = isBrowser ? (
    <ChevronRight color={theme.colors.paprika} size="0.9rem" />
  ) : (
    <ChevronRight color={theme.colors.beet} size="0.9rem" />
  )

  return (
    <CheckoutLinkView style={style}>
      <ButtonLink onClick={onClick}>
        <span>{text}</span>
        <span>{icon || defaultIcon}</span>
      </ButtonLink>
    </CheckoutLinkView>
  )
}

CheckoutLink.displayName = 'CheckoutLink'
CheckoutLink.propTypes = {
  onClick: propTypes.func,
  text: propTypes.string,
  icon: propTypes.element,
  style: propTypes.object,
}

export default CheckoutLink
