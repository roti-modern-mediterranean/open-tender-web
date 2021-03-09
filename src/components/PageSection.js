import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import iconMap from './iconMap'
import { PageSectionHeader } from '.'

const PageSectionView = styled('div')`
  margin: 5rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 2.5rem 0;
  }
`

const PageSectionLink = styled('div')`
  margin: 2.5rem 0;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 1.5rem 0;
  }

  p {
    display: block;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    span {
      display: block;
    }

    span + span {
      width: 1.2rem;
      height: 1.2rem;
      margin: 0 0 0 0.5rem;
    }
  }
`

const PageSection = ({ title, subtitle, to, style = null, children }) => {
  return (
    <PageSectionView style={style}>
      <PageSectionHeader title={title} subtitle={subtitle} />
      {children}
      {to && (
        <PageSectionLink>
          {to && (
            <p>
              <Link to={to}>
                <span>View all</span>
                <span>{iconMap.ArrowRight}</span>
              </Link>
            </p>
          )}
        </PageSectionLink>
      )}
    </PageSectionView>
  )
}

PageSection.displayName = 'PageHeader'
PageSection.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default PageSection
