import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ButtonLink } from '@open-tender/components'

const InlineLinkView = styled('span')`
  button {
    color: ${(props) => props.theme.colors.primary};
    font-weight: 600;
  }
`

const InlineLink = ({ onClick, children, style = null }) => {
  return (
    <InlineLinkView>
      <ButtonLink onClick={onClick} style={style}>
        {children}
      </ButtonLink>
    </InlineLinkView>
  )
}

InlineLink.displayName = 'InlineLink'
InlineLink.propTypes = {
  onClick: propTypes.func,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default InlineLink
