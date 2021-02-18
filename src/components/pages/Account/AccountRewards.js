import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ProgressCircle } from '../..'

export const AccountRewardsView = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 3rem 0 1.5rem;
  }
`

export const AccountRewardsHeader = styled('div')`
  margin: 0 0 1.5rem;

  h2 {
    font-size: ${(props) => props.theme.fonts.sizes.h5};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      color: ${(props) => props.theme.colors.light};
    }
  }
`

export const AccountRewardsFooter = styled('div')`
  margin: 1.5rem 0 0;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      color: ${(props) => props.theme.colors.light};
    }
  }
`

const AccountRewards = ({ loyalty }) => {
  const { name, progress, credit, remaining, towards } = loyalty
  const hasCredit = parseFloat(credit) > 0
  return (
    <AccountRewardsView>
      <AccountRewardsHeader>
        <h2>{name}</h2>
      </AccountRewardsHeader>
      {progress && <ProgressCircle progress={progress} />}
      <AccountRewardsFooter>
        {hasCredit ? (
          <p>You've got ${credit} in credit to redeem!</p>
        ) : (
          <p>
            You're ${remaining} away from {towards}
          </p>
        )}
      </AccountRewardsFooter>
    </AccountRewardsView>
  )
}

AccountRewards.displayName = 'AccountRewards'
AccountRewards.propTypes = {
  loyalty: propTypes.object,
}

export default AccountRewards
