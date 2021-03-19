import styled from '@emotion/styled'
import { ButtonLink } from '@open-tender/components'
import { isBrowser } from 'react-device-detect'
import iconMap from './iconMap'

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
      @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
        font-family: ${(props) => props.theme.fonts.body.family};
        font-weight: 500;
        font-size: 1.3rem;
        text-transform: none;
        color: ${(props) => props.theme.links.dark.color};
      }
    }

    span + span {
      width: 2.2rem;
      height: 2.2rem;
      line-height: 0;
      margin: 0 0 0 0.5rem;

      @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
`

const MoreLink = ({ onClick, text = 'View all', icon }) => {
  const defaultIcon = isBrowser ? iconMap.ChevronRight : iconMap.ArrowRight

  return (
    <MoreLinkView>
      <ButtonLink onClick={onClick}>
        <span>{text}</span>
        <span>{icon || defaultIcon}</span>
      </ButtonLink>
    </MoreLinkView>
  )
}

export default MoreLink
