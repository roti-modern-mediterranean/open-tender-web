import React, { useEffect, useMemo } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { makeValidDeals } from '@open-tender/js'
import { fetchDeals, selectDeals, selectOrder } from '@open-tender/redux'
import { Box, Preface } from '@open-tender/components'

import { Container, Reward } from '../..'

const MenuDealsView = styled(Box)`
  // margin: ${(props) => props.theme.layout.padding};
  // padding: ${(props) => props.theme.layout.padding};
  margin: 6rem ${(props) => props.theme.layout.padding} 0;
  padding: 0rem 2rem 1rem;
  background-color: ${(props) => props.theme.bgColors.secondary};
  // border-color: ${(props) => props.theme.bgColors.success};
  // background: linear-gradient(
  //   ${(props) => props.theme.bgColors.success},
  //   ${(props) => props.theme.colors.success}
  // );
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
    font-weight: ${(props) => props.theme.boldWeight};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.h5};
    }
  }

  p {
    margin: 0.5rem 0 0;
    line-height: ${(props) => props.theme.lineHeight};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
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
          <Preface as="h2" size="h4" color="primary">
            Today's Deals
          </Preface>
          <p>
            To redeem these deals, add the relevant items to your cart and then
            apply the activated deals on the Checkout page.
          </p>
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
