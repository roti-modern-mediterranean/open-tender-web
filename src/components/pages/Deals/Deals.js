import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'
import { selectCustomer } from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig } from '../../../slices'
import {
  Background,
  Container,
  Content,
  HeaderDefault,
  HeaderUser,
  Main,
  PageContent,
  PageTitle,
  Reward,
} from '../..'
import { AppContext } from '../../../App'
import AccountTabs from '../Account/AccountTabs'
import styled from '@emotion/styled'

const testDeals = [
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

const defaultConfig = {
  title: 'Deals',
  subtitle: 'Available to both customers with accounts and guests',
}

const DealsView = styled('div')`
  margin: 0 -0.5rem;
  display: flex;
  flex-wrap: wrap;
`

const Deal = styled('div')`
  width: 50%;
  padding: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`

const Deals = () => {
  const history = useHistory()
  const { title: siteTitle, has_deals = true } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const config = { ...accountConfig, ...defaultConfig }
  const { background } = config
  const { auth } = useSelector(selectCustomer)
  const { windowRef } = useContext(AppContext)
  const deals = testDeals
  const hasDeals = deals.length > 0

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!has_deals) return history.push('/')
  }, [has_deals, history])

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Background imageUrl={background} />
      <Content maxWidth="76.8rem">
        {auth ? (
          <HeaderUser
            title={isBrowser ? null : config.title}
            maxWidth="76.8rem"
            bgColor="secondary"
            borderColor="secondary"
          />
        ) : (
          <HeaderDefault
            title={isBrowser ? null : config.title}
            bgColor="secondary"
            borderColor="secondary"
          />
        )}
        <Main bgColor="secondary">
          {!isBrowser && auth && <AccountTabs />}
          <Container>
            <PageTitle {...config} />
            <PageContent>
              {hasDeals ? (
                <DealsView>
                  {deals.map((deal) => (
                    <Deal key={deal.id}>
                      <Reward reward={deal} />
                    </Deal>
                  ))}
                </DealsView>
              ) : (
                <p>
                  We're not featuring any deals today. Please check back soon!
                </p>
              )}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

Deals.displayName = 'Deals'
export default Deals
