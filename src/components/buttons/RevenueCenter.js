import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectOrder, selectAutoSelect } from '@open-tender/redux'

import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const RevenueCenter = ({ icon = iconMap.MapPin }) => {
  const history = useHistory()
  const { revenueCenter } = useSelector(selectOrder)
  const autoSelect = useSelector(selectAutoSelect)

  const change = () => {
    history.push(`/locations`)
  }

  if (!revenueCenter || autoSelect) return null

  return <ButtonBoth text={revenueCenter.name} icon={icon} onClick={change} />
}

RevenueCenter.displayName = 'RevenueCenter'
RevenueCenter.propTypes = {
  icon: propTypes.element,
}

export default RevenueCenter
