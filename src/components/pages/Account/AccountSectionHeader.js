import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Container } from '../..'
import iconMap from '../../iconMap'
import { Link } from 'react-router-dom'

const AccountSectionHeaderView = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 0.5rem;

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

const AccountSectionHeader = ({ title, to }) => {
  return (
    <Container>
      <AccountSectionHeaderView>
        <h2>{title}</h2>
        {to && (
          <p>
            <Link to={to}>
              <span>View all</span>
              <span>{iconMap.ArrowRight}</span>
            </Link>
          </p>
        )}
      </AccountSectionHeaderView>
    </Container>
  )
}

AccountSectionHeader.displayName = 'AccountSectionHeader'
AccountSectionHeader.propTypes = {
  title: propTypes.string,
  to: propTypes.string,
  // children: propTypes.oneOfType([
  //   propTypes.arrayOf(propTypes.node),
  //   propTypes.node,
  // ]),
}

export default AccountSectionHeader
