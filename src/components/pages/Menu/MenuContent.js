import React, { useRef, useContext } from 'react'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { selectGroupOrder } from '@open-tender/redux'
import styled from '@emotion/styled'

import { selectDisplaySettings } from '../../../slices'
import { NavSticky, PageHero } from '../..'
import { MenuContext } from './Menu'
import MenuCategories from './MenuCategories'
import MenuError from './MenuError'
import MenuDeals from './MenuDeals'
import MenuLoading from './MenuLoading'

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
    announcements,
  } = useContext(MenuContext)
  const { menuHero, menuHeroMobile } = useSelector(selectDisplaySettings)
  const { cartGuest } = useSelector(selectGroupOrder)
  const showHero =
    menuHero === undefined ? true : isMobile ? menuHeroMobile : menuHero
  const topRef = useRef()
  const heroRef = useRef()
  const heroHeight = heroRef.current
    ? heroRef.current.getBoundingClientRect().height
    : 0
  let navItems = categories
    ? categories.map((i) => {
        const imageUrl = i.small_image_url || i.app_image_url || i.big_image_url
        return { ...i, imageUrl }
      })
    : []
  navItems =
    deals && deals.length > 0
      ? [{ name: 'Deals', imageUrl: null }, ...navItems]
      : navItems

  return (
    <>
      {revenueCenter && showHero && (
        <div ref={heroRef}>
          <PageHero
            announcements={announcements}
            imageUrl={menuConfig.background}
            showHero={showHero}
            minHeight="44rem"
          />
        </div>
      )}
      {isLoading ? (
        <MenuLoading />
      ) : error ? (
        <MenuError />
      ) : (
        <MenuView>
          <div ref={topRef}>
            <NavSticky items={navItems} scrollOffset={heroHeight - 60} />
            {!cartGuest && <MenuDeals deals={deals} />}
            <MenuCategories categories={categories} />
          </div>
        </MenuView>
      )}
    </>
  )
}

MenuContent.displayName = 'MenuContent'

export default MenuContent
