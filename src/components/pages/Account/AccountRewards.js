import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ProgressCircle } from '../..'
import AccountRewardsList from './AccountRewardsList'

export const AccountRewardsView = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  margin: 3rem 0 1.5rem;
`

export const AccountRewardsHeader = styled('div')`
  margin: 0 0 1.5rem;

  h2 {
    font-size: ${(props) => props.theme.fonts.sizes.h5};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      color: ${(props) => props.theme.colors.light};
    }
  }
`

export const AccountRewardsFooter = styled('div')`
  margin: 1.5rem 0 0;

  p {
    // font-weight: ${(props) => props.theme.boldWeight};
    font-size: ${(props) => props.theme.fonts.sizes.small};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      color: ${(props) => props.theme.colors.light};
    }
  }
`

const testRewards = [
  {
    id: 1,
    name: 'Buy One, Get One',
    description: 'Get two entrees for the price of one. Today only!',
    image_url:
      'http://s3.amazonaws.com/betterboh/u/img/prod/2/1608047267_topo-chico_900x600.jpg',
    expiration: '02/28/2021',
    discount_type: 'DOLLAR',
    amount: '15.00',
  },
  {
    id: 2,
    name: 'Buy One, Get One',
    description: 'Get two entrees for the price of one. Today only!',
    image_url:
      'http://s3.amazonaws.com/betterboh/u/img/prod/2/1608047267_topo-chico_900x600.jpg',
    expiration: '02/28/2021',
    discount_type: 'DOLLAR',
    amount: '15.00',
  },
]

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
            You're ${remaining} away from {towards}
          </p>
        )}
      </AccountRewardsFooter>
      <AccountRewardsList rewards={testRewards} />
    </AccountRewardsView>
  )
}

AccountRewards.displayName = 'RewardsProgram'
AccountRewards.propTypes = {
  rewards: propTypes.object,
}

export default AccountRewards
