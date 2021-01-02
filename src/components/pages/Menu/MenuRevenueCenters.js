import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'

import MenuRevenueCenter from './MenuRevenueCenter'
import { Container } from '../..'

const MenuRevenueCentersHeader = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  height: ${(props) => props.theme.layout.navHeight};
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.bgColors.dark};

  p {
    color: ${(props) => props.theme.colors.light};
  }
`

const MenuRevenueCentersView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  display: flex;
  flex-wrap: wrap;
  padding: ${(props) => props.theme.layout.padding};
  padding-top: 0;
  padding-right: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
    padding-top: 0;
    padding-right: 0;
  }
`

const MenuRevenueCenters = ({ revenueCenters, selected, change }) => {
  return revenueCenters && !selected ? (
    <div>
      <MenuRevenueCentersHeader>
        <Container>
          <Preface as="p">Please select a vendor</Preface>
        </Container>
      </MenuRevenueCentersHeader>
      <MenuRevenueCentersView>
        {revenueCenters.map((i) => (
          <MenuRevenueCenter
            key={i.revenue_center_id}
            revenueCenter={i}
            change={change}
          />
        ))}
      </MenuRevenueCentersView>
    </div>
  ) : null
}

MenuRevenueCenters.displayName = 'MenuRevenueCenters'
MenuRevenueCenters.propTypes = {
  revenueCenters: propTypes.array,
  selected: propTypes.object,
  change: propTypes.func,
}

export default MenuRevenueCenters
