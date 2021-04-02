import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { PageSectionHeader } from '.'

const PageTitleView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 0 5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
  }

  > div:first-of-type {
    flex: 1;
  }

  > div + div {
    flex-shrink: 0;
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      margin-top: 2.5rem;
      width: 100%;
    }
  }
`

const PageTitle = ({ title, subtitle, children, style = null }) => {
  return (
    <PageTitleView style={style}>
      <PageSectionHeader
        title={title}
        subtitle={subtitle}
        style={{ margin: 0 }}
      />
      {children && <div>{children}</div>}
    </PageTitleView>
  )
}

PageTitle.displayName = 'PageTitle'
PageTitle.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default PageTitle
