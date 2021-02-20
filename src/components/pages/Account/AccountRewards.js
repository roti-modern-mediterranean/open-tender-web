import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import AccountReward from './AccountReward'
import AccountSectionHeader from './AccountSectionHeader'

const testRewards = [
  {
    id: 1,
    title: 'Buy One Entree, Get Second for half price',
    description: 'Get two entrees for the price of one. Today only!',
    image_url:
      'http://s3.amazonaws.com/betterboh/u/img/prod/2/1608047267_topo-chico_900x600.jpg',
    qr_code_url:
      'http://s3.amazonaws.com/betterboh/u/img/local/2/1613177993_qrcode_2_3.svg',
    expiration: '02/18/2021',
    discount_type: 'DOLLAR',
    amount: '15.00',
  },
  {
    id: 2,
    title: 'Free Drink with purchase of $20 or more',
    description: 'Get two entrees for the price of one. Today only!',
    image_url:
      'http://s3.amazonaws.com/betterboh/u/img/prod/2/1608047267_topo-chico_900x600.jpg',
    // qr_code_url:
    //   'http://s3.amazonaws.com/betterboh/u/img/local/2/1613177993_qrcode_2_3.svg',
    expiration: '02/28/2021',
    discount_type: 'DOLLAR',
    amount: '15.00',
  },
  {
    id: 3,
    title: 'Free Drink!',
    description: 'Get two entrees for the price of one. Today only!',
    // image_url:
    //   'http://s3.amazonaws.com/betterboh/u/img/prod/2/1608047267_topo-chico_900x600.jpg',
    // qr_code_url:
    //   'http://s3.amazonaws.com/betterboh/u/img/local/2/1613177993_qrcode_2_3.svg',
    expiration: '02/18/2021',
    discount_type: 'DOLLAR',
    amount: '15.00',
  },
  {
    id: 4,
    title: 'Get two entrees for the price of one. Today only!',
    description: 'Get two entrees for the price of one. Today only!',
    image_url:
      'http://s3.amazonaws.com/betterboh/u/img/prod/2/1608047267_topo-chico_900x600.jpg',
    qr_code_url:
      'http://s3.amazonaws.com/betterboh/u/img/local/2/1613177993_qrcode_2_3.svg',
    expiration: '02/18/2021',
    discount_type: 'DOLLAR',
    amount: '15.00',
  },
]

const AccountRewardsView = styled('div')`
  width: 100%;
  margin: 2rem 0;
`

const AccountRewardsList = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 1rem 2rem 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: scroll;
    padding: 1rem 0 1rem ${(props) => props.theme.layout.paddingMobile};
  }
`

const AccountRewardsListItem = styled('div')`
  flex: 0 0 50%;
  padding: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex: 0 0 29rem;
    padding: 0 1rem 0 0;
  }

  &:last-of-type {
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      flex: 0 0 30rem;
      padding: 0 2rem 0 0;
    }
  }
`

const AccountRewards = ({ rewards }) => {
  rewards = testRewards
  if (!rewards.length) return null
  const title =
    rewards.length > 1
      ? `You have ${rewards.length} rewards!`
      : 'You have a reward!'

  return (
    <AccountRewardsView>
      <AccountSectionHeader title={title} to="/rewards" />
      <AccountRewardsList>
        {rewards.map((reward) => (
          <AccountRewardsListItem key={reward.id}>
            <AccountReward reward={reward} />
          </AccountRewardsListItem>
        ))}
      </AccountRewardsList>
    </AccountRewardsView>
  )
}

AccountRewards.displayName = 'AccountRewards'
AccountRewards.propTypes = {
  rewards: propTypes.array,
}

export default AccountRewards
