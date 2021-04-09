import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'

import { Container, MoreLink, PageSectionHeader } from '.'

const PageSectionView = styled('div')`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const PageSectionFooter = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 40rem;
    margin: 0 auto;
  }
`

const PageSection = ({
  title,
  subtitle,
  to,
  toText = 'View all',
  style = null,
  children,
}) => {
  const history = useHistory()

  return (
    <PageSectionView style={style}>
      <Container>
        <PageSectionHeader title={title} subtitle={subtitle} />
        {children}
        {to && (
          <PageSectionFooter>
            <MoreLink onClick={() => history.push(to)} text={toText} />
          </PageSectionFooter>
        )}
      </Container>
    </PageSectionView>
  )
}

PageSection.displayName = 'PageHeader'
PageSection.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  to: propTypes.string,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default PageSection
