import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Text } from '@open-tender/components'

import { ProgressCircle } from '../..'
import Container from '../../Container'
import { Link } from 'react-router-dom'

const AccountProgressView = styled('div')`
  padding: 1.5rem 0;
  background-color: ${(props) => props.theme.bgColors.secondary};

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const AccountProgressContent = styled('div')`
  margin: 0 4rem 0 0;

  h2 {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }

  p {
    margin: 0.75rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const AccountProgressCircle = styled('div')`
  flex: 0 0 auto;
`

const AccountProgress = ({ loyalty }) => {
  const { name, progress, credit, remaining, towards } = loyalty
  const hasCredit = parseFloat(credit) > 0
  return (
    <AccountProgressView>
      <Container>
        <AccountProgressContent>
          <h2>{name}</h2>
          {hasCredit && (
            <Text as="p" color="success" size="small" bold={true}>
              You've got ${credit} in credit to redeem!
            </Text>
          )}
          <p>
            You're ${remaining} away from {hasCredit && 'another '}
            {towards}
          </p>
          <p>
            <Link to="/rewards">See all rewards</Link>
          </p>
        </AccountProgressContent>
        {progress && (
          <AccountProgressCircle>
            <ProgressCircle progress={progress} />
          </AccountProgressCircle>
        )}
      </Container>
    </AccountProgressView>
  )
}

AccountProgress.displayName = 'AccountProgress'
AccountProgress.propTypes = {
  loyalty: propTypes.object,
}

export default AccountProgress
