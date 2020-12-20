import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import iconMap from '../iconMap'
import { HeaderButton } from '..'

const HeaderButtonBack = ({ color, path = '/account' }) => {
  const history = useHistory()
  return (
    <HeaderButton color={color} onClick={() => history.push(path)}>
      {iconMap['ArrowLeft']}
    </HeaderButton>
  )
}

HeaderButtonBack.displayName = 'HeaderButtonBack'
HeaderButtonBack.propTypes = {
  color: propTypes.string,
  path: propTypes.string,
}

export default HeaderButtonBack
