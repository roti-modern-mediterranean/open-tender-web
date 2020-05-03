import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectConfig } from '../slices/configSlice'
import Hero from './Hero'
import { Location } from './Location'
import { selectLocation } from '../slices/orderSlice'

const Locations = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { menu: menuConfig } = useSelector(selectConfig)
  const location = useSelector(selectLocation)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <>
      <Hero imageUrl={menuConfig.background} classes="hero--right">
        {location && (
          <Location location={location} classes="location--hero slide-up" />
        )}
      </Hero>
      <div className="content">
        <h1>This is where the menu will go</h1>
      </div>
    </>
  )
}

export default Locations
