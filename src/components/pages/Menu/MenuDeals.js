import React, { useEffect, useMemo } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { makeValidDeals } from '@open-tender/js'
import { fetchDeals, selectDeals, selectOrder } from '@open-tender/redux'
import { Box } from '@open-tender/components'

import { Container, Reward } from '../..'

const MenuDealsView = styled(Box)`
  // margin: ${(props) => props.theme.layout.padding};
  // padding: ${(props) => props.theme.layout.padding};
  margin: 6rem ${(props) => props.theme.layout.padding} 0;
  padding: 0rem 2rem 1rem;
  background-color: ${(props) => props.theme.bgColors.secondary};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.paddingMobile};
    margin-bottom: 0;
    padding: 0rem 1rem 0.5rem;
  }
`

const MenuDealsHeader = styled('div')`
  margin: 2rem 0 1rem;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 1.5rem 0 1rem;
  }

  h2 {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.h3};
  }

  p {
    margin: 1rem 0 0;
    line-height: ${(props) => props.theme.lineHeight};
  }
`

const MenuDealsItems = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 -1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 -0.5rem;
  }
`

const MenuDeal = styled('div')`
  width: 34rem;
  padding: 1rem;

  // @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
  //   width: 25%;
  // }

  // @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
  //   width: 33.33333%;
  // }

  // @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
  //   width: 33.33333%;
  //   padding: ${(props) => props.theme.layout.paddingMobile};
  //   padding-bottom: 0;
  //   padding-left: 0;
  // }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    padding: 0.5rem;
  }
`

const MenuDeals = () => {
  const dispatch = useDispatch()
  const { entities, error } = useSelector(selectDeals)
  const order = useSelector(selectOrder)
  const deals = useMemo(() => makeValidDeals(entities, order), [
    entities,
    order,
  ])

  useEffect(() => {
    dispatch(fetchDeals())
  }, [dispatch])

  // const deals = has_deals ? makeValidDeals(entities, order) : []
  if (!deals || !deals.length || error) return null
  return (
    <MenuDealsView>
      <MenuDealsHeader>
        <Container>
          <h2>Today's Deals</h2>
        </Container>
      </MenuDealsHeader>
      <MenuDealsItems>
        {deals.map((item) => (
          <MenuDeal key={item.discount_id}>
            <Reward item={item} />
          </MenuDeal>
        ))}
      </MenuDealsItems>
    </MenuDealsView>
  )
}

MenuDeals.displayName = 'MenuDeals'
MenuDeals.propTypes = {
  deals: propTypes.array,
}

export default MenuDeals
