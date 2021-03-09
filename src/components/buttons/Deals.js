import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const Deals = ({ text = 'Deals', icon = iconMap.DollarSign }) => {
  const history = useHistory()

  return (
    <ButtonBoth
      text={text}
      label="Check out today's deals"
      icon={icon}
      onClick={() => history.push('/deals')}
    />
  )
}

Deals.displayName = 'Deals'
Deals.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
}

export default Deals
