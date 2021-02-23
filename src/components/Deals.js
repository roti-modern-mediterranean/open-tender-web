import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Reward, SectionHeader } from '.'

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

const DealsView = styled('div')`
  overflow: hidden;
  margin: 2.5rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 2rem 0;
  }
`

const DealsList = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow-x: scroll;
  padding: 1rem 0 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 1rem 0 1rem ${(props) => props.theme.layout.paddingMobile};
  }
`

const DealsListItem = styled('div')`
  flex: 0 0 29rem;
  padding: 0 1rem 0 0;

  &:last-of-type {
    flex: 0 0 30rem;
    padding: 0 2rem 0 0;
  }
`

const Deals = ({ deals }) => {
  deals = testRewards
  const hasDeals = deals.length > 0

  return (
    <DealsView>
      <SectionHeader title="Today's Deals" to="/deals" />
      <DealsList>
        {hasDeals ? (
          deals.map((reward) => (
            <DealsListItem key={reward.id}>
              <Reward reward={reward} />
            </DealsListItem>
          ))
        ) : (
          <p>We're not featuring any deals today. Please check back soon!</p>
        )}
      </DealsList>
    </DealsView>
  )
}

Deals.displayName = 'Deals'
Deals.propTypes = {
  rewards: propTypes.array,
}

export default Deals
