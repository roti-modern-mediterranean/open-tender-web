import React, { useRef, useContext } from 'react'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { selectGroupOrder } from '@open-tender/redux'
import styled from '@emotion/styled'

import { selectDisplaySettings } from '../../../slices'
import { NavSticky } from '../..'
import { MenuContext } from './Menu'
import MenuCategories from './MenuCategories'
import MenuLoading from './MenuLoading'
import MenuError from './MenuError'
import MenuHero from './MenuHero'

import MenuDeals from './MenuDeals'

const MenuView = styled('div')`
  position: relative;
`

const MenuContent = () => {
  const {
    revenueCenter,
    categories,
    isLoading,
    error,
    menuConfig,
    deals,
  } = useContext(MenuContext)
  const { menuHero, menuHeroMobile } = useSelector(selectDisplaySettings)
  const { cartGuest } = useSelector(selectGroupOrder)
  const showHero =
    menuHero === undefined ? true : isMobile ? menuHeroMobile : menuHero
  const topRef = useRef()
  const heroRef = useRef()
  let navItems = categories ? categories.map((i) => i.name) : []
  navItems = deals && deals.length > 0 ? ['Deals', ...navItems] : navItems
  const heroHeight = heroRef.current
    ? heroRef.current.getBoundingClientRect().height
    : 0

  return (
    <>
      {revenueCenter && showHero && (
        <div ref={heroRef}>
          <MenuHero imageUrl={menuConfig.background} />
        </div>
      )}
      {!error ? (
        <MenuView>
          <MenuLoading />
          <div ref={topRef}>
            <NavSticky items={navItems} offset={heroHeight} />
            {!cartGuest && <MenuDeals deals={deals} />}
            <MenuCategories categories={categories} />
          </div>
        </MenuView>
      ) : !isLoading ? (
        <MenuError />
      ) : null}
    </>
  )
}

MenuContent.displayName = 'MenuContent'

export default MenuContent
