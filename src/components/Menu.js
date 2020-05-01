import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectConfig } from '../slices/configSlice'
import Background from './Background'

const Locations = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { menu: menuConfig } = useSelector(selectConfig)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <div className="content">
      <Background imageUrl={menuConfig.background} />
      <h1>This is where the menu will go</h1>
    </div>
  )
}

export default Locations
