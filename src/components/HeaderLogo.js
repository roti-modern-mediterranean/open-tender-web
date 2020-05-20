import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { startOver } from '../slices/orderSlice'
import { selectConfig } from '../slices/configSlice'
import { Button } from '../packages'

const HeaderLogo = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { brand: brandConfig } = useSelector(selectConfig)

  const handleLogo = (evt) => {
    evt.preventDefault()
    dispatch(startOver())
    history.push(`/`)
    evt.target.blur()
  }

  return (
    <Button onClick={handleLogo}>
      <img src={brandConfig.logo} className="logo" alt="logo" />
    </Button>
  )
}

HeaderLogo.displayName = 'HeaderLogo'

export default HeaderLogo
