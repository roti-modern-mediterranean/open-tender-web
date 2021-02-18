import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'

import AccountRewardsListItem from './AccountRewardsListItem'
import { isBrowser } from 'react-device-detect'

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

const AccountRewardsListView = styled('div')`
  width: 100%;
  padding: 2rem 0 0;
  margin: 2.5rem 0 0;
  background-color: ${(props) => props.theme.bgColors.secondary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0;
    margin: 3rem 0 1rem;
    border: 0;
    background-color: transparent;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 1rem 0;
  }

  & > div {
    width: 100%;
    overflow-x: scroll;
    padding: 1.5rem 0 2.5rem 2.5rem;
    display: flex;
    justify-content: ${(props) => props.justify};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      padding: 1rem 0 1rem 2rem;
    }
  }

  > p {
    text-align: center;
    text-transform: uppercase;
    font-weight: ${(props) => props.theme.boldWeight};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      color: ${(props) => props.theme.colors.light};
    }
  }
`

const AccountRewardsListItemContainer = styled('div')`
  flex: 0 0 25rem;
  padding: 0 1rem 0 0;

  &:last-of-type {
    flex: 0 0 26rem;
    padding: 0 2rem 0 0;
  }
`

const AccountRewardsList = ({ rewards }) => {
  rewards = testRewards
  const count = isBrowser ? 2 : 1
  if (!rewards.length) return null

  return (
    <AccountRewardsListView
      justify={rewards.length <= count ? 'center' : 'flex-start'}
    >
      <Preface as="p" color="primary">
        {rewards.length > 1
          ? `You have ${rewards.length} rewards!`
          : 'You have a reward'}
      </Preface>
      <div>
        {rewards.map((reward) => (
          <AccountRewardsListItemContainer key={reward.id}>
            <AccountRewardsListItem reward={reward} />
          </AccountRewardsListItemContainer>
        ))}
      </div>
    </AccountRewardsListView>
  )
}

AccountRewardsList.displayName = 'AccountRewardsList'
AccountRewardsList.propTypes = {
  rewards: propTypes.object,
}

export default AccountRewardsList
