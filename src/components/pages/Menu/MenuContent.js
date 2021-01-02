import React, { useState, useEffect, useRef, useContext } from 'react'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'

import { selectDisplaySettings } from '../../../slices'
import { RevenueCenter, RevenueCenterChild, NavSticky } from '../..'
import { MenuContext } from './Menu'
import MenuRevenueCenters from './MenuRevenueCenters'
import MenuCategories from './MenuCategories'
import MenuLoading from './MenuLoading'
import MenuError from './MenuError'
import MenuHero from './MenuHero'
import styled from '@emotion/styled'
import { AppContext } from '../../../App'

const MenuView = styled('div')`
  position: relative;
`

const MenuContent = () => {
  const {
    revenueCenter,
    categories,
    revenueCenters,
    isLoading,
    error,
    menuConfig,
  } = useContext(MenuContext)
  const {
    menuHero,
    menuHeroMobile,
    menuHeroChild,
    menuHeroChildMobile,
  } = useSelector(selectDisplaySettings)
  const showHero =
    menuHero === undefined ? true : isMobile ? menuHeroMobile : menuHero
  const showHeroChild =
    menuHeroChild === undefined
      ? true
      : isMobile
      ? menuHeroChildMobile
      : menuHeroChild
  const topRef = useRef()
  const heroRef = useRef()
  const [selected, setSelected] = useState(null)
  const [visible, setVisible] = useState([])
  const navItems = visible ? visible.map((i) => i.name) : []
  const heroHeight = heroRef.current
    ? heroRef.current.getBoundingClientRect().height
    : 0
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    if (revenueCenters) {
      if (selected) {
        const id = selected.revenue_center_id
        setVisible(categories.filter((i) => i.revenue_center_id === id))
      } else {
        setVisible([])
      }
    } else {
      setVisible(categories)
    }
  }, [revenueCenters, categories, selected])

  const change = (revenueCenter) => {
    setSelected(revenueCenter)
    if (!revenueCenter) {
      windowRef.current.scrollTo(0, 0)
    } else {
      windowRef.current.scrollTo(0, 0)
    }
  }

  return (
    <>
      {selected && showHeroChild && (
        <div ref={heroRef}>
          <MenuHero imageUrl={selected.large_image_url}>
            <RevenueCenterChild
              revenueCenter={selected}
              style={{ maxWidth: '44rem' }}
            />
          </MenuHero>
        </div>
      )}
      {!selected && revenueCenter && showHero && (
        <div ref={heroRef}>
          <MenuHero imageUrl={menuConfig.background}>
            <RevenueCenter
              revenueCenter={revenueCenter}
              isMenu={true}
              style={{ maxWidth: '44rem' }}
            />
          </MenuHero>
        </div>
      )}
      {!error ? (
        <MenuView>
          <MenuLoading />
          <div ref={topRef}>
            <MenuRevenueCenters
              revenueCenters={revenueCenters}
              selected={selected}
              change={change}
            />
            {visible.length > 0 && (
              <>
                <NavSticky
                  items={navItems}
                  offset={heroHeight}
                  revenueCenter={selected}
                  change={change}
                />
                <MenuCategories categories={visible} />
              </>
            )}
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
