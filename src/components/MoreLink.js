import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ButtonLink } from '@open-tender/components'
import { isBrowser } from 'react-device-detect'
import { ChevronRight, ArrowRight } from './icons'
import { selectTheme } from '../slices'
import { useSelector } from 'react-redux'

const MoreLinkView = styled('span')`
  display: block;

  button {
    display: flex;
    align-items: center;

    span {
      display: block;
      transition: ${(props) => props.theme.links.transition};
      font-family: ${(props) => props.theme.fonts.preface.family};
      font-weight: 600;
      font-size: ${(props) => props.theme.fonts.sizes.big};
      text-transform: uppercase;
      line-height: 1;
      @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
        font-family: ${(props) => props.theme.fonts.body.family};
        font-weight: 500;
        font-size: 1.3rem;
        text-transform: none;
        color: ${(props) => props.theme.links.dark.color};
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

const MoreLink = ({ onClick, text = 'View all', icon, style = null }) => {
  const theme = useSelector(selectTheme)
  const defaultIcon = isBrowser ? (
    <ChevronRight color={theme.colors.paprika} size="0.9rem" />
  ) : (
    <ArrowRight color={theme.colors.beet} size="1.2rem" />
  )

  return (
    <MoreLinkView style={style}>
      <ButtonLink onClick={onClick}>
        <span>{text}</span>
        <span>{icon || defaultIcon}</span>
      </ButtonLink>
    </MoreLinkView>
  )
}

MoreLink.displayName = 'MoreLink'
MoreLink.propTypes = {
  category: propTypes.object,
  isChild: propTypes.bool,
  index: propTypes.bool,
}

export default MoreLink
