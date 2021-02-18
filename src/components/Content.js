import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { SkipLink, Footer } from '.'

const ContentContainer = styled('div')`
  width: 100%;
  max-width: ${(props) => props.maxWidth};
  background-color: ${(props) => props.theme.bgColors.primary};
`

const Content = ({
  maxWidth = '100%',
  hasRouter = true,
  hasFooter = true,
  children,
}) => {
  return (
    <ContentContainer maxWidth={maxWidth}>
      <>
        <SkipLink />
        {children}
        {hasFooter && <Footer hasRouter={hasRouter} />}
      </>
    </ContentContainer>
  )
}

Content.displayName = 'Content'
Content.propTypes = {
  maxWidth: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Content
