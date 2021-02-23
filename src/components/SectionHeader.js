import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

import { Container } from '.'
import iconMap from './iconMap'

const SectionHeaderView = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin: 0 0 0.2rem;

  h2 {
    display: block;
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }

  p {
    display: block;
    font-size: ${(props) => props.theme.fonts.sizes.small};

    a {
      display: flex;
      justify-content: flex-end;
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

const SectionHeader = ({ title, to }) => {
  return (
    <Container>
      <SectionHeaderView>
        <h2>{title}</h2>
        {to && (
          <p>
            <Link to={to}>
              <span>View all</span>
              <span>{iconMap.ArrowRight}</span>
            </Link>
          </p>
        )}
      </SectionHeaderView>
    </Container>
  )
}

SectionHeader.displayName = 'SectionHeader'
SectionHeader.propTypes = {
  title: propTypes.string,
  to: propTypes.string,
}

export default SectionHeader
