import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ProgressCircle } from '../..'

export const AccountRewardsView = styled('div')`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  margin: 3rem 0;

  h2,
  p {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      color: ${(props) => props.theme.colors.light};
    }
  }
`

export const AccountRewardsHeader = styled('div')`
  margin: 0 0 1.5rem;

  h2 {
    font-size: ${(props) => props.theme.fonts.sizes.h5};
  }
`

export const AccountRewardsFooter = styled('div')`
  margin: 1.5rem 0 0;

  // p {
  //   font-weight: ${(props) => props.theme.boldWeight};
  // }
`

const AccountRewards = ({ rewards }) => {
  const { name, progress, credit, remaining, towards } = rewards
  const hasCredit = parseFloat(credit) > 0
  return (
    <AccountRewardsView>
      <AccountRewardsHeader>
        <h2>{name}</h2>
      </AccountRewardsHeader>
      <ProgressCircle progress={progress} />
      <AccountRewardsFooter>
        {hasCredit ? (
          <p>You've got ${credit} in credit to redeem!</p>
        ) : (
          <p>
            You're ${remaining} away from {towards}!
          </p>
        )}
      </AccountRewardsFooter>
    </AccountRewardsView>
  )
}

AccountRewards.displayName = 'RewardsProgram'
AccountRewards.propTypes = {
  rewards: propTypes.object,
}

export default AccountRewards
